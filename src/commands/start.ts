import { Context, Markup } from 'telegraf';
import { mainMenu } from '../menus/main';

export function start(ctx: Context) {
  return ctx.reply(`Hi! I'm your dictionary bot. Let me help you!`, mainMenu);
}