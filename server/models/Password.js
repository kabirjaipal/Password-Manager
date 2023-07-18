import { model, Schema } from "mongoose";

export const Password = model(
  "Password",
  new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
  })
);
