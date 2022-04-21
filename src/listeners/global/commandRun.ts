import { SetEventOptions } from '../../lib/decorators';
import { Event } from '../../classes/Listener';
import type { LunarBot } from '../../classes/Client';
import type { CommandInteraction } from 'discord.js';
import ms from '../../lib/ms';

@SetEventOptions({ name: 'interactionCreate' })
export default class extends Event {
	private cooldowns = new Map<string, { commandName: string; time: number }>();
	public async run(client: LunarBot, command: CommandInteraction) {
		if (!command.inCachedGuild()) return;
		if (!command.isCommand()) return;

		const getCommand = client.commands.get(command.commandName);
		if (!getCommand) return;

		if (getCommand.options.cooldown) {
			const cooldownData = this.cooldowns.get(command.user.id);
			if (cooldownData) {
				const { commandName, time } = cooldownData;
				if (commandName === command.commandName) {
					if (time - Date.now() > 500) {
						return command.reply({
							content: `<:_:930797536900415548> Debes esperar **${ms(time - Date.now(), {
								long: true
							})}** antes de ejecutar este comando.`,
							ephemeral: true
						});
					}
				}
			}
		}

		if (getCommand.options.preconditions) {
			for await (const precondition of getCommand.options.preconditions) {
				const fn = require('../../preconditions/' + precondition);
				if (fn) {
					const value = await fn.default(client, command);
					if (!value) return;
				}
			}
		}

		if (getCommand.options.permissions?.length) {
			const fn = require('../../preconditions/permissions');
			const value = await fn.default(client, command, getCommand.options.permissions);
			if (!value) return;
		}

		this.cooldowns.set(command.user.id, {
			commandName: command.commandName,
			time: Date.now() + getCommand.options.cooldown * 1000
		});

		if (command.isChatInputCommand()) await getCommand.chatInputRun({ client, command });
		else if (command.isContextMenuCommand()) await getCommand.contextMenuRun({ client, command });
	}
}
