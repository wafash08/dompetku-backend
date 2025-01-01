import Elysia, { t } from "elysia";
import { authServices } from "../../application/instance";

export const authRouter = new Elysia()
	// routes
	.post(
		"/register",
		async ({ body, set }) => {
			try {
				const newUser = await authServices.registerUser({
					email: body.email,
					name: body.email,
					password: body.password,
					avatar: null,
				});

				set.status = 201;
				return newUser;
			} catch (error) {
				set.status = 500;

				if (error instanceof Error) {
					throw new Error(error.message);
				}

				throw new Error("Something went wrong");
			}
		},
		{
			body: t.Object({
				email: t.String({ minLength: 3 }),
				name: t.String({ format: "email" }),
				password: t.String({ minLength: 8 }),
			}),
		},
	);
