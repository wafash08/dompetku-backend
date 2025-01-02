import type { CreateUser } from "../../infrastructure/entities/interface";
import type { SessionRepository } from "../../infrastructure/repositories/session.repository";
import type { UserRepository } from "../../infrastructure/repositories/user.repository";
import "reflect-metadata";
import { inject, injectable } from "inversify";
import { TYPES } from "../../infrastructure/entities/types";
import { UserDTO } from "../dtos/user.dto";

@injectable()
export class AuthServices {
	private _userRepository: UserRepository;
	private _sessionRepository: SessionRepository;

	constructor(
		@inject(TYPES.userRepository) userRepository: UserRepository,
		@inject(TYPES.sessionRepository) sessionRepository: SessionRepository,
	) {
		this._userRepository = userRepository;
		this._sessionRepository = sessionRepository;
	}

	async registerUser(data: CreateUser) {
		// check collision
		const user = await this._userRepository.getOne(data.email);

		if (user) {
			throw new Error("User already registered");
		}

		const hashedPassword = await Bun.password.hash(data.password);
		const newUser = await this._userRepository.create({
			name: data.name,
			email: data.email,
			password: hashedPassword,
			avatar: null,
		});

		return new UserDTO(newUser).fromEntity();
	}

	async loginUser({ email, password }: { email: string; password: string }) {
		const user = await this._userRepository.getOne(email);
		if (!user) {
			throw new Error("User not found");
		}

		const matchPassword = await Bun.password.verify(password, user.password);
		if (!matchPassword) {
			throw new Error("Invalid credential");
		}

		const session = await this._sessionRepository.create(user.id);
		return session;
	}

	async checkSession(sessionId: string) {
		const session = await this._sessionRepository.getOne(sessionId);
		if (!session) {
			throw new Error("Session invalid");
		}

		return "valid";
	}

	async decodeSession(sessionId: string) {
		const session = await this._sessionRepository.getOne(sessionId);

		if (!session) {
			throw new Error("Session invalid");
		}

		const user = await this._userRepository.getOne(session.userId);
		return { user };
	}
}
