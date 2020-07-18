import { Telegraf, Context, Markup } from 'telegraf';
import { getLearnWord } from '../db/controllers/userController';

const learnKeyboard = (title: string) => Markup.inlineKeyboard([
  Markup.callbackButton(`📚 Check?`, `checked-${title}`),
]).extra();

export async function learn(bot: Telegraf<Context>): Promise<void> {
  bot.hears('📌 Learn', async (ctx) => {
    if (!ctx.from) return ctx.reply('Error');
    const userId = ctx.from.id || 0;
    if (userId === 0) return ctx.reply('Error');
    const word = await getLearnWord(userId);
    if (!word) return ctx.reply(`You don't have any words to learn!`);

    return ctx.reply(`${word.title}`, learnKeyboard(word.title));
  });
}
