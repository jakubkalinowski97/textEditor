import { Editor } from "../../Editor";
import { TextareaUI } from "../../UI/TextareaUI";
import { Command } from "./Command";
import { CommandHistory } from "../CommandHistory";

export class RollbackAllCommand extends Command {
    constructor(editor: Editor, textareaUI: TextareaUI, history: CommandHistory){
        super(editor, textareaUI, history);
    }

    execute(): boolean {
        const interval = setInterval(() => {
            const command = this.history.pop();
            
            if(command) {
                command.undo();
            }

            if (this.history.isEmpty()) {
                clearInterval(interval);
            }
        }, 100);
        return false;
    }
}