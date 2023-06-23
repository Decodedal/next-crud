import { prisma } from "@/db/prisma";

export const POST = async(req) => {
    const { userId, prompt, tag } = await req.json();

    try{
       const add = await prisma.post.create({
           data:{
            userId:userId,
            prompt:prompt,
            tags:tag
           }
        })
        return new Response(JSON.stringify("cool"))
    }catch(err){
        console.log(err)
    }
}