import { Editor } from '../../Editor';
import { TextareaUI } from '../../UI/TextareaUI';
import { CommandHistory } from '../CommandHistory';
import { Snapshot } from '../Snapshot';

export abstract class Command {
    protected editor: Editor;
    protected textareaUI: TextareaUI;
    protected history: CommandHistory
    private backup: Snapshot;

    constructor(editor: Editor, textareaUI: TextareaUI, history: CommandHistory) {
        this.editor = editor;
        this.textareaUI = textareaUI;
        this.history = history;
    }

    protected saveBackup(): void {
        this.backup = this.editor.createSnapshot();
    }

    undo(): void {
        if(this.backup.restore){
            this.backup.restore();
        }
    }

    abstract execute(): boolean;
}