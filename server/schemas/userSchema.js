import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 20,
    },
    first_name: {
      type: String,
      required: true,
      trim: true,
    },
    last_name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
    },
    image: {
      type: String,
      default:
        "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671138.jpg?t=st=1744816231~exp=1744819831~hmac=dc6a1669707e8e09b0e01be15baa665bf3b20a4d4fb4a0845d212074e7362efc&w=900",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    age: {
      type: Number,
      required: true,
      min: 18,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female", "other"],
      default: "male",
    },
    height: {
      type: Number,
      required: true,
      min: 0,
    },
    weight: {
      type: Number,
      required: true,
      min: 0,
    },
    target_weight: {
      type: Number,
      required: true,
      min: 0,
    },
    daily_calories: {
      type: Number,
      required: true,
      min: 0,
    },
    activity_level: {
      type: String,
      enum: [
        "sedentary",
        "lightly active",
        "moderately active",
        "very active",
        "super active",
      ],
      default: "sedentary",
    },
    allergies: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export default model("User", userSchema);