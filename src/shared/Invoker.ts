import { Command } from "./commands/Command";
import { CommandHistory } from "./CommandHistory";

export class Invoker {
    commandHistory: CommandHistory;

    constructor() {
        this.commandHistory = new CommandHistory();
    }
    
    send(command: Command): void {
        if(command.execute()) {
            this.commandHistory.push(command);
        }
    }
}