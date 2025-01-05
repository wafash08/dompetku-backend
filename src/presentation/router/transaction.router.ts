import Elysia, { t } from "elysia";
import { Decimal } from "@prisma/client/runtime/library";
import { authServices, transactionServices } from "../../application/instance";

export const transactionRouter = new Elysia({ prefix: "/v1/transactions" })
	.derive(async ({ headers }) => {
		// get sessionId
		// this code will split string containing "Bearer Token/sessionId"
		// and get Token/sessionId
		const sessionId = headers.authorization?.split(" ")[1];
		// check sessionId
		if (!sessionId) {
			throw new Error("Error");
		}
		// get user by session id
		const user = await authServices.decodeSession(sessionId);
		// return user
		return user;
	})
	// routes
	.get("/", async ({ user }) => {
		const userId = user.id;
		const transactions = await transactionServices.getAll(userId);

		return transactions;
	})
	.get("/:id", async ({ params }) => {
		const transactionId = params.id;
		const transaction = await transactionServices.getOne(transactionId);

		return transaction;
	})
	.post(
		"/",
		async ({ body, user }) => {
			const { amount, date, note } = body;
			const userId = user.id;
			const decimalAmount = new Decimal(amount);

			const newTransaction = await transactionServices.create({
				amount: decimalAmount,
				date,
				note,
				userId,
			});

			return newTransaction;
		},
		{
			body: t.Object({
				amount: t.String(),
				date: t.Date(),
				note: t.String(),
			}),
		},
	)
	.patch(
		"/:id",
		async ({ params, body }) => {
			const transactionId = params.id;
			const { amount, date, note } = body;
			const decimalAmount = new Decimal(amount);
			const updatedTransaction = await transactionServices.update(
				transactionId,
				{
					amount: decimalAmount,
					date,
					note,
				},
			);

			return updatedTransaction;
		},
		{
			body: t.Object({
				amount: t.String(),
				date: t.Date(),
				note: t.String(),
			}),
		},
	)
	.delete("/:id", async ({ params }) => {
		const transactionId = params.id;
		await transactionServices.delete(transactionId);
	});
