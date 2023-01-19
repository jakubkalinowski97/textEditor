import { ElementFactory } from './ElementFactory';
import { SubscriptionCallback } from '../shared/models/SubscriptionCallback';
import { CommandType } from '../shared/models/CommandType.enum';

export class ToolsUI {
    private subscribers: SubscriptionCallback<CommandType>[] = [];
    private elementFactory: ElementFactory;

    constructor(root: HTMLElement) {
        this.elementFactory = new ElementFactory();
        this.createToolsUI(root);
    }

    subscribe(callback: SubscriptionCallback<CommandType>): void {
        this.subscribers.push(callback);
    }

    private createToolsUI(root: HTMLElement): void {
        const toolbar = this.elementFactory.getHTMLElement('toolbar');
        toolbar.classList.add('toolbar');
        this.createButtons(toolbar);
        
        root.appendChild(toolbar);
    }

    private createButtons(container: HTMLElement): void {
        container.appendChild(this.createButton('Rollback all', CommandType.RollbackAllCommand));
        container.appendChild(this.createButton('Copy', CommandType.CopyCommand));
        container.appendChild(this.createButton('Undo', CommandType.UndoCommand));
        container.appendChild(this.createButton('Clear', CommandType.ClearCommand));
    }

    private createButton(name: string, selector: CommandType): HTMLButtonElement {
        const button = document.createElement('button');
        button.classList.add('toolbar__action')
        button.setAttribute('data-action', selector.toString());
        button.innerText = name;
        button.addEventListener('click', () => {
            this.subscribers.forEach((callback) => callback(selector));
        })

        return button;
    }
} 