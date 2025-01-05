import { Prisma, type PrismaClient } from "@prisma/client";
import type {
	CreateTransaction,
	ITransaction,
	UpdateTransaction,
} from "../entities/interface";
import "reflect-metadata";
import { inject, injectable } from "inversify";
import { TYPES } from "../entities/types";
import { DBError } from "../entities/errors";

@injectable()
export class TransactionRepository implements ITransaction {
	private _prisma: PrismaClient;

	constructor(@inject(TYPES.prisma) prisma: PrismaClient) {
		this._prisma = prisma;
	}

	async getAll(userId: string) {
		try {
			const transactions = await this._prisma.transaction.findMany({
				where: {
					userId,
				},
			});

			return transactions;
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				throw new DBError("Error getting resources from DB");
			}

			throw new DBError("Something went wrong while doing DB operation");
		}
	}

	async getOne(transactionId: string) {
		try {
			const transaction = await this._prisma.transaction.findUnique({
				where: {
					id: transactionId,
				},
			});

			if (!transaction) {
				throw new DBError("Error while getting resources from DB");
			}

			return transaction;
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				throw new DBError("Error getting resources from DB");
			}

			throw new DBError("Something went wrong while doing DB operation");
		}
	}

	async create(data: CreateTransaction) {
		try {
			const newTransaction = this._prisma.transaction.create({
				data,
			});

			return newTransaction;
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				throw new DBError("Error getting resources from DB");
			}

			throw new DBError("Something went wrong while doing DB operation");
		}
	}

	async update(transactionId: string, data: UpdateTransaction) {
		try {
			const updatedTransaction = await this._prisma.transaction.update({
				where: {
					id: transactionId,
				},
				data,
			});

			return updatedTransaction;
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				throw new DBError("Error getting resources from DB");
			}

			throw new DBError("Something went wrong while doing DB operation");
		}
	}

	async delete(transactionId: string) {
		try {
			await this._prisma.transaction.delete({
				where: {
					id: transactionId,
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
