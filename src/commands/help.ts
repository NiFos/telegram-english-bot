import { Context } from 'telegraf';

export function help(ctx: Context) {
  return ctx.reply(`Use bot menu for navigation! Type word to bot for add in your dictionary!`);
}