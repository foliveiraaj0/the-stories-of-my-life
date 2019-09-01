import { Component, OnInit, Input, ViewChild, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {

  @Input()
  private buttonWidth:number;

  @Input()
  private buttonHeight:number;

  @ViewChild('menuButton') menuButton: ElementRef;

  constructor(private renderer:Renderer2) { }

  ngOnInit() {
    if(this.buttonWidth) {
      this.renderer.setStyle(this.menuButton.nativeElement, 'width', this.getButtonWidth());
    }
    if(this.buttonHeight) {
      this.renderer.setStyle(this.menuButton.nativeElement, 'height', this.getButtonHeight());
    }
  }

  getButtonWidth():string {
    return `${this.buttonWidth}rem`;
  }

  getButtonHeight():string {
    return `${this.buttonHeight}rem`;
  }

}
