import { Markup } from "telegraf";

export const settingsMenu = Markup.keyboard([
  ['⛔️ Delete account'],
  ['🔙 Back']
]).resize().oneTime().extra();