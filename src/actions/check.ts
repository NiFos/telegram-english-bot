import { Telegraf, Context } from 'telegraf';
import { checkWord } from '../db/controllers/userController';
import { Message } from 'telegraf/typings/telegram-types';

export async function checkActions(bot: Telegraf<Context>): Promise<Message | void> {
  bot.action(/^checked-+([A-Za-z]+)/, async (ctx) => {
    if (!ctx.from || !ctx.callbackQuery) return ctx.reply('Error');
    const data = ctx.callbackQuery.data || '';
    if (data === '') return ctx.reply('Error');
    const word = data.split(/-/);
    const userId = ctx.from.id || 0;
    if (userId === 0) return ctx.reply('Error');
    const response = await checkWord(userId, word[1]);
    if (!response) return ctx.reply('Error');

    return ctx.editMessageText(`${word[1]} - checked as learned!`);
  });
}