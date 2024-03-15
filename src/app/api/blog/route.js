import {connectToDb} from "@/lib/utils";
import {Post} from "@/lib/model";
import {NextResponse} from "next/server";

export const GET = async () => {
  try {

    await connectToDb();
    const posts = await Post.find();

    return NextResponse.json(posts);
  }
  catch (e) {
    console.log(e);
    throw new Error("Failed to fetch posts!");
  }
}