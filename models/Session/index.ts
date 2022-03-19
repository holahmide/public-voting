import { Schema, model } from 'mongoose';

const Session = new Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
  },
  uniqueCode: {
    type: String,
    unique: true
  },
  description: String,
  logo: String,
  startDate: Date,
  endDate: Date,
  isActive: Boolean,
  user: { type: Schema.Types.ObjectId, ref: 'User' }
});

export default model('Session', Session);
