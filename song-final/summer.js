let fireflies = [];
let grass = [];

function setup() {
  let canvas = createCanvas(600, 400);
  canvas.parent("sketch-holder");

  // creates grass once so it does not randomly flicker every frame
  for (let x = 0; x < width; x += 8) {
    grass.push({
      x: x,
      height: random(20, 55),
      sway: random(-5, 5)
    });
  }
}

function draw() {
  background(12, 20, 35);

  drawMoon();
  drawGrass();

  if (mouseIsPressed) {
    for (let i = 0; i < 3; i++) {
      let firefly = {
        x: mouseX + random(-15, 15),
        y: mouseY + random(-15, 15),
        size: random(4, 12),
        glow: random(80, 180),
        speedX: random(-1, 1),
        speedY: random(-1, 1),
      };

      fireflies.push(firefly);
    }
  }

  drawFireflies();
  drawWindowFrame();

  if (fireflies.length > 140) {
    fireflies.splice(0, 3);
  }
}

function drawFireflies() {
  for (let i = 0; i < fireflies.length; i++) {
    let f = fireflies[i];

    f.x += f.speedX;
    f.y += f.speedY;
    f.glow += random(-5, 5);

    noStroke();

    fill(255, 230, 120, 30);
    ellipse(f.x, f.y, f.size * 4, f.size * 4);

    fill(255, 245, 170, f.glow);
    ellipse(f.x, f.y, f.size, f.size);
  }
}

// moon
function drawMoon() {
  noStroke();

  fill(240, 235, 210, 180);
  ellipse(500, 75, 65, 65);

  fill(12, 20, 35, 170);
  ellipse(520, 62, 65, 65);
}

// moving grass
function drawGrass() {
  stroke(40, 85, 60, 160);
  strokeWeight(2);

  for (let i = 0; i < grass.length; i++) {
    let g = grass[i];
    let movement = sin(frameCount * 0.03 + i) * 4;

    line(g.x, height, g.x + g.sway + movement, height - g.height);
  }
}

function drawWindowFrame() {
  noFill();
  stroke(30);
  strokeWeight(18);
  rect(0, 0, width, height);

  strokeWeight(8);
  line(width / 2, 0, width / 2, height);
  line(0, height / 2, width, height / 2);
}