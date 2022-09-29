import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { appSvgIcons } from './../app.svg.icons';

@Directive({
  selector: '[appAppSvgIconDirective]'
})
export class AppSvgIconDirectiveDirective {
  
  icons : any = appSvgIcons;
  @Input('appAppSvgIconDirective') icon!: string;

  constructor(
    public el: ElementRef,
    public renderer: Renderer2
  ) { }

  ngOnInit() {
    this.createSVG();
  }

  createSVG(): void {
    this.renderer.setProperty(this.el.nativeElement, 'innerHTML',  this.icons[this.icon]);
  }

}
