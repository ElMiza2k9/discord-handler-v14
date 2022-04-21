import { readdirSync } from 'fs';
import { join } from 'path';
import type { LunarBot } from '../../classes/Client';
import type { Event } from '../../classes/Listener';

export function EventHandler(client: LunarBot) {
	const basedir = join(process.cwd(), 'src', 'listeners');
	return void readdirSync(basedir).map(dir => {
		readdirSync(join(basedir, dir))
			.filter(x => x.endsWith('.ts'))
			.forEach(path => {
				const event: Event = new (require(join(basedir, dir, path)).default)();
				client[event.options.once ? 'once' : 'on'](event.options.name, (...args: any[]) => event.run(client, ...args));
			});
	});
}
