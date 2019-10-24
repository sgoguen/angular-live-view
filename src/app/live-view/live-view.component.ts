import { Component, Input } from '@angular/core';

@Component({
  selector: 'live-view',
  template: `<h1>Live View {{value}}!</h1>`,
  styles: [`h1 { font-family: Lato; }`]
})
export class LiveViewComponent  {
  @Input() value: any;
}
