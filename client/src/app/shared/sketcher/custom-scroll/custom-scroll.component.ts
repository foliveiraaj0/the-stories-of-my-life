import { Component, OnInit, ViewChild, ElementRef, Renderer, Input, HostListener, Directive, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[customScroll]'
})
export class CustomScrollComponent implements OnInit {

  private _templates = []
  @Input('templates') 
  set templates(templates) {
    this._templates = templates;
    this.updateShowingTemplates(true)
    console.log('new templates', this._templates)
  }
/*   get templates() {
    console.log('get templates', this._templates)
    return this._templates;
  } */

  @Output() listData: EventEmitter<any> = new EventEmitter();

  /* private templates: {
    img1: { id: string; src: string; alt: string };
    img2: { id: string; src: string; alt: string };
  }[] = []; */
  private showingTemplates = [];

  private listElement;
  private itemHeight;
  private allElementsHeight; //without the edges
  private listElementHeight; //without the edges
  private step = 100; //percent
  private stepPixel;
  private scrollValue = 0; //accumulated of steps in percent
  private scrollValuePixel;

  constructor(private renderer: Renderer, private listComponent: ElementRef) { 
    listComponent.nativeElement.style.backgroundColor = 'white';
  }

  ngOnInit() {
  }

  private calculateConstants() {
    const opaqueEdges = 2;
    this.listElement = this.listComponent.nativeElement;
    this.itemHeight = this.listComponent.nativeElement.children[0].clientHeight;
    this.allElementsHeight =
      (this._templates.length - opaqueEdges) * this.itemHeight;
    this.listElementHeight = this.listElement.clientHeight;
    this.stepPixel = (this.step / 100) * this.itemHeight;
    this.scrollValuePixel = (this.scrollValue / this.step) * this.stepPixel;
  }

  private hasSpace(direction) {
    this.calculateConstants();
    if (this.listComponent.nativeElement.children) {
      if (direction === "top") {
        //console.log(this.allElementsHeight, this.scrollValuePixel, this.stepPixel, this.listElementHeight)
        //console.log(this.allElementsHeight + this.scrollValuePixel - this.stepPixel, this.listElementHeight)
        return (
          this.allElementsHeight + this.scrollValuePixel - this.stepPixel >=
          this.listElementHeight
        );
      } else if (direction === "bottom") {
        return this.scrollValue < 0;
      }
    }
    return false;
  }

  @HostListener('mousewheel', ['$event'])
  scrollList(event) {
    console.log(event.wheelDeltaY)
    if (event.wheelDeltaY) {
      event = event.wheelDeltaY > 0 ? "top" : "bottom";
    }

    if (this.hasSpace(event)) {
      const nativeList = this.listComponent.nativeElement;
      console.log('nativeList', nativeList)
      this.scrollValue += event === "top" ? -this.step : this.step;
      for (let i = 0; i < nativeList.childElementCount; i++) {
        const currentItem = nativeList.children[i];
        console.log('currentItem', currentItem)
        if (event === "top") {
          if (i === 1) {
            this.renderer.setElementClass(currentItem, "shift-cut-top", true);
          }
          if (i === nativeList.childElementCount - 1) {
            this.renderer.setElementClass(currentItem, "shift-rise-top", true);
          } else {
            this.renderer.setElementClass(currentItem, "shift-top", true);
          }
        } else if (event === "bottom") {
          if (i === 0) {
            this.renderer.setElementClass(
              currentItem,
              "shift-rise-bottom",
              true
            );
          }
          if (i === nativeList.childElementCount - 2) {
            this.renderer.setElementClass(
              currentItem,
              "shift-cut-bottom",
              true
            );
          } else {
            this.renderer.setElementClass(currentItem, "shift-bottom", true);
          }
        }
      }
    }
  }

  @HostListener('animationend', ['$event'])
  onScrollEnd(event) {
    if (
      event.animationName === "shiftTop" ||
      event.animationName === "shiftCutTop" ||
      event.animationName === "shiftRiseTop"
    ) {
      this.renderer.setElementClass(event.target, "shift-top", false);
      this.renderer.setElementClass(event.target, "shift-cut-top", false);
      this.renderer.setElementClass(event.target, "shift-rise-top", false);
    } else if (
      event.animationName === "shiftBottom" ||
      event.animationName === "shiftCutBottom" ||
      event.animationName === "shiftRiseBottom"
    ) {
      this.renderer.setElementClass(event.target, "shift-bottom", false);
      this.renderer.setElementClass(event.target, "shift-cut-bottom", false);
      this.renderer.setElementClass(event.target, "shift-rise-bottom", false);
    }
    //TODO call this update only in the last scroll event
    this.updateShowingTemplates();
  }

  getShowingTemplates() {
    //console.log('get showing templates', this.showingTemplates)
    return this.showingTemplates;
  }

  private updateShowingTemplates(fromStart?: boolean) {
    if(this._templates && this._templates.length > 0) {
      /* this.showingTemplates = []; */
      console.log('update showing templates')
      const scrollPostion = fromStart ? 0 : (this.scrollValue / this.step) * -1;
      this.showingTemplates[0] = this._templates[scrollPostion];
      this.showingTemplates[1] = this._templates[scrollPostion];
      this.showingTemplates[2] = this._templates[scrollPostion + 1];
      this.showingTemplates[3] = this._templates[scrollPostion + 2];
      this.showingTemplates[4] = this._templates[scrollPostion + 4];
      this.listData.emit(this.showingTemplates)
    }
    else {
      console.log('update showing templates - templates is empty or null')
    }
  }

  private getEdgeClass(i: number): string {
    if (i === 0) {
      return "edge-image edge-image-top";
    } else if (i === this.showingTemplates.length - 1) {
      return "edge-image edge-image-bottom";
    }
    return "";
  }

}
