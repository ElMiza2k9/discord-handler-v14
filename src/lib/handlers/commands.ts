import { readdirSync } from 'fs';
import { join } from 'path';
import type { LunarBot } from '../../classes/Client';
import type { Command } from '../../classes/Command';

export function CommandHandler(client: LunarBot) {
	const commands = [];

	const basedir = join(process.cwd(), 'src', 'commands');
	const categories = readdirSync(basedir);

	categories.forEach(category => {
		const commandNames = readdirSync(join(basedir, category)).filter(x => x.endsWith('.ts'));

		commandNames.forEach(commandName => {
			const command: Command = new (require(join(basedir, category, commandName)).default)();
			client.commands.set(command.options.name, command);
			commands.push(command.options);
		});
	});

	client.on('ready', () => {
		client.guilds.cache.forEach(g => g.commands.set(commands).catch(() => null));
	});
}

