import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const authOptions: NextAuthOptions = {
  // Secret for Next-auth, without this JWT encryption/decryption won't work
  secret: process.env.NEXT_AUTH_SECRET as string,

  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.NEXT_GITHUB_OAUTH_CLIENT_ID as string,
      clientSecret: process.env.NEXT_GITHUB_OAUTH_CLIENT_SECRET as string,
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
};
