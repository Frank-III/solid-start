import type { RequestEvent } from "solid-js/web";
import { createContext } from "./context";
import { exampleRouter } from "./routers/example";
import { createTRPCRouter, createCallerFactory } from "./utils";


export const appRouter = createTRPCRouter({
  example: exampleRouter
});

export type AppRouter = typeof appRouter;

const createCaller = createCallerFactory(appRouter);
// export const createTrpcServer = (req: Request, resHeaders: Headers) =>
  // createCaller(() => ({ req, resHeaders }))


export const createTrpcServer = (event: RequestEvent) => createCaller(() => createContext(event))
