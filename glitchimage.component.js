"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var GlitchImageComponent = (function () {
    function GlitchImageComponent() {
        this.img = new Image();
        this.pauseAnimation = false;
    }
    GlitchImageComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.canvas = this.element.nativeElement;
        this.img.src = this.imageSrc;
        this.ctx = this.canvas.getContext('2d');
        this.img.onload = function () {
            _this.init();
            window.onresize = _this.init;
        };
    };
    GlitchImageComponent.prototype.init = function () {
        var _this = this;
        clearInterval(this.glitchInterval);
        this.canvas.width = this.img.width / this.resizeValue + 10;
        this.canvas.height = this.img.height / this.resizeValue;
        this.w = this.img.width / this.resizeValue; //  this.w = this.WIDTH;                     
        this.h = this.img.height / this.resizeValue; //this.h = this.HEIGHT;
        this.glitchInterval = setInterval(function () {
            if (!_this.pauseAnimation) {
                _this.clear();
                _this.ctx.drawImage(_this.img, 5, 0, _this.w, _this.h);
                setTimeout(function () { _this.glitchImg(); }, _this.randomize(600, 1000));
            }
        }, 500);
    };
    GlitchImageComponent.prototype.clear = function () {
        this.ctx.rect(0, 0, this.w + 10, this.h);
        this.ctx.fillStyle = this.bgColor;
        this.ctx.fill();
    };
    GlitchImageComponent.prototype.glitchImg = function () {
        if (!this.pauseAnimation) {
            var rndNum = ~~(Math.random() * (13 - 1) + 1);
            var rndNum2 = ~~(Math.random() * (this.h / 3 - 5) + 5);
            for (var i = 0; i < rndNum; i++) {
                var x = Math.random() * this.w + 20;
                var y = Math.random() * this.h + 10;
                var shx = Math.random() * 10;
                var shy = Math.random() * 10;
                var spliceWidth = this.w - x;
                var spliceHeight = rndNum2;
                this.ctx.drawImage(this.canvas, 0, y, spliceWidth, spliceHeight, x, y, spliceWidth, spliceHeight);
                this.ctx.drawImage(this.canvas, spliceWidth, y, x, spliceHeight, 0, y, x, spliceHeight);
            }
        }
    };
    GlitchImageComponent.prototype.randomize = function (a, b) {
        return ~~(Math.random() * a);
    };
    GlitchImageComponent.prototype.mouseOver = function () {
        if (this.pauseOnHover) {
            this.clear();
            this.ctx.drawImage(this.img, 5, 0, this.w, this.h);
            this.pauseAnimation = true;
        }
    };
    GlitchImageComponent.prototype.mouseOut = function () {
        if (this.pauseOnHover) {
            this.pauseAnimation = false;
        }
    };
    __decorate([
        core_1.ViewChild('glitchimage'), 
        __metadata('design:type', core_1.ElementRef)
    ], GlitchImageComponent.prototype, "element", void 0);
    __decorate([
        core_1.Input('src'), 
        __metadata('design:type', String)
    ], GlitchImageComponent.prototype, "imageSrc", void 0);
    __decorate([
        core_1.Input('resizevalue'), 
        __metadata('design:type', Number)
    ], GlitchImageComponent.prototype, "resizeValue", void 0);
    __decorate([
        core_1.Input('bgcolor'), 
        __metadata('design:type', String)
    ], GlitchImageComponent.prototype, "bgColor", void 0);
    __decorate([
        core_1.Input('pauseonhover'), 
        __metadata('design:type', Boolean)
    ], GlitchImageComponent.prototype, "pauseOnHover", void 0);
    GlitchImageComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'gimage',
            templateUrl: 'glitchimage.component.html',
            styleUrls: ['glitchimage.component.css']
        }), 
        __metadata('design:paramtypes', [])
    ], GlitchImageComponent);
    return GlitchImageComponent;
}());
exports.GlitchImageComponent = GlitchImageComponent;
//# sourceMappingURL=glitchimage.component.js.map