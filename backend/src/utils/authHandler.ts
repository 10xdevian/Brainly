import jwt from "jsonwebtoken";

const generateToken = async (user: { email?: string; _id: string }) => {
  const secret = process.env.JWT_SECRET_KEY;
  
  if (!secret) throw new Error("JWT_SECRET_KEY is not defined in environment variables");

  const accessToken = jwt.sign(
    { data: { email: user?.email, id: user._id } },
    secret,
    { expiresIn: 60 * 60 } // 1 hour
  );

  const refreshToken = jwt.sign(
    { data: { email: user?.email, id: user._id } },
    secret,
    { expiresIn: "7d" }
  );

  return { accessToken, refreshToken };
};

export default generateToken;
