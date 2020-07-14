import 'dotenv/config';
import { Telegraf } from 'telegraf';
import { connectMongo } from './db/mongo';
import { start } from './commands/start';
import { help } from './commands/help';
import { list } from './commands/list';
import { addWord } from './commands/add-word';

connectMongo();

const token = process.env.BOT_TOKEN || '';
const bot = new Telegraf(token);

bot.start(start);
bot.help(help);
bot.use(addWord);
list(bot);


bot.launch();
console.log('Bot launched!');