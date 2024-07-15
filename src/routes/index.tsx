import { Title } from "@solidjs/meta";
import { type RouteDefinition, cache, createAsync } from "@solidjs/router";
import { getRequestEvent } from "solid-js/web";
import Counter from "~/components/Counter";
import { api } from "~/lib/api";
import { createTrpcServer } from "~/server/api/root";

const getHello = cache(async () => {
    "use server"
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    const req = getRequestEvent()!
    const trpcServer = createTrpcServer(req?.request, req?.response.headers)
    return await trpcServer.example.hello("world")
  }, "hello")

export const route = {
  load: () => getHello()
} satisfies RouteDefinition

export default function Home() {
  const hello = createAsync(() => api.example.hello.query("world"));
  return (
    <main>
      <Title>Hello World</Title>
      <h1>Hello world!</h1>
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
    </main>
  );
}
