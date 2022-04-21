import { Client, Collection } from 'discord.js';
import { activities, ownerId } from '../constants';
import { CommandHandler } from '../lib/handlers/commands';
import { EventHandler } from '../lib/handlers/listeners';
import type { Command } from './Command';

export class LunarBot extends Client {
	constructor() {
		super({
			intents: 128767,
			failIfNotExists: false,
			allowedMentions: {
				repliedUser: false
			},
			shards: 'auto',
			presence: { activities }
		});
	}

	public commands: Collection<string, Command> = new Collection();
	public ownerId = ownerId;

	public async start() {
		CommandHandler(this);
		EventHandler(this);
		await super.login();
		return this;
	}
}
