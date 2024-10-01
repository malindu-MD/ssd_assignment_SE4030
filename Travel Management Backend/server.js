const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const app = express();
const passport = require('passport');
const helmet = require("helmet");
const csp = require("helmet-csp");
const session = require('express-session');
const rateLimit = require('express-rate-limit');

const PORT = process.env.PORT || 8070;

app.use(helmet());

// Implement rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});

// Apply the rate limiter globally
app.use(limiter);

require('./utils/passport');

app.use(
  csp({
    directives: {
      defaultSrc: ["'self'", "localhost:3000"],
      scriptSrc: ["'self'", "'unsafe-inline'", "localhost:3000"],
      styleSrc: ["'self'", "localhost:3000"],
    },
  })
);

app.use((req, res, next) => {
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  next();
});

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Mongodb connection success!");
});

app.use(session({
  secret: 'yourSecretKey',
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());


const authRoutes = require('./routes/GoogleAuth.js');
app.use("/auth",authRoutes);

const equipmentRouter = require("./routes/equipment.js");
app.use("/equipment", equipmentRouter);

const AddRouter = require("./routes/Registers.js");
app.use("/Register", AddRouter);

const paymentRouter = require("./routes/payments.js");
app.use(paymentRouter);

const travelPackageRouter = require("./routes/travelPackage.js");
app.use("/travelpackages", travelPackageRouter);

const inquiryRouter = require("./routes/inquiry.js");
app.use("/inquiry", inquiryRouter);

const inquiryAdminRouter = require("./routes/InquiryAdmin.js");
app.use("/inquiryAdmin", inquiryAdminRouter);

const UserRoute = require("./routes/UserProfile.js");
app.use("/User", UserRoute);

const adminlogRouter = require("./routes/AdminLogin");
app.use("/Admin", adminlogRouter);

const deleteuserrouter = require("./routes/Admin_Panel_ProfileManagement");
app.use("/access", deleteuserrouter);

const hotelBookingRouter = require("./routes/HotelBooking");
app.use("/hotelbooking", hotelBookingRouter);

const packageBookingRouter = require("./routes/Packagebooking.js");
app.use("/packagebooking", packageBookingRouter);

const hotelPackageRouter = require("./routes/HotelPackage");
app.use("/hotelpackage", hotelPackageRouter);

const GuideRouter = require("./routes/Guide");
app.use("/guide", GuideRouter);

const activityRouter = require("./routes/Activity");
app.use("/activities", activityRouter);

const activityuserRouter = require("./routes/ActivityUser");
app.use("/activityselect", activityuserRouter);

const feedbackRouter = require("./routes/Feedback");
app.use("/feedback", feedbackRouter);

const contactUsRouter = require("./routes/ContactUs");
app.use("/contactus", contactUsRouter);

const guideRequestRouter = require("./routes/GuideRequest");
app.use("/guiderequest", guideRequestRouter);

const TravlPackagereviewRoutes = require("./routes/TravelPackageRating");
app.use("/travelpackage/review", TravlPackagereviewRoutes);

app.listen(PORT, () => {
  console.log(`The port is : ${PORT}`);
});
