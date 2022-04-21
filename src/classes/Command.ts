import type { ChatInputCommandRunParams, ContextMenuRunParams, CommandOptions } from '../typings/Command';

export abstract class Command {
	public options: CommandOptions;
	public constructor() {}
	public chatInputRun?(params: ChatInputCommandRunParams): any;
	public contextMenuRun?(params: ContextMenuRunParams): any;
}
