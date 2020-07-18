import 'dotenv/config';
import express from 'express';
import { Telegraf } from 'telegraf';
import { connectMongo } from './db/mongo';
import { start } from './commands/start';
import { help } from './commands/help';
import { list } from './commands/list';
import { addWord } from './commands/add-word';
import { learn } from './commands/learn';
import { checkActions } from './actions/check';
import { settings } from './commands/settings';
import { settignsActions } from './actions/settings';

connectMongo();
const port = process.env.PORT || 3000;

const app = express();
app.get('/', (req, res) => {
  res.send('Hi! Go to http://t.me/YourDictionaryHelperBot to start bot!');
});
app.listen(port, () => {
  console.log(`Listening on ${port}`);
});

const token = process.env.BOT_TOKEN || '';
const bot = new Telegraf(token);

bot.start(start);
bot.help(help);
list(bot);
learn(bot);
checkActions(bot);
settignsActions(bot);
settings(bot);
bot.use(addWord);

bot.startPolling();
console.log('Bot launched!');