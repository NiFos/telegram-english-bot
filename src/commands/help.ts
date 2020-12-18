import { Context } from "telegraf";
import { Message } from "telegraf/typings/telegram-types";

export function help(ctx: Context): Promise<Message> {
  return ctx.reply(
    `Use bot menu for navigation! Type word to bot for add in your dictionary!`
  );
}
