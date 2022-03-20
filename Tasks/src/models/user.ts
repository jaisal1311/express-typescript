import { model, Schema, Model } from "mongoose";
import validator from "validator";
import { hash, compare } from "bcrypt";
import * as jwt from "jsonwebtoken";

export interface UserType {
  name: string;
  age?: number;
  email: string;
  password: string;
  tokens: { token: string }[];
  generateAuthToken: () => string;
}

export interface UserModel extends Model<UserType> {
  findByCredentials({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): UserType;
}

const userSchema = new Schema<UserType>({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    lowercase: true,
    validate(value: string) {
      if (!validator.isEmail(value)) throw new Error("Email id is invalid");
    },
  },
  age: { type: Number, default: 0 },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 6,
    validate(value: string) {
      if (value === "password") throw new Error("Password not allowed");
    },
  },
  tokens: [
    {
      token: {
        type: String,
      },
    },
  ],
});

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "thisismytaskmanagerapi");
  user.tokens.push({ token });

  await user.save();
  return token;
};

userSchema.statics.findByCredentials = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  console.log("object");
  const user = await User.findOne({ email });
  // console.log(user);
  if (!user) {
    throw new Error("Unable to login");
  }

  const isMatch = await compare(password, user.password);
  console.log(isMatch);
  if (!isMatch) {
    throw new Error("Unable to login");
  }

  return user;
};

userSchema.pre("save", async function (next) {
  let user = this;

  if (user!.isModified("password")) {
    user.password = await hash(user.password, 8);
  }
  next();
});

export const User = model<UserType, UserModel>("user", userSchema);
