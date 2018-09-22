import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';

@Component({
    selector: 'gimage',
    templateUrl: 'glitchimage.component.html',
    styleUrls: ['glitchimage.component.css']
})
export class GlitchImageComponent implements AfterViewInit {

    @ViewChild('glitchimage') element: ElementRef;
    @Input() src: string;
    @Input() resizevalue: number;
    @Input() bgcolor: string;
    @Input() pauseonhover: boolean;

    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private img: HTMLImageElement = new Image();
    private w: number;
    private h: number;
    private glitchInterval: any;
    private pauseAnimation = false;


    constructor() { }

    ngAfterViewInit() {
        this.canvas = this.element.nativeElement;
        this.img.src = this.src;
        this.ctx = this.canvas.getContext('2d');

        this.img.onload = () => {
            this.init();
        };
    }


    init() {
        clearInterval(this.glitchInterval);

        this.canvas.width = this.img.width / this.resizevalue + 10;
        this.canvas.height = this.img.height / this.resizevalue;
        this.w = this.img.width / this.resizevalue;   // this.w = this.WIDTH;
        this.h = this.img.height / this.resizevalue;     // this.h = this.HEIGHT;


        this.glitchInterval = setInterval(() => {
            if (!this.pauseAnimation) {
                this.clear();
                this.ctx.drawImage(this.img, 5, 0, this.w, this.h);
                setTimeout(() => { this.glitchImg(); }, this.randomize(600));
            }
        }, 500);
    }

    clear() {
        this.ctx.rect(0, 0, this.w + 10, this.h);
        this.ctx.fillStyle = this.bgcolor;
        this.ctx.fill();
    }


    glitchImg() {
        if (!this.pauseAnimation) {
            const rndNum = (Math.random() * (13 - 1) + 1);
            const rndNum2 = (Math.random() * (this.h / 3 - 5) + 5);
            for (let i = 0; i < rndNum; i++) {
                const x = Math.random() * this.w + 20;
                const y = Math.random() * this.h;
                const spliceWidth = this.w - x;
                const spliceHeight = rndNum2;
                this.ctx.drawImage(this.canvas, 0, y, spliceWidth, spliceHeight, x, y, spliceWidth, spliceHeight);
                this.ctx.drawImage(this.canvas, spliceWidth, y, x, spliceHeight, 0, y, x, spliceHeight);
            }
        }
    }


    randomize(a: number): number {
        return (Math.random() * a);
    }

    mouseOver() {
        if (this.pauseonhover) {
            this.clear();
            this.ctx.drawImage(this.img, 5, 0, this.w, this.h);
            this.pauseAnimation = true;
        }

    }
    mouseOut() {
        if (this.pauseonhover) {
            this.pauseAnimation = false;
        }
    }
}
