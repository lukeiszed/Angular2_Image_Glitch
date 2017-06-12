import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'gimage',
    templateUrl: 'glitchimage.component.html',
    styleUrls: ['glitchimage.component.css']
})
export class GlitchImageComponent implements AfterViewInit {

    @ViewChild('glitchimage') element: ElementRef;
    @Input('src') imageSrc: string;
    @Input('resizevalue') resizeValue: number;
    @Input('bgcolor') bgColor: string;
    @Input('pauseonhover') pauseOnHover: boolean;
    
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private img: HTMLImageElement = new Image();
    private w: number;
    private h: number;
    private glitchInterval: any;
    private pauseAnimation: boolean = false;


    constructor() { }

    ngAfterViewInit() {
        this.canvas = this.element.nativeElement;
        this.img.src = this.imageSrc;
        this.ctx = this.canvas.getContext('2d');

        this.img.onload = () => {
            this.init();
        }
    }


    init() {
        clearInterval(this.glitchInterval);

        this.canvas.width = this.img.width / this.resizeValue + 10;
        this.canvas.height = this.img.height / this.resizeValue;
        this.w = this.img.width / this.resizeValue;   //  this.w = this.WIDTH;                     
        this.h = this.img.height / this.resizeValue;     //this.h = this.HEIGHT;


        this.glitchInterval = setInterval(() => {
            if (!this.pauseAnimation) {
                this.clear();
                this.ctx.drawImage(this.img, 5, 0, this.w, this.h);
                setTimeout(() => { this.glitchImg() }, this.randomize(600, 1000));
            }
        }, 500);
    }

    clear() {
        this.ctx.rect(0, 0, this.w + 10, this.h);
        this.ctx.fillStyle = this.bgColor;
        this.ctx.fill();
    }


    glitchImg() {
        if (!this.pauseAnimation) {
            let rndNum = ~~(Math.random() * (13 - 1) + 1);
            let rndNum2 = ~~(Math.random() * (this.h / 3 - 5) + 5);
            for (let i = 0; i < rndNum; i++) {
                let x = Math.random() * this.w + 20;
                let y = Math.random() * this.h + 10;
                let shx = Math.random() * 10;
                let shy = Math.random() * 10;
                let spliceWidth = this.w - x;
                let spliceHeight = rndNum2;
                this.ctx.drawImage(this.canvas, 0, y, spliceWidth, spliceHeight, x, y, spliceWidth, spliceHeight);
                this.ctx.drawImage(this.canvas, spliceWidth, y, x, spliceHeight, 0, y, x, spliceHeight);
            }
        }
    }


    randomize(a: number, b: number): number {
        return ~~(Math.random() * a);
    }

    mouseOver() {
        if (this.pauseOnHover) {
             this.clear();
                this.ctx.drawImage(this.img, 5, 0, this.w, this.h);
            this.pauseAnimation = true;
        }

    }
    mouseOut() {
        if (this.pauseOnHover) {
            this.pauseAnimation = false;
        }
    }
}