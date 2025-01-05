import { Prisma, type PrismaClient } from "@prisma/client";
import type { CreateUser, IUser, UpdateUser } from "../entities/interface";
import "reflect-metadata";
import { inject, injectable } from "inversify";
import { TYPES } from "../entities/types";
import { DBError } from "../entities/errors";

@injectable()
export class UserRepository implements IUser {
	private _prisma: PrismaClient;

	constructor(@inject(TYPES.prisma) prisma: PrismaClient) {
		this._prisma = prisma;
	}

	async getAll() {
		try {
			const users = await this._prisma.user.findMany();
			return users;
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				throw new DBError("Error getting resources from DB");
			}

			throw new DBError("Something went wrong while doing DB operation");
		}
	}

	async getOne(userIdOrEmail: string) {
		try {
			const user = await this._prisma.user.findFirst({
				where: {
					OR: [{ id: userIdOrEmail }, { email: userIdOrEmail }],
				},
			});

			if (!user) {
				throw new DBError("Error getting resources from DB");
			}

			return user;
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				throw new DBError("Error getting resources from DB");
			}

			throw new DBError("Something went wrong while doing DB operation");
		}
	}

	async create(data: CreateUser) {
		try {
			const newUser = this._prisma.user.create({
				data,
			});

			return newUser;
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				throw new DBError("Error getting resources from DB");
			}

			throw new DBError("Something went wrong while doing DB operation");
		}
	}

	async update(userId: string, data: UpdateUser) {
		try {
			const updatedUser = await this._prisma.user.update({
				where: {
					id: userId,
				},
				data,
			});

			return updatedUser;
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				throw new DBError("Error getting resources from DB");
			}

			throw new DBError("Something went wrong while doing DB operation");
		}
	}

	async delete(userId: string) {
		try {
			await this._prisma.user.delete({
				where: {
					id: userId,
				},
			});
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				throw new DBError("Error getting resources from DB");
			}

			throw new DBError("Something went wrong while doing DB operation");
		}
	}
}
