exports.registerUser = (req, res, next) => {
  console.log(req.body);
  res.status(200).json({ msg: "Success" });
};
