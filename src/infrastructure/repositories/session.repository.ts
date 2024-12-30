import type { PrismaClient } from "@prisma/client";
import type { ISession } from "../entities/interface";
import "reflect-metadata";
import { inject, injectable } from "inversify";
import { TYPES } from "../entities/types";

@injectable()
export class SessionRepository implements ISession {
	private _prisma: PrismaClient;

	constructor(@inject(TYPES.prisma) prisma: PrismaClient) {
		this._prisma = prisma;
	}

	async getOne(sessionId: string) {
		const session = await this._prisma.session.findUnique({
			where: {
				id: sessionId,
			},
		});

		return session;
	}

	async create(userId: string) {
		const session = await this._prisma.session.create({
			data: {
				user: {
					connect: {
						id: userId,
					},
				},
			},
		});

		return session;
	}

	async delete(sessionId: string) {
		await this._prisma.session.delete({
			where: {
				id: sessionId,
			},
		});
	}
}
