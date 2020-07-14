import { Context } from 'telegraf';

export function help(ctx: Context) {
  return ctx.reply(`Commands:\n /addword - add word to dictionary;\n /list - view all words; \n /learn - learn your words`);
}