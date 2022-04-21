import type { CommandOptions } from '../typings/Command';
import type { EventOptions } from '../typings/Event';

export function SetCommandOptions(data: CommandOptions) {
	return function <T extends { new (...args: any[]): {} }>(constructor: T) {
		return class extends constructor {
			options = data;
		};
	};
}

export function SetEventOptions(data: EventOptions) {
	return function <T extends { new (...args: any[]): {} }>(constructor: T) {
		return class extends constructor {
			options = data;
		};
	};
}
