import { FlagsEnum } from '../Enums/FlagsEnum';

type EnumType = { [key: string]: string | number };

class Flags<T extends keyof EnumType> {
	private _flags: FlagsEnum = 0;
	private _values = new Map<string | number, string | number>();
	private _next = 11;

	constructor(type: EnumType) {
		const keys = Object.keys(type).filter((key) => !parseInt(key) && key !== '0');
		keys.forEach((key) => {
			this._values.set(type[key], `x${this._next}`);
			this._next++;
		});
	}

	public hasFlag(flag: T) {
		return !!(this._flags & FlagsEnum[this._values.get(flag)]);
	}

	public hasFlags(flags: T[]) {
		return !!flags.filter((flag) => this.hasFlag(flag)).length;
	}

	public addFlag(flag: T) {
		this._flags |= FlagsEnum[this._values.get(flag)];
	}

	public addFlags(flags: T[]) {
		flags.forEach((flag) => {
			this.addFlag(flag);
		});
	}

	public removeFlag(flag: T) {
		this._flags &= ~FlagsEnum[this._values.get(flag)];
	}

	public removeFlags(flags: T[]) {
		flags.forEach((flag) => {
			this.removeFlag(flag);
		});
	}

	public RemoveAllFlags() {
		this._flags = 0;
	}

	public get value() {
		return this._flags;
	}

	public deserialize(value: number) {
		this._flags = value;
	}

	public toString() {
		return this._flags.toString();
	}
}

export { Flags };
