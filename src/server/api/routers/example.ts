import * as v from "valibot";
import { authedProcedure, createTRPCRouter, publicProcedure } from "../utils";

export const exampleRouter = createTRPCRouter({
	hello: publicProcedure.input(v.parser(v.string())).query(({ input }) => {
		return `Hello ${input}!`;
	}),
	secret: authedProcedure.query(({ ctx }) => {
		return ctx.user.username;
	}),
});
