import NextAuth, { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: String(process.env.NEXT_GITHUB_OAUTH_CLIENT_ID),
      clientSecret: String(process.env.NEXT_GITHUB_OAUTH_CLIENT_SECRET),
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      let isAllowedToSignIn = true;
      const allowedUser = [String(process.env.NEXT_GITHUB_ACCOUNT_ID)];
      console.log(user);
      if (allowedUser.includes(String(user.id))) {
        isAllowedToSignIn = true;
      } else {
        isAllowedToSignIn = false;
      }
      return isAllowedToSignIn;
    },
  },
};

export default NextAuth(authOptions);
