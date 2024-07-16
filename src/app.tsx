import { MetaProvider, Title } from "@solidjs/meta";
import { Router, action, createAsync, redirect } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Show, Suspense } from "solid-js";
import "./app.css";
import { getAuthenticatedUser } from "./lib/auth-utils";
import { getRequestEvent } from "solid-js/web";
import { lucia } from "./lib/auth";
import { appendHeader } from "vinxi/server";
import { Nav } from "./components/Nav";

export default function App() {
  return (
    <Router
      root={props => {
        return (
          <MetaProvider>
            <Title>SolidStart - Basic</Title>
            <Nav />
            <Suspense>{props.children}</Suspense>
          </MetaProvider>
        );
      }}
    >
      <FileRoutes />
    </Router>
  );
}
