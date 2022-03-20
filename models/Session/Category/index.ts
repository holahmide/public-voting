import { Schema, model } from 'mongoose';

const Category = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  session: { type: Schema.Types.ObjectId, ref: 'Session' }
});

export default model('Category', Category);
