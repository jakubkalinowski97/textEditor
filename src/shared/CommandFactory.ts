import { Editor } from "../Editor";
import { TextareaUI } from "../UI/TextareaUI";
import { CommandHistory } from "./CommandHistory";
import { ClearCommand } from "./commands/ClearCommand";
import { Command } from "./commands/Command";
import { CopyCommand } from "./commands/CopyCommand";
import { RollbackAllCommand } from "./commands/RollbackAllCommand";
import { UndoCommand } from "./commands/UndoCommand";
import { UpdateContentCommand } from "./commands/UpdateContentCommand";
import { PasteCommand } from "./commands/PasteCommand";
import { CommandType } from "./models/CommandType.enum";


export class CommandFactory {
    private editor: Editor;
    private textareaUI: TextareaUI;
    private history: CommandHistory

    constructor(editor: Editor, textareaUI: TextareaUI, history: CommandHistory) {
        this.editor = editor;
        this.textareaUI = textareaUI;
        this.history = history
    }

    getCommand(commandType: CommandType): Command {
        switch(commandType) {
            case CommandType.ClearCommand:
                return new ClearCommand(this.editor, this.textareaUI, this.history);
            case CommandType.UndoCommand:
                return new UndoCommand(this.editor, this.textareaUI, this.history);
            case CommandType.CopyCommand:
                return new CopyCommand(this.editor, this.textareaUI, this.history);
            case CommandType.RollbackAllCommand:
                return new RollbackAllCommand(this.editor, this.textareaUI, this.history);
            case CommandType.UpdateContentCommand:
                return new UpdateContentCommand(this.editor, this.textareaUI, this.history);
            case CommandType.PasteCommand:
                return new PasteCommand(this.editor, this.textareaUI, this.history);
            default:
                throw new Error("Command doesn't exist.");
        }
    }
}