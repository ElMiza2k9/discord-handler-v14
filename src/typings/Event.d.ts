import { ClientEvents } from 'discord.js';

export type EventOptions = {
	name: keyof Events;
	once?: boolean;
};

export interface Events extends ClientEvents {
	ready: [client: LunarClient];
}
