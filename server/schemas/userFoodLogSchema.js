import { Schema, model } from "mongoose";

const userFoodLogSchema = new Schema(
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      date: {
        type: Date,
        required: true,
      },
      items: [
        {
          food: {
            type: Schema.Types.ObjectId,
            ref: "Food",
          },
          quantity: String, 
          fromRecipe: {
            type: Schema.Types.ObjectId,
            ref: "Recipe",
          },
        },
      ],
    },
    { timestamps: true }
  );

  export default model("UserFoodLog", userFoodLogSchema);