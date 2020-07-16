import { Markup } from 'telegraf';

export const mainMenu = Markup.keyboard([
  ['📌 Learn'],
  ['📗 List', '📘 Learned words'],
  ['⚙️ Settings']
]).resize().extra();
