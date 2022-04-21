import type {
	ApplicationCommandData,
	PermissionsString,
	ChatInputCommandInteraction,
	ContextMenuCommandInteraction
} from 'discord.js';
import type { LunarBot } from '../classes/Client';

export type CommandOptions = ApplicationCommandData & {
	category: string;
	cooldown?: number;
	permissions?: PermissionsString[];
	preconditions?: CommandPrecondition[];
};

export type CommandPrecondition = 'ownerOnly' | 'inVoiceChannel' | 'guildOwnerOnly';
export type ChatInputCommandRun = (params: ChatInputCommandRunParams) => any;
export type ContextMenuCommandRun = (params: ContextMenuRunParams) => any;

export interface ChatInputCommandRunParams {
	client: LunarBot;
	command: ChatInputCommandInteraction<'cached'>;
}

export interface ContextMenuRunParams {
	client: LunarBot;
	command: ContextMenuCommandInteraction<'cached'>;
}
