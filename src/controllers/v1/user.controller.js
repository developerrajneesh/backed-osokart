const {
  SuccessResponse,
  ErrorResponse,
} = require("../../handlers/API_response");
const UserSchema = require("../../models/user.modal");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//-------------------------------Getting single Users -------------------------------
async function getSingleUser(req, res, next) {
  try {
    let id = req.params.id;
    const usersData = await UserSchema.findById(id)
      .populate("products.productId")
      .populate("cart.productId")
      .exec();
    res
      .status(200)
      .json(SuccessResponse(200, "Data retrivel successful", usersData));
  } catch (error) {
    res
      .status(200)
      .json(ErrorResponse(500, "Data retrivel unsuccessful", error));
  }
}
//-------------------------------Getting All Users -------------------------------
async function getAllUsers(req, res, next) {
  try {
    const usersData = await UserSchema.find();
    res
      .status(200)
      .json(SuccessResponse(200, "Data retrivel successful", usersData));
  } catch (error) {
    res
      .status(200)
      .json(ErrorResponse(500, "Data retrivel unsuccessful", error));
  }
}

//-------------------------------Register User -------------------------------
async function registerUser(req, res, next) {
  try {
    const { confirmPassword, password, ...restObj } = req.body;
    const saltRounds = process.env.salt_Rounds;
    if (confirmPassword !== password) {
      return res
        .status(500)
        .json(
          ErrorResponse(500, "Password and Confirm Password are not same!")
        );
    }
    const hashPassword = await bcrypt.hash(password, +saltRounds);

    const userData = new UserSchema({ ...restObj, password: hashPassword });
    await userData.save();
    res
      .status(201)
      .json(SuccessResponse(201, "Data retrivel successful", userData));
  } catch (error) {
    console.log(error);

    res
      .status(500)
      .json(ErrorResponse(500, "Data retrivel unsuccessful", error));
  }
}

//-------------------------------Update User -------------------------------
async function UpdateUser(req, res, next) {
  try {
    let id = req.params.id;
    //  console.log(req.body);

    const updatedUser = await UserSchema.updateOne(
      { _id: id },
      {
        $set: { ...req.body },
      }
    );
    res
      .status(200)
      .json(SuccessResponse(201, "User Updated successful", updatedUser));
  } catch (error) {
    res
      .status(500)
      .json(ErrorResponse(500, "User Updated unsuccessful", error));
  }
}

//-------------------------------User Login-------------------------------
async function LoginUser(req, res, next) {
  try {
    const privateKey = process.env.jwt_privateKey;
    const { email,phone, password } = req.body;
 const emailOrPhone = email||phone
    const updatedUser = await UserSchema.findOne({
      $or: [{ email: emailOrPhone }, { phone: emailOrPhone }],
    });

    if (!updatedUser) {
      return res
        .status(200)
        .json(
          SuccessResponse(
            204,
            "No User Found With This Email Or Phone Number",
            updatedUser
          )
        );
    }

    const result = await bcrypt.compare(password, updatedUser.password);

    const token = jwt.sign(
      {
        userEmail: updatedUser.email,
        userId: updatedUser._id,
        userName: updatedUser.name,
      },
      privateKey,
      { expiresIn: "1h" }
    );

    if (result) {
      res.status(200).json(
        SuccessResponse(200, "User Login successful", {
          token: token,
          userEmail: updatedUser.email,
          userId: updatedUser._id,
          userName: updatedUser.name,
        })
      );
    } else {
      res.status(203).json(SuccessResponse(203, "Password does not match"));
    }
  } catch (error) {
    console.log(error);

    res.status(500).json(ErrorResponse(500, "Something Went Wrong", error));
  }
}

module.exports = {
  getAllUsers,
  registerUser,
  UpdateUser,
  getSingleUser,
  LoginUser,
};
