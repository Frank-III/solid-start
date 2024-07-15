import { appendHeader, getCookie, getHeader } from "vinxi/server";
import { createMiddleware } from "@solidjs/start/middleware";
import { type Session, type User, verifyRequestOrigin } from "lucia";
import { lucia } from "./lib/auth";

export default createMiddleware({
	onRequest: async (e) => {
    const event = e.nativeEvent;
		if (event.node.req.method !== "GET") {
			const originHeader = getHeader(event, "Origin") ?? null;
			const hostHeader = getHeader(event, "Host") ?? null;
			if (!originHeader || !hostHeader || !verifyRequestOrigin(originHeader, [hostHeader])) {
				event.node.res.writeHead(403).end();
				return;
			}
		}

		const sessionId = getCookie(event, lucia.sessionCookieName) ?? null;
		if (!sessionId) {
			event.context.session = null;
			event.context.user = null;
			return;
		}

		const { session, user } = await lucia.validateSession(sessionId);
		if (session?.fresh) {
			appendHeader(event, "Set-Cookie", lucia.createSessionCookie(session.id).serialize());
		}
		if (!session) {
			appendHeader(event, "Set-Cookie", lucia.createBlankSessionCookie().serialize());
		}
		e.locals.session = session;
		e.locals.user = user;
	}
});

declare module "@solidjs/start/server" {
  interface RequestEventLocals {
		user: User | null;
		session: Session | null;
	}
}