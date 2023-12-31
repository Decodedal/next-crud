import Feed from "@/components/Feed"
import { prisma } from "@/db/prisma"

const Home = async() => {

  const posts = await prisma.post.findMany()


  return (
    <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">
            Discover & Share
            <br/>
            <span className="orange_gradient text-center">AI-Powred Prompts</span>
        </h1>
        <p className="desc text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam perferendis doloremque dicta illum id maxime dolores magni maiores quisquam quis ab molestiae, enim, eveniet asperiores non nostrum quam. Tempore, porro.
        </p>
        <Feed/>
    </section>
  )
}

export default Home