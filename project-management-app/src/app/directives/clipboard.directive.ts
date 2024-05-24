import { Directive, Input, HostListener } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { SpinnerService } from '../services/spinner.service';

@Directive({
  selector: '[appClipboard]'
})
export class ClipboardDirective {
  @Input() appClipboard: string = '';

  constructor(
    private clipboard: Clipboard,
    private spinnerService: SpinnerService
  ) {}

  @HostListener('click')
  onClick() {
    if (this.appClipboard) {
      console.log(this.appClipboard);
      this.clipboard.copy(this.appClipboard);
      this.spinnerService.presentToast('bottom', 'The link has been copied to the clipboard');

    }
  }
}
