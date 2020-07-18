import { Telegraf, Context } from 'telegraf';
import { getUserWords } from '../db/controllers/userController';
import { IWord } from '../db/models/user';

export async function list(bot: Telegraf<Context>): Promise<void> {
  bot.hears('📗 List', async (ctx) => {
    if (!ctx.from) return ctx.reply('Error');
    const userId = ctx.from.id;
    if (userId === 0) return ctx.reply('Error');
    const list: IWord[] = await getUserWords(userId, false);
    if (list.length <= 0) {
      return ctx.reply(`You don't have any words!`);
    }
    return ctx.reply(`Your words to learning: \n${list.map(item => `${item.title} - ${item.checked ? '✅ learned' : '❌ not learned'}\n`)}`);
  });
  bot.hears('📘 Learned words', async (ctx) => {
    if (!ctx.from) return ctx.reply('Error');
    const userId = ctx.from.id;
    if (userId === 0) return ctx.reply('Error');
    const list: IWord[] = await getUserWords(userId, true);
    if (list.length <= 0) {
      return ctx.reply(`You don't have any words!`);
    }
    return ctx.reply(`All your words: \n${list.map(item => `${item.title} - ${item.checked ? '✅ learned' : '❌ not learned'}\n`)}`);
  });
}