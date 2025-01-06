import { Elysia } from "elysia";
import { authRouter } from "./presentation/router/auth.router";
import { transactionRouter } from "./presentation/router/transaction.router";

const app = new Elysia({ prefix: "/api" })
	.use(authRouter)
	.use(transactionRouter)
	.listen(3000);

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
