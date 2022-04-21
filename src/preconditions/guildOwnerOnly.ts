import type { CommandInteraction } from 'discord.js';
import type { LunarBot } from '../classes/Client';

export default function guildOwnerOnly(client: LunarBot, command: CommandInteraction<'cached'>) {
	if (!command.guild) return false;

	if (command.user.id != command.guild.ownerId) {
		return void command.reply({
			content: '<:_:859388130636988436> Solo el propietario del servidor puede usar este comando.',
			ephemeral: true
		});
	}

	return true;
}
