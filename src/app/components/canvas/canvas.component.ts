import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

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

    ballRadius: number = 10;

    paddleHeight: number = 10;
    paddleWidth: number = 75;
    paddleX: number;

    leftPressed: boolean = false;
    rightPressed: boolean = false;

    @HostListener('document:keydown', ['$event'])
    handleKeydownEvent(event: KeyboardEvent) {
        if (event.keyCode === 39) {
            this.rightPressed = true;
        } else if (+event.keyCode === 37) {
            this.leftPressed = true;
        }
    };

    @HostListener('document:keyup', ['$event'])
    handleKeyupEvent(event: KeyboardEvent) {
        if (event.keyCode === 39) {
            this.rightPressed = false;
        } else if (+event.keyCode === 37) {
            this.leftPressed = false;
        }
    };

    constructor() { }

    ngOnInit() { }

    ngAfterViewInit() {
        this.context = this.canvasElement.nativeElement.getContext('2d');

        this.x = this.context.canvas.width / 2;
        this.y = this.context.canvas.height - 30;
        this.dx = 2;
        this.dy = -2;
        this.paddleX = (this.context.canvas.width - this.paddleWidth) / 2;

        setInterval(() => this.draw(), 10);
    }

    private clearCanvas(): void {
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    }

    private draw(): void {
        this.clearCanvas();
        this.drawBall();
        this.drawPaddle();

        this.x += this.dx;
        this.y += this.dy;

        // this.writeDebug();

        // Check Left/Right
        if (this.x + this.dx > this.context.canvas.width - this.ballRadius || this.x + this.dx < this.ballRadius) {
            this.dx = -this.dx;
        }

        // Check Top/Bottom
        if (this.y + this.dy < this.ballRadius) {
            this.dy = -this.dy;
        } else if (this.y + this.dy > this.context.canvas.height - this.ballRadius) {
            if (this.x > this.paddleX && this.x < this.paddleX + this.paddleWidth) {
                this.dy = -this.dy;
            } else {
                alert('GAME OVER');
                document.location.reload();
            }
        }

        // Check Paddle Left/Right
        if (this.rightPressed && this.paddleX < this.context.canvas.width - this.paddleWidth) {
            this.paddleX += 7;
        } else if (this.leftPressed && this.paddleX > 0) {
            this.paddleX -= 7;
        }
    }

    private drawBall(): void {
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.ballRadius, 0, Math.PI * 2);
        this.context.fillStyle = '#0095DD';
        this.context.fill();
        this.context.closePath();
    }

    private drawPaddle(): void {
        this.context.beginPath();
        this.context.rect(this.paddleX, this.context.canvas.height - this.paddleHeight, this.paddleWidth, this.paddleHeight);
        this.context.fillStyle = '#0095DD';
        this.context.fill();
        this.context.closePath();
    }

    private writeDebug() {
        console.log(`x: ${this.x}`);
        console.log(`y: ${this.y}`);
    }

}
