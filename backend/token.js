import crypto from "crypto";

// Generate a random string
const generateRandomString = () => {
  return crypto.randomBytes(64).toString("hex");
};

const secretKey = generateRandomString();
console.log("JWT Secret Key:", secretKey);
