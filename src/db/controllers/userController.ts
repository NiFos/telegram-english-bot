import { User } from "../models/user";

export async function getUserWords(userId: number) {
  const user = await User.findOne({ userId });
  if (!user) {
    return [];
  }
  if (!user.words) return [];
  return user.words;
}

export async function getLearnWord(userId: number) {
  const user = await User.findOne({ userId });
  if (!user) {
    return false;
  }

  if (!user.words || user.words.length <= 0) return false;
  user.words = [...user.words].filter(item => item.checked === false);

  const word = user.words[Math.floor(Math.random() * user.words.length)];
  return word;
}

export async function addWordToList(userId: number, title: string) {
  let user = await User.findOne({ userId });
  if (!user) {
    user = new User;
    user.userId = userId;
  }
  user.words.push({ title, checked: false });
  await user.save();
}
export async function checkWord(userId: number, title: string): Promise<boolean> {
  let user = await User.findOne({ userId });
  if (!user) return false;

  let newWords = [...user.words];
  const id = newWords.findIndex(item => item.title === title);
  newWords[id].checked = true;
  user.words = newWords;

  await user.save();
  return true;
}