const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const User = require("../models/user");
const filterObj = require("../utils/filterObj");

const signToken = (userId) => jwt.sign({ userId }, process.env.JWT_SECRET);

// User Register Route
exports.register = async (req, res, next) => {
  const { firstName, lastName, email, password, verified } = req.body;

  const filteredBody = filterObj(req.body, "firstName", "lastName", "password");

  // check if a verified user with given email exists
  const existing_user = await User.findOne({ email: email });

  if (existing_user && existing_user.verified) {
    res.status(400).json({
      status: "error",
      message: "Email already in use, Please login.",
    });
  } else if (existing_user) {
    await User.findOneAndUpdate(
      { email: email },
      { filteredBody },
      { new: true, validateModifiedOnly: true }
    );

    // generate OTP and send email to user
    req.userId = existing_user._id;
    next();
  } else {
    // If user record is not available in our DB
    const new_user = await User.create(filteredBody);

    // generate OTP and send email to user
    req.userId = new_user._id;
    next();
  }
};

// User generating OTP
exports.sendOTP = async (req, res, next) => {
  const { userId } = req;
  const new_otp = otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });

  const otp_expiry_time = Date.now() + 10 * 60 * 1000; // 10 mins after otp is send

  await User.findByIdAndUpdate(userId, {
    otp: new_otp,
    otp_expiry_time,
  });

  // TODO => Send Mail
  res.status(200).json({
    status: "success",
    message: "OTP Sent Successfully!",
  });
};

// OTP verification
exports.verifyOTP = async (req, res, next) => {
  // verify OTP and update user record accordingly

  const { email, otp } = req.body;

  const user = User.findOne({
    email,
    otp_expiry_time: { $gt: Date.now() },
  });

  if (!user) {
    res.status(400).json({
      status: "error",
      message: "Email is not valid or OTP expired",
    });
  }

  if (!(await user.correctOTP(otp, user.otp)))
    res.status(400).json({
      status: "error",
      message: "OTP is incorrect",
    });

  // OTP is correct

  user.verified = true;
  user.otp = undefined;

  await user.save({ new: true, validateModifiedOnly: true });

  const token = signToken(user._id);

  res.status(200).json({
    status: "success",
    message: "OTP verified successfully!",
    token,
  });
};

// User Login Route
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({
      status: "error",
      message: "Both email and password are required",
    });
  }

  const userDoc = await User.findOne({ email: email }).select("+password");

  if (
    !userDoc ||
    !(await userDoc.correctPassword(password, userDoc.password))
  ) {
    res.status(400).json({
      status: "Error",
      message: "Email or password is incorrect",
    });
  }

  const token = signToken(userDoc._id);

  res.status(200).json({
    status: "success",
    message: "Logged in successfully",
    token,
  });
};

// User Forget  Password (Forgot Password)
exports.forgotPassword = async (req, res, next) => {
  //
};

// User Resetting  Password (Reset Password)
exports.resetPassword = async (req, res, next) => {
  //
};
