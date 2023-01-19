import { TextareaUI } from '../UI/TextareaUI';

export class Snapshot {
    private textareaUI: TextareaUI;
    private content: string;

    constructor(textareaUI: TextareaUI, content: string) {
        this.textareaUI = textareaUI;
        this.content = content || '';
    }

    restore(): void {
        this.textareaUI.textarea.value = this.content;
    }
}