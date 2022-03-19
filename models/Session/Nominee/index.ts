import { Schema, model } from 'mongoose';

const Nominee = new Schema({
  name: {
    type: String,
    required: true,
  },
  level: Number,
  regNo: Number,
  picture: String,
  votes: Number,
  session: { type: Schema.Types.ObjectId, ref: 'Session' },
  category: { type: Schema.Types.ObjectId, ref: 'Category' }
});

export default model('Nominee', Nominee);
