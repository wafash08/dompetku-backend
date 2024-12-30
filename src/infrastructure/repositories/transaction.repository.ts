import type { PrismaClient } from "@prisma/client";
import type {
	CreateTransaction,
	ITransaction,
	UpdateTransaction,
} from "../entities/interface";

export class UserRepository implements ITransaction {
	private _prisma: PrismaClient;
	constructor(prisma: PrismaClient) {
		this._prisma = prisma;
	}

	async getAll(userId: string) {
		const transactions = await this._prisma.transaction.findMany({
			where: {
				userId,
			},
		});

		return transactions;
	}

	async getOne(transactionId: string) {
		const transaction = await this._prisma.transaction.findUnique({
			where: {
				id: transactionId,
			},
		});

		return transaction;
	}

	async create(data: CreateTransaction) {
		const newTransaction = this._prisma.transaction.create({
			data,
		});

		return newTransaction;
	}

	async update(transactionId: string, data: UpdateTransaction) {
		const updatedTransaction = await this._prisma.transaction.update({
			where: {
				id: transactionId,
			},
			data,
		});

		return updatedTransaction;
	}

	async delete(transactionId: string) {
		await this._prisma.transaction.delete({
			where: {
				id: transactionId,
			},
		});
	}
}
