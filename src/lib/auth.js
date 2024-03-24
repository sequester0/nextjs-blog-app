import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import {connectToDb} from "@/lib/utils";
import {User} from "@/lib/model";
import bcrypt from "bcrypt";
import {console} from "next/dist/compiled/@edge-runtime/primitives";
import {authConfig} from "@/lib/auth.config";


const login = async (credentials) => {
  try {
    await connectToDb();
    const user = await User.findOne({userName: credentials.username});

    if (!user) {
      throw new Error("Wrong credentials!");
    }

    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);

    if (!isPasswordCorrect) {
      throw new Error("Wrong credentials!");
    }

    return user;
  } catch (e) {
    console.log(e);
    throw new Error("Failed to login!")
  }
}

export const {handlers: {GET, POST}, auth, signIn, signOut} = NextAuth({
  ...authConfig,
  providers: [
      GitHub({
        clientId: process.env.GITHUB_ID, clientSecret: process.env.GITHUB_SECRET
      }),
      CredentialsProvider({
        async authorize(credentials){
          try {
            console.log(credentials)
            const user = await login(credentials);
            return user;
          } catch (e) {
            return null;
          }
        }
      })
  ],
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
    },
    ...authConfig.callbacks
  },
  secret: process.env.NEXTAUTH_SECRET,
})