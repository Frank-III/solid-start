import type { RequestEvent } from "solid-js/web";

export function createContext(event: RequestEvent) {
  console.log(JSON.stringify(event.locals))
	return {
		user: event.locals.user,
		session: event.locals.session,
	};

}
export type Context = Awaited<ReturnType<typeof createContext>>;
