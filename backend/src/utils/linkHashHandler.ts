import crypto from "crypto";
export const generateRandomHash = () => {
  return crypto.randomBytes(10).toString("hex");
};
