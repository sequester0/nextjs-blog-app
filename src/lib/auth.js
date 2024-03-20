import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import {connectToDb} from "@/lib/utils";
import {User} from "@/lib/model";

export const {handlers: {GET, POST}, auth, signIn, signOut} = NextAuth({
  providers: [GitHub({
    clientId: process.env.GITHUB_ID, clientSecret: process.env.GITHUB_SECRET
  })],
  callbacks: {
    async signIn({account, profile}) {
      if (account.provider === "github") {
        await connectToDb()
        try {
          const user = await User.findOne({email: profile.email})

          if (!user) {
            const newUser  = new User({
              userName: profile.login,
              email: profile.email,
              img: profile.avatar_url
            });

            await newUser.save();
          }

        } catch (e) {
          console.error(e)
          return false;
        }
      }
      return true;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
})