import { Schema, model } from 'mongoose';

const Role = new Schema({
  name: {
    type: String,
    unique: true,
  },
});

export default model('Role', Role);
