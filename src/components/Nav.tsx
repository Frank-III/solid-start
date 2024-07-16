import { action, createAsync, redirect } from "@solidjs/router";
import { Show } from "solid-js"
import { getRequestEvent } from "solid-js/web";
import { appendHeader } from "vinxi/server";
import { lucia } from "~/lib/auth";
import { getAuthenticatedUser } from "~/lib/auth-utils";


export const Nav = () => {

  const user = createAsync(() => getAuthenticatedUser());
  return (
    <div class="border-b flex flex-row justify-between items-center">
      <div>
            <a href="/">Index</a>
            <a href="/about">About</a>
      </div>
            <Show when={user()} fallback={
            <button class="border text-zinc-300 bg-black" type="button">
              Login in with GitHub
            </button>}>
              <div class="inline-flex">
                Hi, {user()?.username}
                <form method="post" action={logout}>
                  <button type="submit">Sign out</button>
                </form>
              </div>
            </Show>
            </div>
  )
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