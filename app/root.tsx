import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "remix";
import type { MetaFunction } from "remix";

import styles from "~/tailwind.css";

export function links() {
    return [
        {
          rel: "stylesheet",
          href: "https://unpkg.com/@themesberg/flowbite@1.3.0/dist/flowbite.min.css",
        },
        { rel: "stylesheet", href: styles },
    ];
}

export const meta: MetaFunction = () => {
    return { title: "Pokedex App" };
};

export default function App() {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width,initial-scale=1"
                />
                <Meta />
                <Links />
            </head>
            <body>
                <Outlet />
                <ScrollRestoration />
                <Scripts />
                {process.env.NODE_ENV === "development" && <LiveReload />}
                <script src="https://unpkg.com/@themesberg/flowbite@1.3.0/dist/flowbite.bundle.js"></script>
            </body>
        </html>
    );
}
