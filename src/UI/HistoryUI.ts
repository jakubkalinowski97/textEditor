import { CommandHistory } from '../shared/CommandHistory';
import { Command } from '../shared/commands/Command';
import { HistoryEventStatus } from '../shared/models/HistoryEventStatus.enum';
import { ElementFactory } from './ElementFactory';

export class HistoryUI {
    private elementFactory: ElementFactory;
    private historyElement: HTMLElement;

    constructor(root: HTMLElement) {
        this.elementFactory = new ElementFactory();
        this.createHistoryUI(root);
    }

    setHistory(history: CommandHistory): void {
        this.handleHistory(history);
    }

    private createHistoryUI(root: HTMLElement): void {
        this.historyElement = this.elementFactory.getHTMLElement('history');
        this.historyElement.innerHTML = 'Commands history:';
        root.appendChild(this.historyElement);

        const list = document.createElement('ul');
        list.classList.add('history__list');
        this.historyElement.appendChild(list);
    }

    private handleHistory(commandHistory: CommandHistory): void {
        commandHistory.subscribe(({ command, status }) => { this.updateHistoryUI(command, status) });
    }

    private updateHistoryUI(command: Command, status: HistoryEventStatus): void {
        const list = this.historyElement.getElementsByClassName('history__list').item(0);

        if (status === HistoryEventStatus.Added) {
            let item = document.createElement('li');

            item.classList.add('history__item', 'history__item--added');
            item.innerText = `command backup: ${command['backup']['content']}`;

            list.appendChild(item);
        } 
        else if (status === HistoryEventStatus.Removed && list.lastElementChild) {
            list.lastElementChild.classList.add('history__item--removed');
            list.lastElementChild.addEventListener('animationend', () => {
                list.removeChild(list.lastElementChild);
            });
        }
    }
}