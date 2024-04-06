"use server";

import {connectToDb} from "@/lib/utils";
import {Post, User} from "@/lib/model";
import {revalidatePath} from "next/cache";
import {signIn, signOut} from "@/lib/auth";
import bcrypt from "bcrypt";

export const addPost = async (prevState, formData) => {
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
    revalidatePath("/admin");
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
    revalidatePath("/admin");
  } catch (err) {
    console.log(err);
    return { error: "Failed to connect to the database" };
  }
}

export const addUser = async (prevState, formData) => {
  const { username, email, password, img, isAdmin } = Object.fromEntries(formData);

  try {
    await connectToDb();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      userName: username,
      email,
      password: hashedPassword,
      img,
      isAdmin
    });

    await newUser.save();
    console.log("Post saved successfully");
    revalidatePath("/admin");
  } catch (err) {
    console.log(err);
    return { error: "Failed to connect to the database" };
  }
}

export const deleteUser = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    await connectToDb();

    await Post.deleteMany({userId: id});
    await User.findByIdAndDelete(id);

    console.log("deleted successfully");
    revalidatePath("/admin");
  } catch (err) {
    console.log(err);
    return { error: "Failed to connect to the database" };
  }
}

export const register = async (previousState, formData) => {
  const { username, email, img, password, passwordRepeat } = Object.fromEntries(formData);

  if (password !== passwordRepeat) {
    return { error: "Passwords do not match" };
  }

  try {
    await connectToDb();

    const user = await User.findOne({userName: username});

    if (user) {
      return { error: "Username already exists" };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      userName: username,
      email,
      password: hashedPassword,
      img
    });
    await newUser.save();
    return { success: "User registered successfully" };
  } catch (e) {
    console.log(e);
    return { error: "Something went wrong!" };
  }
}

export const login = async (previousState, formData) => {
  const { username, password } = Object.fromEntries(formData);

  try {
    await signIn("credentials", {
      username,
      password
    });
  } catch (e) {
    if (e.message.includes("credentialssignin")) {
      return { error: "Invalid username or password" };
    }

    throw e
  }
}

export const handleGithubLogin = async () => {
  await signIn("github");
}

export const handleLogout = async () => {
  await signOut();
}