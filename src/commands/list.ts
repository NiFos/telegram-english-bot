import { Telegraf, Context } from 'telegraf';
import { getUserWords } from '../db/controllers/userController';
import { IWord } from '../db/models/user';

export async function list(bot: Telegraf<Context>) {
  bot.hears('📗 List', async (ctx) => {
    const list: IWord[] = await getUserWords(ctx.message.from.id, false);
    if (list.length <= 0) {
      return ctx.reply(`You don't have any words!`);
    }
    return ctx.reply(`Your words to learning: \n${list.map(item => `${item.title} - ${item.checked ? '✅ learned' : '❌ not learned'}\n`)}`);
  });
  bot.hears('📘 Learned words', async (ctx) => {
    const list: IWord[] = await getUserWords(ctx.message.from.id, true);
    if (list.length <= 0) {
      return ctx.reply(`You don't have any words!`);
    }
    return ctx.reply(`All your words: \n${list.map(item => `${item.title} - ${item.checked ? '✅ learned' : '❌ not learned'}\n`)}`);
  });
}