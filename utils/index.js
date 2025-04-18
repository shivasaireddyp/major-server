import jwt from "jsonwebtoken";

const createJWT = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Use secure cookies in production
    // sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", // Prevent CSRF attacks
    sameSite: "None", // Prevent CSRF attacks
    maxAge: 1 * 24 * 60 * 60 * 1000, // 1 days
  });
};

export default createJWT;
