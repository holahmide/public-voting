import { Schema, model } from 'mongoose';

const Nominee = new Schema({
  name: {
    type: String,
    required: true,
  },
  regno: Number,
  level: Number,
  picture: String,
  votes: Number,
  category: { type: Schema.Types.ObjectId, ref: 'Category' }
});

export default model('Nominee', Nominee);
