import { Telegraf, Context } from 'telegraf';
import { getUserWords } from '../db/controllers/userController';
import { IWord } from '../db/models/user';

export async function list(bot: Telegraf<Context>) {
  bot.command('list', async (ctx) => {
    const list: IWord[] = await getUserWords(ctx.message.from.id);
    if (!list) {
      return ctx.reply(`No words`);
    }
    return ctx.reply(`Your words: \n${list.map(item => `${item.title} - ${item.checked ? 'learned' : 'not learned'}\n`)}`);
  });
}