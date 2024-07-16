import { Title } from "@solidjs/meta";
import { type RouteDefinition, cache, createAsync, action, redirect } from "@solidjs/router";
import { createResource } from "solid-js";
import { Suspense, getRequestEvent } from "solid-js/web";
import { appendHeader} from "vinxi/http";
import Counter from "~/components/Counter";
import { api } from "~/lib/api";
import { lucia } from "~/lib/auth";
import { getAuthenticatedUser } from "~/lib/auth-utils";
import { createTrpcServer, createTrpcServer2 } from "~/server/api/root";

const getHello = cache(async () => {
    "use server"
    return await createTrpcServer2().example.hello("world")
  }, "hello")

export const route = {
  load: () => {
    // getHello()
    // getAuthenticatedUser()
  }
} satisfies RouteDefinition

export default function Home() {
  const hello = createAsync(() => api.example.hello.query("world"));
  const user = createAsync(() => getAuthenticatedUser());
  const [secret, _] = createResource(() => api.example.secret.query());
  return (
    <main>
      <Title>Hello World</Title>
      <h1>Hello world!</h1>
      <h2>Hi, {user()?.username}!</h2>
			<p>Your user ID is {user()?.id}.</p>
			<form method="post" action={logout}>
				<button type="submit">Sign out</button>
			</form>
      <Counter />
      <p>
        Visit{" "}
        <a href="https://start.solidjs.com" target="_blank">
          start.solidjs.com
        </a>{" "}
        to learn how to build SolidStart apps.
      </p>
      <pre>
        <code>{JSON.stringify(hello(), null, 2)}</code>
      </pre>
      <Suspense fallback={<div>Unauthorized</div>}>
        {secret()}
      </Suspense>
    </main>
  );
}

const logout = action(async function logout() {
  "use server";
	const event = getRequestEvent()!;
	if (!event.locals.session) {
		return new Error("Unauthorized");
	}
	await lucia.invalidateSession(event.locals.session.id);
	appendHeader(event.nativeEvent, "Set-Cookie", lucia.createBlankSessionCookie().serialize());
	throw redirect("/login");
})