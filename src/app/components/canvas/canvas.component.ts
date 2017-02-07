import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'breakout-canvas',
    templateUrl: './canvas.component.html',
    styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements AfterViewInit, OnInit {
    @ViewChild('bkCanvas') canvasElement: ElementRef;

    ballRadius = 10;
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

        this.writeDebug();

        if (this.x + this.dx > this.context.canvas.width - this.ballRadius || this.x + this.dx < this.ballRadius) {
            this.dx = -this.dx;
        }

        if (this.y + this.dy > this.context.canvas.height - this.ballRadius || this.y + this.dy < this.ballRadius) {
            this.dy = -this.dy;
        }
    }

    private drawBall(): void {
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.ballRadius, 0, Math.PI * 2);
        this.context.fillStyle = '#0095DD';
        this.context.fill();
        this.context.closePath();
    }

    private writeDebug() {
        console.log(`x: ${this.x}`);
        console.log(`y: ${this.y}`);
    }

}
