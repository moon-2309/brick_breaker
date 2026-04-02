let ball;
let paddle;
let bricks = [];
let cols = 8;
let rows = 5;
let brickW, brickH;

function setup() {
  createCanvas(600, 400);

  ball = {
    x: width / 2,
    y: height / 2,
    r: 10,
    dx: 4,
    dy: -4
  };

  paddle = {
    w: 100,
    h: 10,
    y: height - 30
  };

  brickW = width / cols;
  brickH = 20;

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      bricks.push({
        x: i * brickW,
        y: j * brickH + 40,
        w: brickW - 5,
        h: brickH - 5,
        alive: true
      });
    }
  }
}

function draw() {
  background(20);

  // Paddle follows mouse
  paddle.x = mouseX - paddle.w / 2;
  paddle.x = constrain(paddle.x, 0, width - paddle.w);

  // Draw paddle
  fill(255);
  rect(paddle.x, paddle.y, paddle.w, paddle.h);

  // Move ball
  ball.x += ball.dx;
  ball.y += ball.dy;

  // Wall collisions
  if (ball.x < 0 || ball.x > width) ball.dx *= -1;
  if (ball.y < 0) ball.dy *= -1;

  // Paddle collision
  if (
    ball.y + ball.r > paddle.y &&
    ball.x > paddle.x &&
    ball.x < paddle.x + paddle.w
  ) {
    ball.dy *= -1;

    // Add angle control
    let diff = ball.x - (paddle.x + paddle.w / 2);
    ball.dx = diff * 0.1;
  }

  // Bottom = game over
  if (ball.y > height) {
    textAlign(CENTER);
    textSize(32);
    fill(255, 0, 0);
    text("GAME OVER", width / 2, height / 2);
    noLoop();
  }

  // Draw ball
  fill(255, 200, 200);
  ellipse(ball.x, ball.y, ball.r * 2);

  // Bricks
  for (let b of bricks) {
    if (b.alive) {
      fill(100, 200, 255);
      rect(b.x, b.y, b.w, b.h);

      // Collision with ball
      if (
        ball.x > b.x &&
        ball.x < b.x + b.w &&
        ball.y > b.y &&
        ball.y < b.y + b.h
      ) {
        ball.dy *= -1;
        b.alive = false;
      }
    }
  }

  // Win condition
  let remaining = bricks.filter(b => b.alive).length;
  if (remaining === 0) {
    textAlign(CENTER);
    textSize(32);
    fill(0, 255, 100);
    text("YOU WIN!", width / 2, height / 2);
    noLoop();
  }
}
