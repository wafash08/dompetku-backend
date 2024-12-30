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

	async getOne(id: string) {
		const user = await this._prisma.user.findUnique({
			where: {
				id,
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

	async update(id: string, data: UpdateUser) {
		const updatedUser = await this._prisma.user.update({
			where: {
				id,
			},
			data,
		});

		return updatedUser;
	}

	async delete(id: string) {
		await this._prisma.user.delete({
			where: {
				id,
			},
		});
	}
}
