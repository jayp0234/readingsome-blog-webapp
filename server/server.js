import express from "express";
import mongoose from "mongoose";

const server = express();

let PORT = 3000;

let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

server.use(express.json());

const dbURI = process.env.DATABASE_URL;
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected…"))
  .catch((err) => console.log(err));

server.post("/signup", (req, res) => {
  let { fullname, email = undefined, password } = req.body;

  if (fullname.length < 3) {
    return res
      .status(403)
      .json({ error: "Full Name must be atleast 3 letters long" });
  }
  if (!email.length) {
    return res.status(403).json({ error: "Enter Email Address" });
  }
  if (!emailRegex.test(email)) {
    return res.status(403).json({ error: "Email is Invalid" });
  }
  if(!passwordRegex.test(password)){
    return res.status(403).json({ error: "Password should be 6 to 20 characters long with a numeric, one lowercase and one upper case letter." });
  }
  return res.status(200).json({ status: "Okay" });
});

server.listen(PORT, () => {
  console.log("listening on port -> " + PORT);
});
