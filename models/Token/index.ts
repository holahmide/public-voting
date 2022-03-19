import { Schema, model } from 'mongoose';
import { TOKEN_TYPES } from '../../config';

const Token = new Schema(
  {
    token: String,
    expires: Date,
    isValid: {
      type: Boolean,
      default: true,
    },
    type: {
      type: String,
      enum: TOKEN_TYPES,
    },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

export default model('Token', Token);
