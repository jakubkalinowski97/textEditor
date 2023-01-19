import { Editor } from "../../Editor";
import { TextareaUI } from "../../UI/TextareaUI";
import { Command } from "./Command";
import { CommandHistory } from "../CommandHistory";

export class UndoCommand extends Command {
    constructor(editor: Editor, textarea: TextareaUI, history: CommandHistory) {
        super(editor, textarea, history);
    }

    execute(): boolean {
        const command = this.history.pop();
        if (command) {
            command.undo();
        }
        return false;
    }
}