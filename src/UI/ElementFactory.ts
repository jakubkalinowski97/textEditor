export class ElementFactory {
    private editor: HTMLElement;
    private toolbar: HTMLElement;
    private textarea: HTMLElement;
    private contextmenu: HTMLElement;
    private history: HTMLElement;

    constructor() {
        this.editor = this.setAttributes(document.createElement('div'), { id: "editor" });
        this.toolbar = this.setAttributes(document.createElement('div'), { id: "toolbar" });
        this.textarea = this.setAttributes(document.createElement('textarea'), { id: "textarea" });
        this.contextmenu = this.setAttributes(document.createElement('div'), { class: 'context-menu'});
        this.history = this.setAttributes(document.createElement('div'), { class: 'history'});
    }

    getHTMLElement(element: string): HTMLElement {
        switch (element) {
            case 'editor':
                return this.editor;
            case 'toolbar':
                return this.toolbar;
            case 'textarea':
                return this.textarea;
            case 'contextmenu':
                return this.contextmenu;
            case 'history':
                return this.history;
            default:
                throw new Error('Element not found');
        }
    }

    private setAttributes(element: HTMLElement, attributes: { [key: string]: string }): HTMLElement {
        for (const [key, value] of Object.entries(attributes)) {
            element.setAttribute(key, value);
        }

        return element;
    }
} 