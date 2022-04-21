import { Command } from '../../classes/Command';
import { SetCommandOptions } from '../../lib/decorators';
import { ChatInputCommandRunParams } from '../../typings/Command';

@SetCommandOptions({
	name: 'ping',
	description: 'Ping the bot',
	category: 'Utility',
	cooldown: 2,
	permissions: ['Administrator'],
	preconditions: ['ownerOnly']
})
export default class extends Command {
	public chatInputRun({ client, command }: ChatInputCommandRunParams) {
		command.reply({
			content: `Pong! Latency is ${client.ws.ping}ms`
		});
	}
}
