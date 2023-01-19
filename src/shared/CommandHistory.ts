import { Command } from "./commands/Command";
import { SubscriptionCallback } from "./models/SubscriptionCallback";
import { HistoryEvent } from './models/HistoryEvent';
import { HistoryEventStatus } from "./models/HistoryEventStatus.enum";

export class CommandHistory {
    history: Command[] = [];
    private subscribers: SubscriptionCallback<HistoryEvent>[] = [];

    push(command: Command): void {
        this.history.push(command);
        this.notify(command, HistoryEventStatus.Added);
    }

    pop(): Command {
        const command = this.history.pop();
        this.notify(command, HistoryEventStatus.Removed);
        return command;
    }

    isEmpty(): boolean {
        return this.history.length === 0;
    }

    subscribe(callback: SubscriptionCallback<HistoryEvent>): void {
        this.subscribers.push(callback);
    }

    private notify(command: Command, status: HistoryEventStatus): void {
        const event: HistoryEvent = { command, status };
        this.subscribers.forEach((callback) => { callback(event); });
    }
}