import type {
	CreateTransaction,
	UpdateTransaction,
} from "../../infrastructure/entities/interface";
import type { TransactionRepository } from "../../infrastructure/repositories/transaction.repository";
import "reflect-metadata";
import { inject, injectable } from "inversify";
import { TYPES } from "../../infrastructure/entities/types";

@injectable()
export class TransactionServices {
	private _transactionRepository: TransactionRepository;

	constructor(
		@inject(TYPES.transactionRepository)
		transactionRepository: TransactionRepository,
	) {
		this._transactionRepository = transactionRepository;
	}

	async getAll(userId: string) {
		const transactions = await this._transactionRepository.getAll(userId);

		return transactions;
	}

	async getOne(transactionId: string) {
		const transaction = await this._transactionRepository.getOne(transactionId);

		return transaction;
	}

	async create(data: CreateTransaction) {
		const newTransaction = await this._transactionRepository.create(data);

		return newTransaction;
	}

	async update(transactionId: string, data: UpdateTransaction) {
		const updatedTransaction = this._transactionRepository.update(
			transactionId,
			data,
		);

		return updatedTransaction;
	}

	async delete(transactionId: string) {
		await this._transactionRepository.delete(transactionId);
	}
}
