import mongoose, {
  CallbackWithoutResultAndOptionalError,
  Document,
  Model,
  Query,
} from 'mongoose';
import validator from 'validator';
import bycript from 'bcryptjs';

export interface IUser {
  name: string;
  email: string;
  password: string;
  passwordChangedAt: Date;
  photo: string;
  role: string;
}

export interface UserDoc extends IUser, Document {
  correctPassword(candidatePassword: string, userPassword: string): boolean;
  changedPasswordAfter(jwtTimestamp: number): boolean;
}

export interface UserModel extends Model<UserDoc> {}

const userSchema = new mongoose.Schema<UserDoc, UserModel>({
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

userSchema.pre(
  'save',
  async function (this: UserDoc, next: CallbackWithoutResultAndOptionalError) {
    // Only run this function if password is modified
    if (!this.isModified('password')) return next();

    // Hash the password with cost 12
    this.password = await bycript.hash(this.password, 12);
    this.passwordChangedAt = new Date(Date.now());
    next();
  },
);

userSchema.methods.correctPassword = async function (
  candidatePassword: string,
  userPassword: string,
): Promise<boolean> {
  return await bycript.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (
  this: UserDoc,
  jwtTimestamp: number,
) {
  if (this.passwordChangedAt) {
    const changedTimestamp: number = this.passwordChangedAt.getTime() / 1000;
    return jwtTimestamp < changedTimestamp; // 100 < 200
  }
  // Not changed
  return false;
};

const User = mongoose.model('User', userSchema);

export default User;
