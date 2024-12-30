import type { Session, Transaction, User } from "@prisma/client";

export type CreateUser = Omit<User, "id">;
export type UpdateUser = Partial<User>;

export interface IUser {
	getAll: () => Promise<User[]>;
	getOne: (id: string) => Promise<User | null>;
	create: (data: CreateUser) => Promise<User>;
	update: (id: string, data: UpdateUser) => Promise<User>;
	delete: (id: string) => Promise<void>;
}

export interface ISession {
	getOne: (sessionId: string) => Promise<Session | null>;
	create: (userId: string) => Promise<Session>;
	delete: (sessionId: string) => Promise<void>;
}

export type CreateTransaction = Omit<Transaction, "id">;
export type UpdateTransaction = Partial<Transaction>;

export interface ITransaction {
	getAll: (userId: string) => Promise<Transaction[]>;
	getOne: (id: string) => Promise<Transaction | null>;
	create: (data: CreateTransaction) => Promise<Transaction>;
	update: (id: string, data: UpdateTransaction) => Promise<Transaction>;
	delete: (id: string) => Promise<void>;
}
