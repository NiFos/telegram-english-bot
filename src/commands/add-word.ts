import { Context } from "telegraf";
import { addWordToList } from "../db/controllers/userController";
import { Message } from "telegraf/typings/telegram-types";

export async function addWord(
  ctx: Context,
  next: () => void
): Promise<void | Message> {
  try {
    if (!ctx.from || !ctx.message) throw "from is undefined";

    const userId = ctx.from.id;
    const title = ctx.message.text;
    if (!title) throw "title is undefined";

    if (title[0] !== "/" && title[0] !== ":") {
      await addWordToList(userId, title);
      return ctx.reply(`${title} - added!`);
    }

    return next();
  } catch (error) {
    return next();
  }
}
