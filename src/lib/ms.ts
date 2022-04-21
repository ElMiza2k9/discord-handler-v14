// Helpers.
const s = 1000;
const m = s * 60;
const h = m * 60;
const d = h * 24;
const w = d * 7;
const y = d * 365.25;

type Unit =
	| 'Años'
	| 'Año'
	| 'Years'
	| 'Year'
	| 'Yrs'
	| 'Yr'
	| 'Y'
	| 'Weeks'
	| 'Semanas'
	| 'Semana'
	| 'Sem'
	| 'Week'
	| 'W'
	| 'Días'
	| 'Día'
	| 'Dias'
	| 'Dia'
	| 'Days'
	| 'Day'
	| 'D'
	| 'Horas'
	| 'Hora'
	| 'Hours'
	| 'Hour'
	| 'Hrs'
	| 'Hr'
	| 'H'
	| 'Minutos'
	| 'Minuto'
	| 'Minutes'
	| 'Minute'
	| 'Mins'
	| 'Min'
	| 'M'
	| 'Segundos'
	| 'Segundo'
	| 'Seg'
	| 'Segs'
	| 'Sg'
	| 'Seconds'
	| 'Second'
	| 'Secs'
	| 'Sec'
	| 's'
	| 'Milisegundos'
	| 'Milisegundo'
	| 'Milliseconds'
	| 'Millisecond'
	| 'Msecs'
	| 'Msec'
	| 'Mseg'
	| 'Msegs'
	| 'Ms';

type UnitAnyCase = Unit | Uppercase<Unit> | Lowercase<Unit>;

export type StringValue = `${number}` | `${number}${UnitAnyCase}` | `${number} ${UnitAnyCase}`;
interface Options {
	/**
	 * Set to `true` to use verbose formatting. Defaults to `false`.
	 */
	long?: boolean;
}
/**
 * Parse or format the given `val`.
 *
 * @param value - The string or number to convert
 * @param options - Options for the conversion
 * @throws Error if `value` is not a non-empty string or a number
 */
function ms(value: StringValue, options?: Options): number;
function ms(value: number, options?: Options): string;
function ms(value: StringValue | number, options?: Options): number | string {
	try {
		if (typeof value === 'string' && value.length > 0) {
			return parse(value);
		} else if (typeof value === 'number' && isFinite(value)) {
			return options?.long ? fmtLong(value) : fmtShort(value);
		}
		throw new Error('Value is not a string or number.');
	} catch (error) {
		const message = isError(error)
			? `${error.message}. value=${JSON.stringify(value)}`
			: 'An unknown error has occured.';
		throw new Error(message);
	}
}
/**
 * Parse the given `str` and return milliseconds.
 */
function parse(str: string): number {
	str = String(str);
	if (str.length > 100) {
		throw new Error('Value exceeds the maximum length of 100 characters.');
	}
	const match =
		/^(-?(?:\d+)?\.?\d+) *(milliseconds?|milisegundos?|msegs?|msecs?|ms|segundos?|seconds?|secs?|segs?|s|minutos?|minutes?|mins?|m|horas?|hours?|hrs?|h|dias?|días?|days?|d|sems?|semanas?|sems?|milliseconds?|weeks?|w|años?|years?|yrs?|y)?$/i.exec(
			str
		);
	if (!match) {
		return NaN;
	}
	const n = parseFloat(match[1]);
	const type = (match[2] || 'ms').toLowerCase() as Lowercase<Unit>;
	switch (type) {
		case 'años':
		case 'año':
		case 'years':
		case 'year':
		case 'yrs':
		case 'yr':
		case 'y':
			return n * y;
		case 'semanas':
		case 'semana':
		case 'sem':
		case 'weeks':
		case 'week':
		case 'w':
			return n * w;
		case 'días':
		case 'día':
		case 'dias':
		case 'dia':
		case 'days':
		case 'day':
		case 'd':
			return n * d;
		case 'horas':
		case 'hora':
		case 'hours':
		case 'hour':
		case 'hrs':
		case 'hr':
		case 'h':
			return n * h;
		case 'minutos':
		case 'minuto':
		case 'minutes':
		case 'minute':
		case 'mins':
		case 'min':
		case 'm':
			return n * m;
		case 'segundos':
		case 'segundo':
		case 'seg':
		case 'segs':
		case 'seconds':
		case 'second':
		case 'secs':
		case 'sec':
		case 's':
			return n * s;
		case 'milisegundos':
		case 'milisegundo':
		case 'milliseconds':
		case 'millisecond':
		case 'msecs':
		case 'msegs':
		case 'mseg':
		case 'msec':
		case 'ms':
			return n;
		default:
			// This should never occur.
			throw new Error(`The unit ${type as string} was matched, but no matching case exists.`);
	}
}
export default ms;
/**
 * Short format for `ms`.
 */
function fmtShort(ms: number): StringValue {
	const msAbs = Math.abs(ms);
	if (msAbs >= d) {
		return `${Math.round(ms / d)}d`;
	}
	if (msAbs >= h) {
		return `${Math.round(ms / h)}h`;
	}
	if (msAbs >= m) {
		return `${Math.round(ms / m)}m`;
	}
	if (msAbs >= s) {
		return `${Math.round(ms / s)}s`;
	}
	return `${ms}ms`;
}
/**
 * Long format for `ms`.
 */
function fmtLong(ms: number): StringValue {
	const msAbs = Math.abs(ms);
	if (msAbs >= d) {
		return plural(ms, msAbs, d, 'día');
	}
	if (msAbs >= h) {
		return plural(ms, msAbs, h, 'hora');
	}
	if (msAbs >= m) {
		return plural(ms, msAbs, m, 'minuto');
	}
	if (msAbs >= s) {
		return plural(ms, msAbs, s, 'segundo');
	}
	return `${ms} ms`;
}
/**
 * Pluralization helper.
 */
function plural(ms: number, msAbs: number, n: number, name: string): StringValue {
	const isPlural = msAbs >= n * 1.5;
	return `${Math.round(ms / n)} ${name}${isPlural ? 's' : ''}` as StringValue;
}

/**
 * A type guard for errors.
 */
function isError(error: unknown): error is Error {
	return typeof error === 'object' && error !== null && 'message' in error;
}
