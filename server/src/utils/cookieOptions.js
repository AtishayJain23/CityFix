module.exports = {
  httpOnly: true,
  //secure: process.env.NODE_ENV === "production",
   secure: true,
  sameSite: "none",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};
