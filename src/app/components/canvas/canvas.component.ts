import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'breakout-canvas',
    templateUrl: './canvas.component.html',
    styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements AfterViewInit, OnInit {
    @ViewChild('bkCanvas') canvasElement: ElementRef;

    score = 0;

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

    brickRowCount = 3;
    brickColumnCount = 8;
    brickWidth = 75;
    brickHeight = 20;
    brickPadding = 9;
    brickOffsetTop = 30;
    brickOffsetLeft = 30;

    bricks = [];

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

    @HostListener('document:mousemove', ['$event'])
    handleMousMoveEvent(event: MouseEvent) {
        const relativeX = event.clientX - this.context.canvas.offsetLeft;

        if (relativeX > 0 && relativeX < this.context.canvas.width) {
            this.paddleX = relativeX - this.paddleWidth / 2;
        }
    }

    constructor() { }

    ngOnInit() {
        for (let i = 0; i < this.brickColumnCount; i++) {
            this.bricks[i] = [];

            for (let j = 0; j < this.brickRowCount; j++) {
                this.bricks[i][j] = { x: 0, y: 0, status: 1 };
            }
        }
    }

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

    private collisionDetection() {
        for (let c = 0; c < this.brickColumnCount; c++) {
            for (let r = 0; r < this.brickRowCount; r++) {
                const brick = this.bricks[c][r];
                if (brick.status === 1) {
                    if (this.x > brick.x && this.x < brick.x + this.brickWidth && this.y < brick.y + this.brickHeight) {
                        this.dy = -this.dy;
                        brick.status = 0;
                        this.score++;

                        if (this.score === this.brickRowCount * this.brickColumnCount) {
                            alert('YOU WIN, CONGRATULATIONS!');
                            document.location.reload();
                        }
                    }
                }
            }
        }
    }

    private draw(): void {
        this.clearCanvas();
        this.drawBricks();
        this.drawBall();
        this.drawPaddle();
        this.drawScore();
        this.collisionDetection();

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

    private drawBricks(): void {
        for (let c = 0; c < this.brickColumnCount; c++) {
            for (let r = 0; r < this.brickRowCount; r++) {
                if (this.bricks[c][r].status === 1) {
                    this.bricks[c][r].x = (c * (this.brickWidth + this.brickPadding)) + this.brickOffsetLeft;
                    this.bricks[c][r].y = (r * (this.brickHeight + this.brickPadding)) + this.brickOffsetTop;

                    this.context.beginPath();
                    this.context.rect(this.bricks[c][r].x, this.bricks[c][r].y, this.brickWidth, this.brickHeight);
                    this.context.fillStyle = '#0095DD';
                    this.context.fill();
                    this.context.closePath();
                }
            }
        }
    }

    private drawPaddle(): void {
        this.context.beginPath();
        this.context.rect(this.paddleX, this.context.canvas.height - this.paddleHeight, this.paddleWidth, this.paddleHeight);
        this.context.fillStyle = '#0095DD';
        this.context.fill();
        this.context.closePath();
    }

    private drawScore() {
        this.context.font = '16px Arial';
        this.context.fillStyle = '#0095DD';
        this.context.fillText('Score: ' + this.score, 8, 20);
    }

    private writeDebug() {
        console.log(`x: ${this.x}`);
        console.log(`y: ${this.y}`);
    }

}
