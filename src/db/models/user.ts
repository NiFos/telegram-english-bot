import { Schema, model, Document } from 'mongoose';

const userCollection = 'users';

export interface IWord {
  title: string,
  checked: boolean
}
export interface IUser extends Document {
  userId: number,
  words: IWord[]
}

const userSchema = new Schema({
  userId: Number,
  words: [Object]
});

export const User = model<IUser>('User', userSchema, userCollection);