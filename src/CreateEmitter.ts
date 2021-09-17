import type { Any, Object, Void, String, Unknown, Number } from "@rbxts/pascal";

interface Emitter<Events extends { [Key: string]: Callback }> {
    Fire: <T extends keyof Events>(Event: T, ...Args: Parameters<Events[T]>) => Void;

    Subscribe: <T extends keyof Events>(Event: T, Callback: Events[T]) => Void;
    Unsubscribe: <T extends keyof Events>(Event: T, Id: Number) => Void;
}

export default function CreateEmitter<Initial extends Object, Events extends { [K in keyof Events]: Callback }>(Object: Initial) {
    const _Emitter = <Initial & Emitter<Events>> Object;

    const _Events: { [Key: string]: Callback[] } = {}; // Made a variable here to keep this array private.

    _Emitter.Fire = <T extends keyof Events>(Event: T, ...Args: Parameters<Events[T]>) => {
        const Callbacks = _Events[Event as String];

        Callbacks.forEach(
            Callback => task.spawn(Callback, ...Args as Unknown[])
        );
    }

    _Emitter.Subscribe = <T extends keyof Events>(Event: T, Callback: Events[T]) => {
        if (!(Event in _Events)) _Events[Event as String] = [];

        _Events[Event as String].push(Callback);
        return _Events[Event as String].findIndex(Element => Element === Callback);
    }

    _Emitter.Unsubscribe = <T extends keyof Events>(Event: T, Id: Number) => {
        if (Event in _Events) {
            _Events[Event as String].remove(Id);
        }
    }

    return _Emitter;
}