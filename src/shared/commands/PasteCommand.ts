import { Editor } from "../../Editor";
import { TextareaUI } from "../../UI/TextareaUI";
import { CommandHistory } from "../CommandHistory";
import { Command } from "./Command";

export class PasteCommand extends Command {
    constructor(editor: Editor, textareaUI: TextareaUI, history: CommandHistory){
        super(editor, textareaUI, history);
    }

    execute(): boolean {
        this.saveBackup();
        navigator.clipboard.readText().then((content) => {
            const { selectionStart, selectionEnd } = this.textareaUI.textarea;
            this.textareaUI.textarea.setRangeText(content, selectionStart, selectionEnd, 'select');
        });

        return true;
    }
}