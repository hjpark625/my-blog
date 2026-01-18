declare module '@toast-ui/editor' {
  export interface EditorOptions {
    el: HTMLElement;
    height?: string;
    initialEditType?: 'markdown' | 'wysiwyg';
    initialValue?: string;
    previewStyle?: 'vertical' | 'tab';
    events?: {
      change?: () => void;
      load?: () => void;
      [key: string]: any;
    };
    [key: string]: any;
  }

  export default class Editor {
    constructor(options: EditorOptions);
    getMarkdown(): string;
    getHtml(): string;
    setMarkdown(markdown: string, cursorToEnd?: boolean): void;
    setHtml(html: string, cursorToEnd?: boolean): void;
    destroy(): void;
    on(event: string, callback: Function): void;
    off(event: string, callback?: Function): void;
  }
}
