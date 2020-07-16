import { Context } from 'telegraf';
import { addWordToList } from '../db/controllers/userController';

export async function addWord(ctx: Context, next: () => any) {
  if (!ctx.message || !ctx.message.from) return next();
  const userId = ctx.message.from.id;
  const title = ctx.message.text;
  if (!title) return next();
  if (title[0] !== '/' && title[0] !== ':') {
    await addWordToList(userId, title);
    return ctx.reply(`${title} - added!`);
  } else {
    next();
  }
}