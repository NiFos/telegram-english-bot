import { Telegraf, Context } from "telegraf";
import { getUserWords } from "../db/controllers/userController";
import { IWord } from "../db/models/user";

function wordsList(list: IWord[]): string {
  return `${list
    .map(
      (item) =>
        `${item.title} - ${item.checked ? "✅ learned" : "❌ not learned"}\n`
    )
    .join("")}\nTotal words - ${list.length}`;
}

export async function list(bot: Telegraf<Context>): Promise<void> {
  bot.hears("📗 List", async (ctx) => {
    try {
      if (!ctx.from) throw "from is undefined";
      const userId = ctx.from.id;
      if (userId === 0) throw "Cannot find user";
      const list: IWord[] = await getUserWords(userId, false);
      console.log("list", list);

      if (list.length <= 0) {
        return ctx.reply(`You don't have any words!`);
      }
      return ctx.reply(`Your words to learing: \n${wordsList(list)}`);
    } catch (error) {
      return ctx.reply(`Error: ${error.toString()}`);
    }
  });
  bot.hears("📘 Learned words", async (ctx) => {
    try {
      if (!ctx.from) throw "from is undefined";
      const userId = ctx.from.id;
      if (userId === 0) throw "Cannot find user";
      const list: IWord[] = await getUserWords(userId, true);
      if (list.length <= 0) {
        return ctx.reply(`You don't have any words!`);
      }
      return ctx.reply(`All your words: \n${wordsList(list)}`);
    } catch (error) {
      return ctx.reply(`Error: ${error.toString()}`);
    }
  });
}
