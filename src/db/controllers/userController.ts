import { User, IWord } from "../models/user";

export async function getUserWords(
  userId: number,
  learned = false
): Promise<IWord[]> {
  try {
    if (!userId) throw "!userId";

    const words = await User.findOne({ userId }).then((data) => {
      if (!data || !data.words || data.words.length <= 0) return [];
      return data.words.filter((item) => item.checked === learned);
    });
    if (!words || words.length <= 0) {
      throw "No words";
    }
    return words;
  } catch (error) {
    return [];
  }
}

export async function getLearnWord(userId: number): Promise<false | IWord> {
  try {
    if (!userId) return false;

    const user = await User.findOne({ userId });
    if (!user) {
      return false;
    }
    if (!user.words || user.words.length <= 0) return false;

    user.words = [...user.words].filter((item) => item.checked === false);
    const word = user.words[Math.floor(Math.random() * user.words.length)];

    return word;
  } catch (error) {
    return false;
  }
}

export async function deleteAccount(userId: number): Promise<boolean> {
  try {
    if (!userId) throw "No userId";
    const response = await User.deleteOne({ userId });
    if (!response || (response.deletedCount || 0) > 0) return true;
    return false;
  } catch (error) {
    return false;
  }
}

export async function addWordToList(
  userId: number,
  title: string
): Promise<boolean> {
  try {
    if (!userId || !title) throw "No userId or title";

    let user = await User.findOne({ userId });
    if (!user) {
      user = new User();
      user.userId = userId;
    }
    user.words.push({ title, checked: false });
    const response = await user.save();
    if (response) return true;

    return false;
  } catch (error) {
    return false;
  }
}
export async function checkWord(
  userId: number,
  title: string
): Promise<boolean> {
  try {
    if (!userId || !title) throw "No userId or title";

    const user = await User.findOne({ userId });

    if (!user) throw "Cannot find user";

    const newWords = [...user.words];
    const id = newWords.findIndex((item) => item.title === title);

    if (id === -1) throw "Cannot find word";
    newWords[id].checked = true;
    user.words = newWords;

    await user.save();
    return true;
  } catch (error) {
    return false;
  }
}
