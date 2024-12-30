export const TYPES = {
	userRepository: Symbol.for("UserRepository"),
	sessionRepository: Symbol.for("SessionRepository"),
	transactionRepository: Symbol.for("TransactionRepository"),
	prisma: Symbol.for("PrismaClient"),
	logger: Symbol.for("Logger"),
};
