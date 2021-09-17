
# Emitter
Emitter is a Roblox Typescript package for creating event-emitting objects and classes.

`npm install @rbxts/emitter`

## Usage

### Creating Objects
To create an object, call the `createEmitter` function with the object you want to create the emitter out of, the type for the object, and the types for the events.

```ts
import { CreateEmitter } from "@rbxts/emitter";

interface Chef {
	Foods: string[];
}

interface ChefEvents {
	FoodCooked: (Food: string) => any;
}

const myChef = CreateEmitter<Chef, ChefEvents>({
	Foods: ["Pizza", "Macaroni", "Lasagna"]
});
```

### Receiving Events
Events are connected to through a single method: `Subscribe`, with the first argument being the name of the event and the second argument being the callback.
```ts
myChef.Subscribe("FoodCooked", Food => {
	print(`Chef has cooked ${Food}!`);
});
```
### Firing Events
Once again, triggering events goes through a single method: `Fire`, with the first argument being the name of the event and the following arguments being the parameters for that event.
```ts
while (true) {
	wait(1);
	const Food = MyChef.Foods[math.random(0, Foods.size - 1)];
	MyChef.Fire("FoodCooked", Food);
}
```

### Unsubscribing from Events
To unsubscribe from an event, take the ID of the callback returned from the the `Subscribe` and pass it to the `Unsubscribe` method along with the name of the event you want to unsubscribe from.

```ts
const Subscription = MyChef.Subscribe("FoodCooked", print);
MyChef.Unsubscribe("FoodCooked", Subscription);
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
		const Food = Chef.Foods[math.random(0, Chef.Foods.size - 1)];
		this.Fire("FoodCooked", Food);
	}
}

const MyChef = new Chef();
MyChef.Subscribe("FoodCooked", Food => {
	print(`This chef has just cooked ${Food}!`);
});

MyChef.CookFood();
```