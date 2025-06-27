import bcrypt from "bcryptjs";

export const hashedPassword = async (password: string) => {
  const saltRound = 10;
  const hashedPassword = await bcrypt.hash(password, saltRound);
  return hashedPassword;
};

export const comparePassword = async (
  password: string,
  hashedPassword: string,
) => {
  return await bcrypt.compare(password, hashedPassword);
};
