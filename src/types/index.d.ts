import { Message } from "discord.js";

export type CommandHandler = (message: Message) => Promise<void>;
