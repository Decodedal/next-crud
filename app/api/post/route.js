import { prisma } from "@/db/prisma";

export const GET = async(req) =>{
    try{
        const Posts = await prisma.post.findMany()
        return new Response(JSON.stringify(Posts),{status:200})
    }catch(err){
        console.log(err)
    }
}