import type { CommandInteraction } from 'discord.js';
import type { LunarBot } from '../classes/Client';

export default function ownerOnly(client: LunarBot, command: CommandInteraction<'cached'>) {
	if (command.user.id != client.ownerId) {
		return void command.reply({
			content: '<:_:859388130636988436> Este comando solo puede ser ejecutado por el dueño del bot.',
			ephemeral: true
		});
	}

	return true;
}
