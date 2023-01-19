import { CommandFactory } from './CommandFactory';
import { Command } from './commands/Command';
import { Invoker } from './Invoker';
import { CommandType } from './models/CommandType.enum';

export class ShortcutsHandler {
    private commandInvoker: Invoker;
    private commandFactory: CommandFactory;

    constructor(commandInvoker: Invoker, commandFactory: CommandFactory) {
        this.commandInvoker = commandInvoker;
        this.commandFactory = commandFactory;
    }

    handleKeyboardEvent(event: KeyboardEvent): void {
        let command: Command;
        switch(event.key) {
            case 'r':
                if(event.ctrlKey) {
                    event.preventDefault();
                    command = this.commandFactory.getCommand(CommandType.RollbackAllCommand);
                }
                break;
            case 'u':
                if(event.ctrlKey) {
                    event.preventDefault();
                    command = this.commandFactory.getCommand(CommandType.UndoCommand);
                }
                break;
            case 'd':
                if(event.ctrlKey) {
                    event.preventDefault();
                    command = this.commandFactory.getCommand(CommandType.ClearCommand);
                }
                break;
        }

        if(command) {
            this.commandInvoker.send(command);
        }
    }
}