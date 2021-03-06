import { Component, OnInit } from "@angular/core";
import { TemplateComponent } from "../../template-component";

@Component({
  templateUrl: "./template-fullpage.component.html",
  styleUrls: ["./template-fullpage.component.scss"]
})
export class TemplateFullpageComponent extends TemplateComponent
  implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {}

  protected createTemplateItems() {
    this.templateData.id = `${this.templateData.id}`;
    if (this.templateData.image) {
      this.templateData.image = `./assets/users/${this.templateData.image}.jpg`;
    }
  }

  protected setComponentData(data, componentId) {
    this.templateData.image = data.src;
  }

  getImage(): string {
    if (this.templateData.image) {
      return this.templateData.image;
    }
    return "";
  }

  getBackground(): string {
    return `url(${this.templateData.backgroundImage})`;
  }

  getBackgroundStyle(): string {
    const frameChoosen = this.templateData.backgroundImage
      .replace("./assets/backgrounds/", "")
      .replace(".png", "");
    return `content-item__img--${frameChoosen}`;
  }

  getImageId(): string {
    return this.templateData.id;
  }
}
