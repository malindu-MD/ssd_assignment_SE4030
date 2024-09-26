const router = require("express").Router();
let Reg = require("../models/Register");
const generateToken = require("../utils/generateToken");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.route("/add").post(async (req, res) => {
  // Note the use of async keyword
  try {
    const Name = req.body.Name;
    const Email = req.body.Email;
    const Num = req.body.Num;
    const Password = req.body.Password;

    const hashPass = await bcrypt.hash(Password, 10); // Wait for bcrypt.hash to complete

    console.log(hashPass);
    const userDb = {
      Name,
      Email,
      Num,
      hashPass,
    };
    const newUser = new Reg(userDb);
    await newUser.save(); // Wait for save operation to complete
    res.send({ newUser, success: true });
    console.log(newUser);
  } catch (err) {
    res.send(err);
  }
});

router.route("/login").post(async (req, res) => {
  try {
    const { Email, Password } = req.body;

    const user = await Reg.findOne({ Email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(Password, user.hashPass);
    if (passwordMatch) {
      const token = jwt.sign({ userId: user._id }, "your-secret-key", {
        expiresIn: "1h",
      });

      return res.status(200).json({ success: true, token, userId: user._id });
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect password" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

//localhost:8070/Register/add

// http: router.route("/add").post((req, res) => {
//   const Name = req.body.Name;
//   const Email = req.body.Email;
//   const Num = req.body.Num;
//   const Password = req.body.Password;

//   const NewAdd = new Reg({
//     Name,
//     Email,
//     Password,
//     Num,
//   });
//   NewAdd.save()
//     .then(() => {
//       res.json("Registration Added");
//     })
//     .catch((err) => {
//       console.log(err);
//       res.json(err);
//       console.log("reg err");
//     });
// });

// router.route("/login").post((req, res) => {
//   const Email = req.body.Email;
//   const Password = req.body.Password;

//   Reg.findOne({ Email: Email, Password: Password })
//     .then((Registers) => {
//       if (Registers == null) {
//         success: false;
//       } else {
//         success: true;
//         res.json({
//           id: Registers._id,
//           Name: Registers.Name,
//           Email: Registers.Email,
//           Password: Registers.Password,
//           token: generateToken(Registers._id),
//         });
//       }
//     })
//     .catch((err) => {
//       res.json("Validation Faild");
//     });
// });

module.exports = router;
