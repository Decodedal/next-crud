import { prisma } from "@/db/prisma";

export const GET = async(req) =>{
    try{
        const Posts = await prisma.post.findMany({
            include: {
                user: true // Include the associated user data
              }
        })
        return new Response(JSON.stringify(Posts),{status:200})
    }catch(err){
        console.log(err)
        return new Response("Failed to fetch all propmts", {status:200})
    }
}