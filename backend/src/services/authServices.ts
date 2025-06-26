import { User } from "../models/userModel";

export async function findUserByEmailOrUsername(
  email: string,
  username: string,
) {
  return await User.findOne({ $or: [{ email }, { username }] });
}

export async function createUser({
  email,
  username,
  password,
}: {
  email: string;
  password: string;
  username: string;
}) {
  const data = new User();
  data.username = username;
  data.password = password;
  data.email = email;
  return await data.save();
}
