import { prisma } from "@/db/prisma";

export const GET = async(req, { params }) =>{
    const id = params.id
    try{
        const Posts = await prisma.post.findMany({
            where: {
                userId: id  // Where the userId matches the specified userId
            },
            include: {
                user: true // Include the associated user data
            }
        });
        return new Response(JSON.stringify(Posts),{status:200})
    }catch(err){
        console.log(err)
        return new Response("Failed to fetch all propmts", {status:200})
    }
}