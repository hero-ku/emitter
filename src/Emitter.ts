import { String, Number, Unknown } from "@rbxts/pascal";

export default class Emitter<Events extends { [Key: string]: Callback }> {
    private _Events: { [Key: string]: Callback[] } = {};

    public Fire<T extends keyof Events>(Event: T, ...Args: Parameters<Events[T]>) {
        const Callbacks = this._Events[Event as String];

        Callbacks.forEach(
            Callback => task.spawn(Callback, ...Args as Unknown[])
        );
    }

    public Subscribe<T extends keyof Events>(Event: T, Callback: Events[T]) {
        if (!(Event in this._Events)) this._Events[Event as String] = [];

        this._Events[Event as String].push(Callback);
        return this._Events[Event as String].findIndex(Element => Element === Callback);
    }

    public Unsubscribe<T extends keyof Events>(Event: T, Id: Number) {
        if (Event in this._Events) {
            this._Events[Event as String].remove(Id);
        }
    }
}