import { Editor } from '../../Editor';
import { TextareaUI } from '../../UI/TextareaUI';
import { Command } from './Command';
import { CommandHistory } from '../CommandHistory';

export class UpdateContentCommand extends Command {
    constructor(editor: Editor, textareaUI: TextareaUI, history: CommandHistory){
        super(editor, textareaUI, history);
    }

    execute(): boolean {
        this.saveBackup();

        if(this.textareaUI.textarea.value === this.editor.content) {
            return false;
        }

        this.editor.content = this.textareaUI.textarea.value;
        return true;
    }
}