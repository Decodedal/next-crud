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
        }),
        
    ],
    async signIn({ profile }){
        try{
            const user = await prisma.user.findUnique({
                email:profile.email
            })

            if(!user){
              const user = await prisma.user.create({
                    data:{
                        email:profile.email,
                        name:profile.name,
                        image:profile.picture
                    }
                })
            }
        }catch(error){
            console.log(error)
            return false;
        }
    },
    callbacks: {
        session: async ({ session, user }) => {
            session.user.id = user.id
            return session
        }
    }
    
})

export { handler as GET, handler as POST};