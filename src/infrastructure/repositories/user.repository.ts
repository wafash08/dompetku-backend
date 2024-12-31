import type { PrismaClient } from "@prisma/client";
import type { CreateUser, IUser, UpdateUser } from "../entities/interface";
import "reflect-metadata";
import { inject, injectable } from "inversify";
import { TYPES } from "../entities/types";

@injectable()
export class UserRepository implements IUser {
	private _prisma: PrismaClient;

	constructor(@inject(TYPES.prisma) prisma: PrismaClient) {
		this._prisma = prisma;
	}

	async getAll() {
		const users = await this._prisma.user.findMany();
		return users;
	}

	async getOne(userIdOrEmail: string) {
		const user = await this._prisma.user.findFirst({
			where: {
				OR: [{ id: userIdOrEmail }, { email: userIdOrEmail }],
			},
		});

		return user;
	}

	async create(data: CreateUser) {
		const newUser = this._prisma.user.create({
			data,
		});

		return newUser;
	}

	async update(userId: string, data: UpdateUser) {
		const updatedUser = await this._prisma.user.update({
			where: {
				id: userId,
			},
			data,
		});

		return updatedUser;
	}

	async delete(userId: string) {
		await this._prisma.user.delete({
			where: {
				id: userId,
			},
		});
	}
}
