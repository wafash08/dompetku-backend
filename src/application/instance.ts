import { Container } from "inversify";
import { TYPES } from "../infrastructure/entities/types";
import { UserRepository } from "../infrastructure/repositories/user.repository";
import { PrismaClient } from "@prisma/client";
import { SessionRepository } from "../infrastructure/repositories/session.repository";
import { TransactionRepository } from "../infrastructure/repositories/transaction.repository";
import { AuthServices } from "./services/auth.services";
import { TransactionServices } from "./services/transaction.services";

const container = new Container();

container.bind(TYPES.prisma).toConstantValue(new PrismaClient());

// repositories
container.bind(TYPES.userRepository).to(UserRepository);
container.bind(TYPES.sessionRepository).to(SessionRepository);
container.bind(TYPES.transactionRepository).to(TransactionRepository);

// services
container.bind(AuthServices).toSelf();
container.bind(TransactionServices).toSelf();

// instances
export const authServices = container.get<AuthServices>(AuthServices);
export const transactionServices =
	container.get<TransactionServices>(TransactionServices);
