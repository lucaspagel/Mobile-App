import { Component, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
    selector: 'app-canvas',
    templateUrl: './canvas.page.html',
    styleUrls: ['./canvas.page.scss'],
})
export class CanvasPage implements OnInit {
    @ViewChild('myCanvas') canvas: any;

    canvasElement: any;
    lastX: number;
    lastY: number;

    constructor(public platform: Platform, public renderer: Renderer2) { }

    ngOnInit() {
    }

    ngAfterViewInit(): void {
        this.canvasElement = this.canvas.nativeElement;
        console.log(this.platform.height());

        this.renderer.setProperty(this.canvasElement, 'width', this.platform.width());
        this.renderer.setProperty(this.canvasElement, 'height', this.platform.height() - 78);
    }

    handleStart(ev) {
        this.lastX = ev.touches[0].pageX;
        this.lastY = ev.touches[0].pageY - 55;
    }

    handleMove(ev) {
        let ctx = this.canvasElement.getContext('2d');
        let currentX = ev.touches[0].pageX;
        let currentY = ev.touches[0].pageY - 55;

        ctx.beginPath();
        ctx.lineJoin = "round";
        ctx.moveTo(this.lastX, this.lastY);
        ctx.lineTo(currentX, currentY);
        ctx.closePath();
        ctx.strokeStyle = '#DC143C';
        ctx.lineWidth = 10;
        ctx.stroke();

        this.lastX = currentX;
        this.lastY = currentY;
    }

    handleEnd(ev) {
    }

    saveCanvas() {
    }
}
