import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/libs/prisma";
import bcrypt from "bcrypt"
import { RequestInternal, User } from "next-auth";

const authOptions = {
    pages: {
        signIn: "/auth/login",
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),
        CredentialsProvider({
            name:"credentials",
            credentials: {
                email: { label: "email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials: Record<"email" | "password", string> | undefined, req: Pick<RequestInternal, "body" | "query" | "headers" | "method">): Promise<User | null> {
                if (!credentials) return null;
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                });
                if (!user) return null;

                const match = await bcrypt.compare(credentials.password, user.password);
                if (!match) return null;

                return { 
                    id: user.id.toString(), 
                    name: user.username,
                    email: user.email,
                    image: "https://www.gravatar.com/avatar/"
                };
            }
            
        })
    ]
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST}