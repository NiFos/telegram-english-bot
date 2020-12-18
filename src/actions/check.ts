import { Telegraf, Context } from "telegraf";
import { checkWord } from "../db/controllers/userController";
import { Message } from "telegraf/typings/telegram-types";

export async function checkActions(
  bot: Telegraf<Context>
): Promise<Message | void> {
  bot.action(/^checked-+([A-Za-z]+)/, async (ctx) => {
    try {
      if (!ctx.from || !ctx.callbackQuery) throw "from is undefined";

      const data = ctx.callbackQuery.data || "";
      if (data === "") throw "data is undefined";

      const word = data.split(/-/);
      const userId = ctx.from.id || 0;
      if (userId === 0) throw "Cannot find user";

      const response = await checkWord(userId, word[1]);
      if (!response) throw "Cannot check word!";
      return ctx.editMessageText(`${word[1]} - checked as learned!`);
    } catch (error) {
      return ctx.reply(`Error: ${error.toString()}`);
    }
  });
}
