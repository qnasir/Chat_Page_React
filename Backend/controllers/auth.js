const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const crypto = require("crypto");
const User = require("../models/user");
const filterObj = require("../utils/filterObj");
const { promisify } = require("util");
const mailService = require("../services/mailer")

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
  mail.mailService({
    from: "qnasir575@gmail.com",
    to: "example@gmail.com",
    subject: "OTP for login",
    text: `Your otp is ${new_otp}. This is valid for 10 Mins.`
  })

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

// Protect
exports.protect = async (req, res, next) => {
  // 1) Getting token (JWT) and check if it's there

  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  } else {
    req.status(400).json({
      status: "error",
      message: "You are not logged In! Please log in to get access",
    });
    return;
  }

  // 2) Verification of token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exist
  const this_user = await User.findById(decoded.userId);
  if (!this_user) {
    res.status(400).res.json({
      status: "error",
      messasge: "The user does not exist",
    });
  }

  // 4) Check if user changed their password after token was issued
  if (this_user.changedPasswordAfter(decoded.iat)) {
    res.status(400).json({
      status: "error",
      message: "User recently updated password! Please log in again",
    });
  }

  req.user = this_user;

  next();
};

// Types of routes -> Protected (Only logged in user can access these) & Unprotected

// User Forget  Password (Forgot Password)
exports.forgotPassword = async (req, res, next) => {
  // 1) get user email
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    res.status(400).json({
      status: "Error",
      message: "There is no user with given email address",
    });
    return;
  }

  // Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  const resetURL = `https://tawk.com/auth/reset-password/?code=${resetToken}`;

  try {
    // TODO => Send email with reset url

    res.status(200).json({
      status: "success",
      message: "Reset Password link sent to email",
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    user.save({ validateBeforeSave: false });
    res.status(500).json({
      status: "error",
      message: "There was an error sending the email, Please try again later.",
    });
  }
};

// User Resetting  Password (Reset Password)
exports.resetPassword = async (req, res, next) => {
  // 1) Get user based on token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // If token has expired or submission is out of time window
  if (!user) {
    res.status(400).json({
      status: "error",
      message: "Token is invalid or expired.",
    });
    return;
  }

  // Update users password and set ResetToken & expiry to undefined
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save();

  // Log in the user and Send new JWT
  const token = signToken(user._id);

  // TODO => send an email to user informing about password change

  res.status(200).json({
    status: "success",
    message: "Password Reseted successfully",
    token,
  });
};
