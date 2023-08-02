import "./globals.css";
import { Session } from "next-auth";
import { headers } from "next/headers";
import AuthContext from "./AuthContext";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

async function getSession(cookie: string): Promise<Session> {
  const response = await fetch(
    `${process.env.NEXT_GITHUB_OAUTH_ENDPOINT}/api/auth/session`,
    {
      headers: {
        cookie,
      },
    }
  );

  const session = await response.json();
  console.log(session);
  return Object.keys(session).length > 0 ? session : null;
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = (await getSession(headers().get("cookie") ?? "")) || null;
  if (session == null) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div>You need to sign in to access more data.</div>
        <div>
          <Link
            href={`/api/auth/signin`}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "bg-emphasis text-gray-lowest shadow-gray hover:bg-emphasis-high hover:text-gray-lowest mx-4 rounded-full hover:outline-4 hover:drop-shadow-md"
            )}
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }
  return (
    <html lang="en">
      <AuthContext session={session}>
        <body>{children}</body>
      </AuthContext>
    </html>
  );
}
