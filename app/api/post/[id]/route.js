import { prisma } from "@/db/prisma"

//GET (read)

export const GET = async (request, { params })=>{
    try{
    const post =  await prisma.post.findUnique({
            where:{
                id : params.id
            }
        })
    return new Response(JSON.stringify(post),{status:200})
    }catch(err){
        return new Response("Failed to fetch prompt",{status:404})
    }

}

//PATCH (update)
export const PATCH = async(request, { params })=>{
    const { prompt, tag} = await request.json();
    
    try{

        const UpdatedPrompt = await prisma.post.update({
            where:{
                id : params.id
            },
            data:{
                prompt:prompt,
                tags:tag
            }
        })

    return new Response(JSON.stringify(UpdatedPrompt),{status:200})
    }catch(err){
        return new Response("Failed to fetch prompt",{status:404})
    }
}

//DELETE (delete)

export const DELETE = async(request, { params })=>{
    try{
       await prisma.post.delete({
            where:{
                id:params.id
            }
        })
        return new Response(JSON.stringify("success"),{status:200})
    }catch(err){
        return new Response("Failed to fetch prompt",{status:404})
    }
} 