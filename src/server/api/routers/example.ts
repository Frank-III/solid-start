import { wrap } from "@typeschema/valibot";
import * as v from 'valibot';
import { createTRPCRouter, publicProcedure } from "../utils";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(v.parser(v.string()))
    .query(({ input }) => {
      return `Hello ${input}!`;
    })
});
