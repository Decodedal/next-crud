import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from '@/db/prisma'


const handler = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers:[
        GoogleProvider({
            clientId:process.env.GOOGLE_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    async session({session}){
           const sessionUser = await prisma.user.findUnique({
            email:session.user.email
           })
           session.user.id = sessionUser.id.toString();

           return session;
    },
    async signIn({ profile }){
        try{
            const userExists = prisma.user.findUnique({
                email:profile.email
            })

            if(!userExists){
                await prisma.user.create({
                    email:profile.email,
                    name:profile.name,
                    image:profile.picture
                })
            }
        }catch(error){
            console.log(error)
            return false;
        }
    }
})

export { handler as GET, handler as POST};