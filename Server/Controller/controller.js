export const logIn = async (req, res) => {
  console.log("request in login :", req);
  res.status(200).json({ data: req.body });
};
