import mongoose from 'mongoose';

const Schema = mongoose.Schema;
export const Users = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  userId: {
    type: String
  },
  image: {
    type: String
  },
  refreshToken: {
    type: Array
  },
  address: {
    type: String
  },
  phoneNumber: {
    type: Number
  }
});

export default mongoose.model('users', Users);

// let User = mongoose.model("User", Users);
// module.exports = User;
