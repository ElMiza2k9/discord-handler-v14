import type { CommandInteraction, PermissionsString } from 'discord.js';
import type { LunarBot } from '../classes/Client';

export default function permissions(
	client: LunarBot,
	command: CommandInteraction<'cached'>,
	permissions: PermissionsString[]
) {
	if (!command.guild) return;

	const requiredPermissions = [];
	permissions.forEach(p => {
		if (!command.memberPermissions.has(p)) {
			requiredPermissions.push(p);
		}
	});

	if (requiredPermissions.length > 0) {
		return void command.reply({
			content: `<:_:859388130636988436> Necesitas los siguientes permisos: \`${requiredPermissions
				.map(x => `\`${x}\``)
				.join(', ')}\``,
			ephemeral: true
		});
	} else return true;
}
