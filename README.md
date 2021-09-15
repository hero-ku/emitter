
# Emitter
Emitter is a Roblox Typescript package for creating event-emitting objects and classes.

`npm install @rbxts/emitter`

## Usage

### Creating Objects
To create an object, call the `createEmitter` function with the object you want to create the emitter out of, the type for the object, and the types for the events.

```ts
import { createEmitter } from "@rbxts/emitter";

interface Chef {
	Foods: string[];
}

interface ChefEvents {
	FoodCooked: (food: string) => any;
}

const myChef = createEmitter<Chef, ChefEvents>({
	Foods: ["Pizza", "Macaroni", "Lasagna"]
});
```

### Receiving Events
Events are connected to through a single method: `Subscribe`, with the first argument being the name of the event and the second argument being the callback.
```ts
myChef.Subscribe("FoodCooked", food => {
	print(`Chef has cooked ${food}!`);
});
```
### Firing Events
Once again, triggering events goes through a single method: `Fire`, with the first argument being the name of the event and the following arguments being the parameters for that event.
```ts
while (true) {
	wait(1);
	const foodChosen = myChef.Foods[math.random(0, Foods.size - 1)];
	myChef.Fire("FoodCooked", foodChosen);
}
```

### Unsubscribing from Events
To unsubscribe from an event, take the ID of the callback returned from the the `Subscribe` and pass it to the `Unsubscribe` method along with the name of the event you want to unsubscribe from.

```ts
const subscription = myChef.Subscribe("FoodCooked", print);
myChef.Unsubscribe("FoodCooked", subscription);
```

### Creating Classes
Often times you'll want every instance of a custom class to have different events that can be connected to. For this, extend the `Emitter` class and pass in your event types.

Note: Keep in mind that the `Fire` method is private on classes, so you'll have to write wrapper methods to trigger events from the outside.

```ts
import { Emitter } from "@rbxts/emitter";

interface ChefEvents {
	FoodCooked: () => any;
}

class Chef extends Emitter<ChefEvents> {
	static Foods = ["Pizza", "Macaroni", "Lasagna"];
	
	public CookFood() {
		const foodChosen = Chef.Foods[math.random(0, Chef.Foods.size - 1)];
		this.Fire("FoodCooked", foodChosen);
	}
}

const myChef = new Chef();
myChef.Subscribe("FoodCooked", food => {
	print(`This chef has just cooked ${food}!`);
});

myChef.CookFood();
```