import mongoose from 'mongoose';
import validator from 'validator';
import bycript from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user must have a name'],
  },
  email: {
    type: String,
    required: [true, 'A user must have an email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Email format invalid'],
  },
  password: {
    type: String,
    required: [true, 'A user must have a password'],
    minlength: 8,
    select: false,
  },
  passwordChangedAt: Date,
  photo: {
    type: String,
  },
  role: {
    type: String,
    enum: ['user', 'guide', 'lead-guide', 'admin'],
    default: 'user',
  },
});

userSchema.pre('save', async function (next) {
  // Only run this function if password is modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost 12
  this.password = await bycript.hash(this.password, 12);
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bycript.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (jwtTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10,
    );
    return jwtTimestamp < changedTimestamp; // 100 < 200
  }
  // Not changed
  return false;
};

const User = mongoose.model('User', userSchema);

export default User;
