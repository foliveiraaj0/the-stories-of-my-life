import { Component, OnInit, Input, ViewChild, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent implements OnInit {

  @ViewChild('logo') logoElementRef: ElementRef;

  @Input() fontSize:number;

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    if(this.logoElementRef && this.fontSize) {
      this.renderer.setStyle(this.logoElementRef.nativeElement, 'font-size', this.getFontSize());
    }
  }

  private getFontSize(): string {
    return `${this.fontSize}rem`;
  }

}
