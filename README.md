# hasflags

__hasflags__ is a small utility class for working with bitwise enums with typescript support. It supports serialization and deserialization of string and number values for sending over the wire or storing in a database. 

### Features

- Adding and querying multiple flags
- Serialization & deserialization
- Typescript support

### Installation

```
npm i hasflags
```

### Usage

```
import { Flags } from 'hasflags'

// Define an enum however you want (string values also work!)
enum Statuses {
	ON_FIRE = 0,
	PARALYZED,
	FROZEN,
	POISONED,
}

// Instantiate the class with your enum
const statuses = new Flags(Statuses);

// Add a flag
statuses.addFlag(Statuses.ON_FIRE)

// Check if flags are set
statuses.hasFlag(Statuses.FROZEN) // false
statuses.hasFlag(Statuses.ON_FIRE) // true

// Add another flag
statuses.addFlag(Statuses.FROZEN)

// Get the serialized value of the enum 
statuses.value // 5
```
