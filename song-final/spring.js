let petals = [];

function setup() {
  let canvas = createCanvas(600, 400);
  canvas.parent("sketch-holder");

  for (let i = 0; i < 35; i++) {
    petals.push({
      x: random(width),
      y: random(height),
      size: random(10, 22),
      speed: random(1, 3),
      angle: random(TWO_PI),
      spin: random(-0.03, 0.03)
    });
  }
}

function draw() {
  drawBackground();
  drawPetals();
  drawWindowFrame();
  drawInstructions();
}

function drawBackground() {
  // sky
  background(224, 238, 232);

  // soft sun
  noStroke();
  fill(255, 218, 160, 130);
  ellipse(500, 85, 90, 90);

  fill(255, 230, 180, 70);
  ellipse(500, 85, 140, 140);

  // distant hills
  fill(190, 215, 185);
  ellipse(160, 310, 380, 170);

  fill(165, 195, 160);
  ellipse(430, 315, 420, 180);

  // ground
  fill(90, 110, 80);
  rect(0, 310, width, 90);

  // simple flower stems / grass lines
  stroke(70, 95, 65, 120);
  strokeWeight(2);

  for (let x = 20; x < width; x += 24) {
    line(x, 350, x + random(-8, 8), 325);
  }

  // a few small flowers in the grass
  noStroke();

  for (let x = 40; x < width; x += 90) {
    fill(235, 170, 180, 180);
    ellipse(x, 340, 8, 8);
    ellipse(x + 5, 340, 8, 8);
    ellipse(x + 2.5, 335, 8, 8);

    fill(245, 210, 120);
    ellipse(x + 2.5, 340, 4, 4);
  }
}

function drawPetals() {
  for (let i = 0; i < petals.length; i++) {
    let p = petals[i];

    push();
    translate(p.x, p.y);
    rotate(p.angle);

    noStroke();

    // layered petal shape
    fill(210, 130, 140, 170);
    ellipse(0, 0, p.size, p.size * 1.8);

    fill(235, 170, 180, 120);
    ellipse(-p.size * 0.15, -p.size * 0.1, p.size * 0.55, p.size);

    pop();

    // petals fall down
    p.y += p.speed;

    // petals sway side to side
    p.x += sin(frameCount * 0.03 + i) * 0.9;

    // petals slowly rotate
    p.angle += p.spin;

    // sends petals back to the top
    if (p.y > height + 30) {
      p.y = -20;
      p.x = random(width);
      p.size = random(10, 22);
      p.speed = random(1, 3);
    }
  }
}

function drawWindowFrame() {
  // outer window frame
  noFill();
  stroke(30);
  strokeWeight(18);
  rect(0, 0, width, height);

  // middle window lines
  strokeWeight(8);
  line(width / 2, 0, width / 2, height);
  line(0, height / 2, width, height / 2);
}

function drawInstructions() {
  noStroke();
  fill(30);
  textSize(15);
  text("click to add petals", 24, 32);
}

function mousePressed() {
  // click adds a new petal
  petals.push({
    x: mouseX,
    y: mouseY,
    size: random(10, 22),
    speed: random(1, 3),
    angle: random(TWO_PI),
    spin: random(-0.03, 0.03)
  });
}