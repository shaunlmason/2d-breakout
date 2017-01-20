import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'breakout-canvas',
    templateUrl: './canvas.component.html',
    styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements AfterViewInit, OnInit {
    @ViewChild('bkCanvas') canvasElement: ElementRef;

    context: CanvasRenderingContext2D;
    x: number;
    y: number;
    dx: number;
    dy: number;

    constructor() { }

    ngOnInit() { }

    ngAfterViewInit() {
        this.context = this.canvasElement.nativeElement.getContext('2d');

        this.x = this.context.canvas.width / 2;
        this.y = this.context.canvas.height - 30;
        this.dx = 2;
        this.dy = -2;

        setInterval(() => this.draw(), 10);
    }

    private clearCanvas(): void {
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    }

    private draw(): void {
        this.clearCanvas();
        this.drawBall();

        this.x += this.dx;
        this.y += this.dy;
    }

    private drawBall(): void {
        this.context.beginPath();
        this.context.arc(this.x, this.y, 10, 0, Math.PI * 2);
        this.context.fillStyle = '#0095DD';
        this.context.fill();
        this.context.closePath();
    }

    // private drawGreenCircle(): void {
    //     this.context.beginPath();
    //     this.context.arc(240, 160, 20, 0, Math.PI * 2, false);
    //     this.context.fillStyle = 'green';
    //     this.context.fill();
    //     this.context.closePath();
    // }

    // private drawRedSquare(): void {
    //     this.context.beginPath();
    //     this.context.rect(20, 40, 50, 50);
    //     this.context.fillStyle = '#FF0000';
    //     this.context.fill();
    //     this.context.closePath();
    // }

    // private drawRectangleWithOpacity(): void {
    //     this.context.beginPath();
    //     this.context.rect(160, 10, 100, 40);
    //     this.context.strokeStyle = 'rgba(0, 0, 255, 0.5)';
    //     this.context.stroke();
    //     this.context.closePath();
    // }

}
