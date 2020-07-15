import { Telegraf, Context, Markup } from 'telegraf';
import { User } from '../db/models/user';
import { getLearnWord } from '../db/controllers/userController';

const learnKeyboard = (title: string) => Markup.inlineKeyboard([
  Markup.callbackButton(`Check?`, `checked-${title}`),
]).extra();

export async function learn(bot: Telegraf<Context>) {
  bot.command('learn', async (ctx) => {
    const word = await getLearnWord(ctx.from.id);
    if (!word) return ctx.reply(`You don't have any words to learn!`);

    return ctx.reply(`${word.title}`, learnKeyboard(word.title));
  });
}
