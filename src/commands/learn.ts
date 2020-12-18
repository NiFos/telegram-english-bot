import { Telegraf, Context, Markup } from "telegraf";
import { getLearnWord } from "../db/controllers/userController";

const learnKeyboard = (title: string) =>
  Markup.inlineKeyboard([
    Markup.callbackButton(`📚 Check?`, `checked-${title}`),
  ]).extra();

export async function learn(bot: Telegraf<Context>): Promise<void> {
  bot.hears("📌 Learn", async (ctx) => {
    try {
      if (!ctx.from) throw "from is undefined";
      const userId = ctx.from.id || 0;
      if (userId === 0) throw "Cannot find user";
      const word = await getLearnWord(userId);
      if (!word) throw `You don't have any words to learn!`;

      return ctx.reply(`${word.title}`, learnKeyboard(word.title));
    } catch (error) {
      return ctx.reply(`Error: ${error.toString()}`);
    }
  });
}
