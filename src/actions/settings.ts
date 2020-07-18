import Telegraf, { Context } from "telegraf";
import { deleteAccount } from "../db/controllers/userController";
import { mainMenu } from "../menus/main";
import { Message } from "telegraf/typings/telegram-types";

export async function settignsActions(bot: Telegraf<Context>): Promise<void | Message> {
  bot.action('delete-account', async (ctx) => {
    console.log(ctx.from);
    if (!ctx.from) return ctx.reply('Error');
    
    const userId = ctx.from.id || 0;
    if (userId === 0) return ctx.reply('Error');
    const response = await deleteAccount(userId);
    if (response) {
      await ctx.editMessageText('Your account has been deleted');
      return await ctx.replyWithSticker('CAACAgIAAxkBAAEBD4JfEFnRV8woKBaSYoyyM0hECgn-9wACfCoAAulVBRiFCLjmFVVdbRoE');
    } else {
      return ctx.reply(`You don't have account!`, mainMenu);
    }
  });
}