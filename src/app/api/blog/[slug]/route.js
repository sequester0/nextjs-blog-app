import {connectToDb} from "@/lib/utils";
import {Post} from "@/lib/model";
import {NextResponse} from "next/server";
import {console} from "next/dist/compiled/@edge-runtime/primitives";

export const GET = async (request, { params }) => {
  const { slug } = params;

  try {
    await connectToDb();

    const post = await Post.findOne({slug: slug});
    return NextResponse.json(post);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch post!");
  }
};

export const DELETE = async (request, { params }) => {
  const { slug } = params;

  try {
    await connectToDb();

    await Post.deleteOne({slug: slug});
    return NextResponse.json("Post deleted!");
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete post!");
  }
};