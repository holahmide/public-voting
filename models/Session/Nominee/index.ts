import { Schema, model } from 'mongoose';

const Nominee = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    regno: Number,
    level: Number,
    picture: String,
    blurPicture: String,
    department: String,
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

export default model('Nominee', Nominee);
