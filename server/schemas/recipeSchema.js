import { Schema, model } from "mongoose";

const recipeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      default:
        "https://www.google.com/url?https://www.nestledessertsarabia.com/sites/site.prod1.nestledessertsarabia.com/files/default_images/recipe-default-image.png=i&url=https%3A%2F%2Fwww.nestledessertsarabia.com%2Fnode%2F24&psig=AOvVaw2VIClWHq1CwFWHp1WAoAJV&ust=1745573146622000&source=images&cd=vfe&opi=89978449&ved=https://www.nestledessertsarabia.com/sites/site.prod1.nestledessertsarabia.com/files/default_images/recipe-default-image.png",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ingredients: [
        {
          food: {
            type: Schema.Types.ObjectId,
            ref: "Food", 
            required: true,
          },
          quantity: {
            type: String,
            required: true,
          },
        }
      ],
    steps: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],
    calories: {
      type: Number,
      required: true,
      min: 0,
    },
    prep_time: {
      type: Number,
      required: true,
      trim: true,
    },
    cook_time: {
      type: Number,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export default model("Recipe", recipeSchema);