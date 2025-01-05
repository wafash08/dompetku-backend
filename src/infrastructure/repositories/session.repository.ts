import { Prisma, type PrismaClient } from "@prisma/client";
import type { ISession } from "../entities/interface";
import "reflect-metadata";
import { inject, injectable } from "inversify";
import { TYPES } from "../entities/types";
import { DBError } from "../entities/errors";

@injectable()
export class SessionRepository implements ISession {
	private _prisma: PrismaClient;

	constructor(@inject(TYPES.prisma) prisma: PrismaClient) {
		this._prisma = prisma;
	}

	async getOne(sessionId: string) {
		try {
			const session = await this._prisma.session.findUnique({
				where: {
					id: sessionId,
				},
			});

			if (!session) {
				throw new DBError("Error while getting resources from DB");
			}

			return session;
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				throw new DBError("Error getting resources from DB");
			}

			throw new DBError("Something went wrong while doing DB operation");
		}
	}

	async create(userId: string) {
		try {
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
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				throw new DBError("Error getting resources from DB");
			}

			throw new DBError("Something went wrong while doing DB operation");
		}
	}

	async delete(sessionId: string) {
		try {
			await this._prisma.session.delete({
				where: {
					id: sessionId,
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
