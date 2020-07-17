import Telegraf, { Context } from "telegraf";
import { deleteAccount } from "../db/controllers/userController";

export async function settignsActions(bot: Telegraf<Context>) {
  bot.action('delete-account', async ctx => {
    const response = await deleteAccount(ctx.from.id);
    if (response) {
      await ctx.editMessageText('Your account has been deleted');
      return await ctx.replyWithSticker('CAACAgIAAxkBAAEBD4JfEFnRV8woKBaSYoyyM0hECgn-9wACfCoAAulVBRiFCLjmFVVdbRoE');
    } else {
      return ctx.reply(`You don't have account!`);
    }
  });
}