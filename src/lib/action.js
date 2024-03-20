"use server";

import {connectToDb} from "@/lib/utils";
import {Post} from "@/lib/model";
import {revalidatePath} from "next/cache";
import {signIn, signOut} from "@/lib/auth";

export const addPost = async (formData) => {
  const { title, description, slug, userId } = Object.fromEntries(formData);

  try {
    await connectToDb();

    const newPost = new Post({
      title,
      description,
      slug,
      userId
    });

    await newPost.save();
    console.log("Post saved successfully");
    revalidatePath("/blog");
  } catch (err) {
    console.log(err);
    return { error: "Failed to connect to the database" };
  }
}

export const deletePost = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    await connectToDb();

    await Post.findByIdAndDelete(id);

    console.log("deleted successfully");
    revalidatePath("/blog");
  } catch (err) {
    console.log(err);
    return { error: "Failed to connect to the database" };
  }
}

export const handleGithubLogin = async () => {
  await signIn("github");
}

export const handleLogout = async () => {
  await signOut();
}