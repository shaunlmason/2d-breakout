import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'breakout-canvas',
    templateUrl: './canvas.component.html',
    styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements AfterViewInit, OnInit {
    @ViewChild('bkCanvas') canvasElement: ElementRef;

    context: CanvasRenderingContext2D;

    constructor() { }

    ngOnInit() { }

    ngAfterViewInit() {
        this.context = this.canvasElement.nativeElement.getContext('2d');

        this.drawRedSquare();
        this.drawGreenCircle();
        this.drawRectangleWithOpacity();
    }

    private drawGreenCircle(): void {
        this.context.beginPath();
        this.context.arc(240, 160, 20, 0, Math.PI * 2, false);
        this.context.fillStyle = 'green';
        this.context.fill();
        this.context.closePath();
    }

    private drawRedSquare(): void {
        this.context.beginPath();
        this.context.rect(20, 40, 50, 50);
        this.context.fillStyle = '#FF0000';
        this.context.fill();
        this.context.closePath();
    }

    private drawRectangleWithOpacity(): void {
        this.context.beginPath();
        this.context.rect(160, 10, 100, 40);
        this.context.strokeStyle = 'rgba(0, 0, 255, 0.5)';
        this.context.stroke();
        this.context.closePath();
    }

}
