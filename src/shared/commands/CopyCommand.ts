import { Editor } from "../../Editor";
import { TextareaUI } from "../../UI/TextareaUI";
import { Command } from "./Command";
import { CommandHistory } from "../CommandHistory";

export class CopyCommand extends Command {
    constructor(editor: Editor, textareaUI: TextareaUI, history: CommandHistory){
        super(editor, textareaUI, history);
    }

    execute(): boolean {
        navigator.clipboard.writeText(
            this.textareaUI.textarea.value
        )
        return false;
    }

}