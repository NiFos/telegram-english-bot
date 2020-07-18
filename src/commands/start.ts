import { Context } from 'telegraf';
import { mainMenu } from '../menus/main';
import { Message } from 'telegraf/typings/telegram-types';

export function start(ctx: Context): Promise<Message> {
  return ctx.reply(`Hi! I'm your dictionary bot. Let me help you!`, mainMenu);
}