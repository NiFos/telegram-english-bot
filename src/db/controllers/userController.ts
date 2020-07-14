import { User } from "../models/user";

export async function getUserWords(userId: number) {
  const user = await User.findOne({ userId });
  return user.words;
}

export async function addWordToList(userId: number, title: string) {
  let user = await User.findOne({ userId });
  if (!user) {
    user = new User;
    user.userId = userId;
  }
  user.words.push({ title, checked: false });
  user.save();
}