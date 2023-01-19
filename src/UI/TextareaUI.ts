import { ElementFactory } from './ElementFactory';
import { SubscriptionCallback } from '../shared/models/SubscriptionCallback';

export class TextareaUI {
    textarea: HTMLTextAreaElement;
    private elementFactory: ElementFactory;
    private subscribers: SubscriptionCallback<InputEvent>[] = [];

    constructor(root: HTMLElement) {
        this.elementFactory = new ElementFactory();
        this.createTextareaUI(root);
    }

    subscribe(callback: SubscriptionCallback<InputEvent>): void {
        this.subscribers.push(callback);
    }
    
    private createTextareaUI(root: HTMLElement, content: string = ''): void {
        this.textarea = this.elementFactory.getHTMLElement('textarea') as HTMLTextAreaElement;
        this.textarea.className = 'textarea';
        this.textarea.innerText = content;
        this.textarea.addEventListener('input', (event: InputEvent) => {
            this.subscribers.forEach((callback) => callback(event));
        })

        root.appendChild(this.textarea);
    }
}