import { SetEventOptions } from '../../lib/decorators';
import { Event } from '../../classes/Listener';
import type { LunarBot } from '../../classes/Client';

@SetEventOptions({ name: 'ready', once: true })
export default class extends Event {
	public run(client: LunarBot) {
		console.log(`${client.user.tag} is ready!`);
	}
}
