import { ToolsUI } from './UI/ToolsUI';
import { TextareaUI } from './UI/TextareaUI';
import { ContextMenuUI } from './UI/ContextMenuUI';
import { HistoryUI } from './UI/HistoryUI';
import { CommandFactory } from './shared/CommandFactory';
import { Invoker } from './shared/Invoker';
import { CommandType } from './shared/models/CommandType.enum';
import { Snapshot } from './shared/Snapshot';
import { ShortcutsHandler } from './shared/ShortcutsHandler';

export class Editor {
    content: string;
    private toolsUI: ToolsUI;
    private textareaUI: TextareaUI;
    private menuUI: ContextMenuUI;
    private historyUI: HistoryUI;
    private commandInvoker: Invoker;
    private commandFactory: CommandFactory;
    private shortcutsHandler: ShortcutsHandler;
    private root: HTMLElement;

    initApp(): void {
        this.root = document.getElementById('root');
        this.toolsUI = new ToolsUI(this.root);
        this.textareaUI = new TextareaUI(this.root);
        this.menuUI = new ContextMenuUI(this.root);
        this.historyUI = new HistoryUI(this.root);

        this.commandInvoker = new Invoker();
        this.commandFactory = new CommandFactory(this, this.textareaUI, this.commandInvoker.commandHistory);
        this.shortcutsHandler = new ShortcutsHandler(this.commandInvoker, this.commandFactory);
        this.historyUI.setHistory(this.commandInvoker.commandHistory);
        
        this.handleToolbarActions();
        this.handleTextarea();
        this.handleShortcuts();
        this.handleContextMenuActions();
    }

    createSnapshot(): Snapshot {
        return new Snapshot(this.textareaUI, this.content);
    }

    private handleToolbarActions(): void {
        this.toolsUI.subscribe((action) => {
            const command = this.commandFactory.getCommand(action);
            this.commandInvoker.send(command);
        });
    }

    private handleContextMenuActions(): void {
        this.menuUI.subscribe((action) => {
            const command = this.commandFactory.getCommand(action);
            this.commandInvoker.send(command);
        });
    }

    private handleTextarea(): void {
        this.textareaUI.subscribe(() => {
            const command = this.commandFactory.getCommand(CommandType.UpdateContentCommand);
            this.commandInvoker.send(command);
        });
    }

    private handleShortcuts(): void {
        this.root.addEventListener('keydown', (event: KeyboardEvent) => {
            this.shortcutsHandler.handleKeyboardEvent(event);
        });
    }
}