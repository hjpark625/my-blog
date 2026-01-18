import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  forwardRef,
  input,
  viewChild,
  AfterViewInit,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import Editor from '@toast-ui/editor';

@Component({
  selector: 'app-toast-editor',
  standalone: true,
  template: ` <div #editorContainer></div> `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ToastEditorComponent),
      multi: true,
    },
  ],
})
export class ToastEditorComponent
  implements OnInit, OnDestroy, ControlValueAccessor, AfterViewInit
{
  editorContainer = viewChild.required<ElementRef<HTMLDivElement>>('editorContainer');
  editor: Editor | null = null;
  initialValue = input<string>('');
  private pendingValue: string | null = null;

  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  ngOnInit() {
    // This component renders on the client side, but we need to ensure Editor is created only in browser.
  }

  ngAfterViewInit() {
    this.initEditor();
  }

  initEditor() {
    if (typeof window === 'undefined') return;

    // Determine initial value: pendingValue > initialValue input > empty string
    const startValue = this.pendingValue !== null ? this.pendingValue : this.initialValue() || '';
    const isDarkMode =
      window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    this.editor = new Editor({
      el: this.editorContainer().nativeElement,
      height: '600px',
      initialEditType: 'markdown',
      previewStyle: 'vertical',
      initialValue: startValue,
      theme: isDarkMode ? 'dark' : 'light',
      events: {
        change: () => {
          const markdown = this.editor?.getMarkdown() || '';
          this.onChange(markdown);
        },
      },
    });

    // Clear pending value after init to avoid confusion, though it was consumed by initialValue
    this.pendingValue = null;
  }

  writeValue(value: string): void {
    if (this.editor) {
      this.editor.setMarkdown(value || '', false);
    } else {
      // Store value if editor is not yet ready
      this.pendingValue = value || '';
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  ngOnDestroy() {
    this.editor?.destroy();
  }
}
