import { Schema, model } from 'mongoose';

const Nominee = new Schema({
  name: {
    type: String,
    required: true,
  },
  level: Number,
  regNo: Number,
  picture: String,
  category : { type: Schema.Types.ObjectId, ref: 'Category' },
  user: { type: Schema.Types.ObjectId, ref: 'User' }
});

export default model('Nominee', Nominee);
