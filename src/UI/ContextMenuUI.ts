import { CommandType } from '../shared/models/CommandType.enum';
import { SubscriptionCallback } from '../shared/models/SubscriptionCallback';
import { ElementFactory } from './ElementFactory';

export class ContextMenuUI {
    private elementFactory: ElementFactory;
    private menu: HTMLElement;
    private subscribers: SubscriptionCallback<CommandType>[] = [];

    constructor(root: HTMLElement) {
        this.elementFactory = new ElementFactory();
        this.createContextMenuUI(root);
    }

    subscribe(callback: SubscriptionCallback<CommandType>): void {
        this.subscribers.push(callback);
    }

    private hideMenu(): void {
        if(this.menu){
            this.menu.remove();
            this.menu.innerHTML = '';
        }
    }

    private createContextMenuUI(root: HTMLElement): void {
        this.addEventHandlers(root);
    }

    private createItems(): void {
        this.menu.appendChild(this.createItem('Paste', CommandType.PasteCommand));
        this.menu.appendChild(this.createItem('Copy', CommandType.CopyCommand));
        this.menu.appendChild(this.createItem('Clear - CTRL + D', CommandType.ClearCommand));
        this.menu.appendChild(this.createItem('Undo - CTRL + U', CommandType.UndoCommand));
        this.menu.appendChild(this.createItem('Rollback all - CTRL + R', CommandType.RollbackAllCommand));
    }

    private createItem(name: string, selector: CommandType): HTMLButtonElement {
        const button = document.createElement('button');
        button.classList.add('context-menu__item');
        button.setAttribute('data-action', selector.toString());
        button.innerText = name;
        button.addEventListener('click', () => {
            this.subscribers.forEach((callback) => callback(selector));
        })

        return button;
    }

    private addEventHandlers(root: HTMLElement): void {
        root.addEventListener('contextmenu', (event: MouseEvent) => {
            this.hideMenu();
            
            this.menu = this.elementFactory.getHTMLElement('contextmenu');
            this.menu.style.top = `${event.clientY}px`;
            this.menu.style.left = `${event.clientX}px`;

            this.createItems();
    
            root.appendChild(this.menu);
            event.preventDefault();
        });

        document.addEventListener('click', () => {
            this.hideMenu();
        })
    }
}