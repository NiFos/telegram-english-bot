import { Context } from 'telegraf';
import { addWordToList } from '../db/controllers/userController';
import { Message } from 'telegraf/typings/telegram-types';

export async function addWord(ctx: Context, next: () => void): Promise<void | Message> {
  if (!ctx.from || !ctx.message) return next();
  const userId = ctx.from.id;
  const title = ctx.message.text;
  if (!title) return next();
  if (title[0] !== '/' && title[0] !== ':') {
    await addWordToList(userId, title);
    return ctx.reply(`${title} - added!`);
  } else {
    next();
  }
}