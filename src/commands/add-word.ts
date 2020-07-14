import { Context } from 'telegraf';
import { addWordToList } from '../db/controllers/userController';

export async function addWord(ctx: Context, next: () => any) {
  const userId = ctx.message.from.id;
  const title = ctx.message.text;
  if (title[0] !== '/') {
    await addWordToList(userId, title);
    return ctx.reply(`${title} - added!`);
  } else {
    next();
  }
}