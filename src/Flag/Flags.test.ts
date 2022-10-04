import { Flags } from '..';

enum StringStatuses {
	ON_FIRE = 'a',
	PARALYZED = 'b',
	FROZEN = 'c',
	POISONED = 'd',
}

enum NumericStatuses {
	ON_FIRE = 0,
	PARALYZED,
	FROZEN,
	POISONED,
}

describe('String Enum', () => {
	it('should default to 0', () => {
		const statuses = new Flags<StringStatuses>(StringStatuses);
		expect(statuses.value).toEqual(0);
	});

	it('should be able to stringify the value', () => {
		const statuses = new Flags<StringStatuses>(StringStatuses);
		expect(statuses.toString()).toEqual('0');
	});

	it('should be able to add a flag', () => {
		const statuses = new Flags<StringStatuses>(StringStatuses);
		statuses.addFlag(StringStatuses.FROZEN);
		expect(statuses.hasFlag(StringStatuses.FROZEN)).toBe(true);
		expect(statuses.hasFlag(StringStatuses.ON_FIRE)).toBe(false);
	});

	it('should be able to add multiple flags', () => {
		const statuses = new Flags<StringStatuses>(StringStatuses);
		statuses.addFlags([StringStatuses.FROZEN, StringStatuses.ON_FIRE]);
		expect(statuses.hasFlags([StringStatuses.FROZEN, StringStatuses.ON_FIRE])).toBe(true);
	});

	it('should be able to remove a flag', () => {
		const statuses = new Flags<StringStatuses>(StringStatuses);
		statuses.addFlag(StringStatuses.FROZEN);
		expect(statuses.hasFlag(StringStatuses.FROZEN)).toBe(true);
		statuses.removeFlag(StringStatuses.FROZEN);
		expect(statuses.hasFlag(StringStatuses.FROZEN)).toBe(false);
	});

	it('should be able to remove multiple flags', () => {
		const statuses = new Flags<StringStatuses>(StringStatuses);
		statuses.addFlags([StringStatuses.FROZEN, StringStatuses.ON_FIRE]);
		expect(statuses.hasFlag(StringStatuses.FROZEN)).toBe(true);
		expect(statuses.hasFlag(StringStatuses.ON_FIRE)).toBe(true);
		statuses.removeFlags([StringStatuses.FROZEN, StringStatuses.ON_FIRE]);
		expect(statuses.hasFlag(StringStatuses.FROZEN)).toBe(false);
		expect(statuses.hasFlag(StringStatuses.ON_FIRE)).toBe(false);
	});

	it('should be able to remove all flags', () => {
		const statuses = new Flags<StringStatuses>(StringStatuses);
		statuses.addFlags([StringStatuses.FROZEN, StringStatuses.ON_FIRE]);
		expect(statuses.hasFlag(StringStatuses.FROZEN)).toBe(true);
		expect(statuses.hasFlag(StringStatuses.ON_FIRE)).toBe(true);
		statuses.RemoveAllFlags();
		expect(statuses.hasFlag(StringStatuses.FROZEN)).toBe(false);
		expect(statuses.hasFlag(StringStatuses.ON_FIRE)).toBe(false);
	});
});

describe('Numeric Enum', () => {
	it('should default to 0', () => {
		const statuses = new Flags<NumericStatuses>(NumericStatuses);
		expect(statuses.value).toEqual(0);
	});

	it('should be able to stringify the value', () => {
		const statuses = new Flags<NumericStatuses>(NumericStatuses);
		expect(statuses.toString()).toEqual('0');
	});

	it('should be able to add a flag', () => {
		const statuses = new Flags<NumericStatuses>(NumericStatuses);
		statuses.addFlag(NumericStatuses.FROZEN);
		expect(statuses.hasFlag(NumericStatuses.FROZEN)).toBe(true);
		expect(statuses.hasFlag(NumericStatuses.ON_FIRE)).toBe(false);
	});

	it('should be able to add multiple flags', () => {
		const statuses = new Flags<NumericStatuses>(NumericStatuses);
		statuses.addFlags([NumericStatuses.FROZEN, NumericStatuses.ON_FIRE]);
		expect(statuses.hasFlags([NumericStatuses.FROZEN, NumericStatuses.ON_FIRE])).toBe(true);
	});

	it('should be able to remove a flag', () => {
		const statuses = new Flags<NumericStatuses>(NumericStatuses);
		statuses.addFlag(NumericStatuses.FROZEN);
		expect(statuses.hasFlag(NumericStatuses.FROZEN)).toBe(true);
		statuses.removeFlag(NumericStatuses.FROZEN);
		expect(statuses.hasFlag(NumericStatuses.FROZEN)).toBe(false);
	});

	it('should be able to remove multiple flags', () => {
		const statuses = new Flags<NumericStatuses>(NumericStatuses);
		statuses.addFlags([NumericStatuses.FROZEN, NumericStatuses.ON_FIRE]);
		expect(statuses.hasFlag(NumericStatuses.FROZEN)).toBe(true);
		expect(statuses.hasFlag(NumericStatuses.ON_FIRE)).toBe(true);
		statuses.removeFlags([NumericStatuses.FROZEN, NumericStatuses.ON_FIRE]);
		expect(statuses.hasFlag(NumericStatuses.FROZEN)).toBe(false);
		expect(statuses.hasFlag(NumericStatuses.ON_FIRE)).toBe(false);
	});

	it('should be able to remove all flags', () => {
		const statuses = new Flags<NumericStatuses>(NumericStatuses);
		statuses.addFlags([NumericStatuses.FROZEN, NumericStatuses.ON_FIRE]);
		expect(statuses.hasFlag(NumericStatuses.FROZEN)).toBe(true);
		expect(statuses.hasFlag(NumericStatuses.ON_FIRE)).toBe(true);
		statuses.RemoveAllFlags();
		expect(statuses.hasFlag(NumericStatuses.FROZEN)).toBe(false);
		expect(statuses.hasFlag(NumericStatuses.ON_FIRE)).toBe(false);
	});

	it.only('', () => {
		const state = new Flags<NumericStatuses>(NumericStatuses);
		state.addFlag(NumericStatuses.FROZEN);
		const buffer = new ArrayBuffer(4);
		const view = new DataView(buffer);
		view.setInt32(0, state.value);
		const newState = new Flags<NumericStatuses>(NumericStatuses);
		newState.deserialize(view.getInt32(0));
		console.log(newState.hasFlag(NumericStatuses.FROZEN));

		abstract class BaseComponent {}
		class TestComponent extends BaseComponent {
			public state = new Flags<NumericStatuses>(NumericStatuses);
		}
		abstract class BaseEntity {}
		class Entity extends BaseEntity {
			public id: number;
			public components: BaseComponent[] = [new TestComponent()];
		}
		abstract class BaseSystem {
			abstract context: typeof BaseComponent[];
			abstract update(delta, context);
		}
		class TestSystem extends BaseSystem {
			public context = [TestComponent];
			update<T extends BaseComponent>(delta: number, context: T) {
				return;
			}
		}

		class ECS {
			public systems: BaseSystem[];
			public indices: Map<typeof BaseComponent, BaseComponent[]>;

			constructor(systems: BaseSystem[]) {
				this.systems = systems;
				this.indices = new Map();
				const components = new Set(...this.systems.map((system) => system.context));
				components.forEach((component) => {
					this.indices.set(component, []);
				});
			}

			update() {
				this.systems.forEach((system) => {
					this.indices.get(system.context[0]).forEach((component) => {
						system.update(1, component);
					});
				});
			}
		}
	});
});
