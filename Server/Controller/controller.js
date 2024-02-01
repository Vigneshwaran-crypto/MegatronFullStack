export const logIn = async (req, res) => {
  console.log("request in login :", req.query);
  res.send("Working");
};
