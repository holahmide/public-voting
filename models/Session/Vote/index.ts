import { Schema, model } from 'mongoose';

const Vote = new Schema({
  category : { type: Schema.Types.ObjectId, ref: 'Category' },
  nominee : { type: Schema.Types.ObjectId, ref: 'Nominee' },
  user: { type: Schema.Types.ObjectId, ref: 'User' }
});

export default model('Vote', Vote);