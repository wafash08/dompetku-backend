import type { Session, Transaction, User } from "@prisma/client";

export interface IUser {
	getAll: () => Promise<User | null>;
	getOne: (id: string) => Promise<User | null>;
	create: (data: Omit<User, "id">) => Promise<User>;
	update: (id: string, data: Partial<User>) => Promise<User>;
	delete: (id: string) => Promise<void>;
}

export interface ISession {
	getOne: (sessionId: string) => Promise<Session | null>;
	create: (userId: string) => Promise<Session>;
	delete: (sessionId: string) => Promise<void>;
}

export interface ITransaction {
	getAll: () => Promise<Transaction | null>;
	getOne: (id: string) => Promise<Transaction | null>;
	create: (data: Omit<Transaction, "id">) => Promise<Transaction>;
	update: (id: string, data: Partial<Transaction>) => Promise<Transaction>;
	delete: (id: string) => Promise<void>;
}
