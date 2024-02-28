import {Post, User} from "@/lib/model";
import {connectToDb} from "@/lib/utils";
import {unstable_noStore as noStore} from "next/cache";

export const getPosts = async () => {
  try {

    await connectToDb();
    return await Post.find();

  } catch (err) {
    console.log(err);
    throw new Error("Error fetching posts");
  }
};

export const getPost = async (slug) => {
  try {

    await connectToDb();
    return await Post.findOne({slug: slug});

  } catch (err) {
    console.log(err);
    throw new Error("Error fetching post");
  }
};

export const getUser = async (id) => {
  noStore();
  try {

    await connectToDb();
    return await User.findById(id);

  } catch (err) {
    console.log(err);
    throw new Error("Error fetching user");
  }
}

export const getUsers = async () => {
  try {

    await connectToDb();
    return await User.find();

  } catch (err) {
    console.log(err);
    throw new Error("Error fetching users");
  }
}