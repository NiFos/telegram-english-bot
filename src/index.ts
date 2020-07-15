import 'dotenv/config';
import { Telegraf, Markup } from 'telegraf';
import { connectMongo } from './db/mongo';
import { start } from './commands/start';
import { help } from './commands/help';
import { list } from './commands/list';
import { addWord } from './commands/add-word';
import { learn } from './commands/learn';
import { checkWord } from './db/controllers/userController';

connectMongo();

const token = process.env.BOT_TOKEN || '';
const bot = new Telegraf(token);

bot.start(start);
bot.use();
bot.help(help);
bot.use(addWord);
list(bot);
learn(bot);

bot.action(/^checked-+([A-Za-z]+)/, async (ctx) => {
  const word = ctx.callbackQuery.data.split(/-/);
  const response = await checkWord(ctx.from.id, word[1]);
  if (!response) return null;

  return ctx.editMessageText(`${word[1]} - checked as learned!`);
});


bot.launch();
console.log('Bot launched!');