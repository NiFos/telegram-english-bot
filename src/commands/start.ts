import { Context } from 'telegraf';

export function start(ctx: Context) {
  return ctx.reply(`Hi! I'm your dictionary bot. Let me help you!`);
}