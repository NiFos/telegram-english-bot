import Telegraf, { Context, Markup } from "telegraf";
import { settingsMenu } from "../menus/settings";
import { deleteAccount } from "../db/controllers/userController";
import { mainMenu } from "../menus/main";

const deleteKeyboard = Markup.inlineKeyboard([
  Markup.callbackButton(`⛔️ Delete ?`, `delete-account`),
]).extra();

export function settings(bot: Telegraf<Context>) {
  bot.hears('⚙️ Settings', ctx => {
    return ctx.reply('Settings', settingsMenu);
  });
  bot.hears('⛔️ Delete account', async ctx => {
    return ctx.reply('Are you sure ?', deleteKeyboard)
  });
  bot.hears('🔙 Back', ctx => {
    return ctx.reply('🔙 Back', mainMenu);
  });
}