import { Telegraf, Context } from 'telegraf';
import { checkWord } from '../db/controllers/userController';

export async function checkActions(bot: Telegraf<Context>) {
  bot.action(/^checked-+([A-Za-z]+)/, async (ctx) => {
    const word = ctx.callbackQuery.data.split(/-/);
    const response = await checkWord(ctx.from.id, word[1]);
    if (!response) return null;
  
    return ctx.editMessageText(`${word[1]} - checked as learned!`);
  });
}