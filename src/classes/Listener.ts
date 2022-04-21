import { EventOptions } from '../typings/Event';
import { LunarBot } from './Client';

export abstract class Event {
	public options: EventOptions;
	public constructor() {}
	public abstract run(client: LunarBot, ...args: any[]): any;
}
