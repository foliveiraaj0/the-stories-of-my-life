import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer2
} from "@angular/core";

@Component({
  selector: "app-banner",
  templateUrl: "./banner.component.html",
  styleUrls: ["./banner-animations.component.scss", "./banner.component.scss"]
})
export class BannerComponent implements OnInit {
  private readonly bannerTime: number = 1000; //miliseconds
  private readonly minimumBannerContentSize: number = 3; //images
  private readonly invalidId: number = -1; //interval id

  private bannerContents: string[] = [];

  private currentBanner: string;
  private nextBanner: string;
  private previousBanner: string;

  private intervalId: any; //Nodejs.Timer

  @ViewChild("banner") banner: ElementRef;

  @ViewChild("bannerEdgeLeft") bELeft: ElementRef;
  @ViewChild("bannerLeft") bLeft: ElementRef;
  @ViewChild("bannerMid") bMid: ElementRef;
  @ViewChild("bannerRight") bRight: ElementRef;
  @ViewChild("bannerEdgeRight") bERight: ElementRef;

  private bannerViews: ElementRef[] = [];

  private animationControl: boolean;

  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    this.intervalId = this.invalidId;
    this.start();
  }

  setContent(content: string[]): void {
    this.bannerContents = ["empty-edge"];
    content.forEach(c => {
      this.bannerContents.push(c)
    }); 
    this.bannerContents.push("empty-edge");
  }

  initializeBanners(): void {
    this.setEdgeBanners(this.bannerContents);

    this.bannerViews.push(this.bELeft);
    this.bannerViews.push(this.bLeft);
    this.bannerViews.push(this.bMid);
    this.bannerViews.push(this.bRight);
    this.bannerViews.push(this.bERight);

    this.applyBannerContent(this.bannerContents, this.bannerViews);
  }

  start(): void {
    
    this.setContent(["black", "red", "yellow"]);

    if (this.validateContent(this.bannerContents)) {
      this.initializeBanners();
      this.intervalId = setInterval(
        () =>
          this.goToNextBanner(
            this.banner,
            this.bannerContents,
            this.bannerViews
          ),
        this.bannerTime
      );
    }
  }

  stop(intervalId: number): void {
    if (intervalId !== this.invalidId) {
      clearInterval(this.intervalId);
    }
  }

  goToNextBanner(
    bannerContainer: ElementRef,
    bannerContents: string[],
    bannerViews: ElementRef[]
  ): void {
    this.moveBanner(true, bannerContainer, bannerContents, bannerViews);
  }

  goToPreviousBanner(
    bannerContainer: ElementRef,
    bannerContents: string[],
    bannerViews: ElementRef[]
  ): void {
    this.moveBanner(false, bannerContainer, bannerContents, bannerViews);
  }

  private moveBanner(
    next: boolean,
    bannerContainer: ElementRef,
    bannerContents: string[],
    bannerViews: ElementRef[]
  ): void {
    this.animationControl = true;
    bannerContainer.nativeElement.addEventListener("animationend", () => {
      if (this.animationControl) {
        this.animationControl = false;
        this.changeBannersContent(
          next,
          bannerContainer,
          bannerContents,
          bannerViews
        );
      }
    });

    const directionClass = next ? "go-right" : "go-left";

    bannerContainer.nativeElement.classList.add(directionClass);
  }

  private changeBannersContent(
    toRight: boolean,
    bannerContainer: ElementRef,
    bannerContents: string[],
    bannerViews: ElementRef[]
  ) {
    const firstContentIndex = 0;
    const firstContent = bannerContents[firstContentIndex];
    const lastContentIndex = bannerContents.length - 1;
    const lastContent = bannerContents[lastContentIndex];

    if (toRight) {
      for (let i = lastContentIndex; i > 0; i--) {
        bannerContents[i] = bannerContents[i - 1];
      }
      bannerContents[firstContentIndex] = lastContent;
    } else {
      for (let i = 0; i < bannerContents.length - 1; i++) {
        bannerContents[i] = bannerContents[i + 1];
      }
      bannerContents[lastContentIndex] = firstContent;
    }

    this.setEdgeBanners(bannerContents);

    this.applyBannerContent(bannerContents, bannerViews);

    this.clearAnimation(bannerContainer);
  }

  private clearAnimation(bannerContainer: ElementRef): void {
    bannerContainer.nativeElement.classList.remove("go-left");
    bannerContainer.nativeElement.classList.remove("go-right");
  }

  private setEdgeBanners(bannerContents: string[]): void {
    const firstContentIndex = 0;
    const lastContentIndex = bannerContents.length - 1;

    bannerContents[firstContentIndex] = bannerContents[lastContentIndex - 1];
    bannerContents[lastContentIndex] = bannerContents[firstContentIndex + 1];
  }

  private applyBannerContent(
    bannerContents: string[],
    bannerViews: ElementRef[]
  ): void {
    for (let i = 0; i < bannerViews.length; i++) {
      this.renderer.setStyle(
        bannerViews[i].nativeElement,
        "background-color",
        bannerContents[i]
      );
    }
  }

  private validateContent(bannerContents: string[]): boolean {
    return bannerContents !== undefined
     && bannerContents.length >= this.minimumBannerContentSize;
  }
}
