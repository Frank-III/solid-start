import { Title } from "@solidjs/meta";
import { type RouteDefinition, cache, createAsync } from "@solidjs/router";
import { createResource } from "solid-js";
import { Suspense } from "solid-js/web";
import Counter from "~/components/Counter";
import { api } from "~/lib/api";
import { getAuthenticatedUser } from "~/lib/auth-utils";
import { createTrpcServer2 } from "~/server/api/root";

const getHello = cache(async () => {
  "use server";
  return await createTrpcServer2().example.hello("world");
}, "hello");

export const route = {
  load: () => {
    getHello();
    // getAuthenticatedUser()
  },
} satisfies RouteDefinition;

export default function Home() {
  const hello = createAsync(() => api.example.hello.query("world"));
  const user = createAsync(() => getAuthenticatedUser());
  const [secret, _] = createResource(() => api.example.secret.query());
  return (
    <main>
      <Title>Hello World</Title>
      <h1>Hello world!</h1>
      {/* <h2>Hi, {user()?.username}!</h2>
			<p>Your user ID is {user()?.id}.</p> */}
      <Counter />
      <p>
        Visit{" "}
        <a href="https://start.solidjs.com" target="_blank" rel="noreferrer">
          start.solidjs.com
        </a>{" "}
        to learn how to build SolidStart apps.
      </p>
      <pre>
        <code>{JSON.stringify(hello(), null, 2)}</code>
      </pre>
      <Suspense fallback={<div>Unauthorized</div>}>{secret()}</Suspense>
    </main>
  );
}
