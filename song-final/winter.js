// snow arrays
let snowflakes = [];
let frostMarks = [];

function setup() {
  let canvas = createCanvas(600, 400);
  canvas.parent("sketch-holder");

  // create snow
  for (let i = 0; i < 80; i++) {
    snowflakes.push(makeSnowflake(random(width), random(height)));
  }

  // create frost
  for (let i = 0; i < 35; i++) {
    frostMarks.push({
      x: random(width),
      y: random([random(15, 75), random(height - 75, height - 15)]),
      size: random(10, 24),
      opacity: random(25, 70)
    });
  }
}

function draw() {
  drawBackground();
  drawSnowman();
  drawSnow();
  drawFrost();
  drawWindowFrame();

  // add snow on click
  if (mouseIsPressed) {
    for (let i = 0; i < 3; i++) {
      snowflakes.push(makeSnowflake(mouseX + random(-20, 20), mouseY + random(-20, 20)));
    }
  }

  // limit snow
  if (snowflakes.length > 170) {
    snowflakes.splice(0, 3);
  }
}

// create snowflake
function makeSnowflake(x, y) {
  return {
    x: x,
    y: y,
    size: random(3, 8),
    speed: random(0.5, 1.7),
    drift: random(-0.4, 0.4),
    opacity: random(120, 230)
  };
}

// background
function drawBackground() {
  noStroke();

  drawVerticalGradient(0, 180, color("#132238"), color("#2a4160"));
  drawVerticalGradient(180, 320, color("#2a4160"), color("#6f879b"));
  drawVerticalGradient(320, height, color("#6f879b"), color("#9fb4c6"));

  // moon
  fill(220, 230, 245, 25);
  ellipse(485, 85, 120, 120);

  fill(245, 247, 238, 170);
  ellipse(485, 85, 62, 62);

  fill("#132238");
  ellipse(502, 72, 62, 62);

  // hills
  fill("#7e97aa");
  ellipse(140, 335, 430, 140);

  fill("#647d92");
  ellipse(430, 345, 470, 165);

  // trees
  fill("#172536");
  triangle(95, 320, 130, 235, 165, 320);
  triangle(470, 320, 510, 225, 550, 320);

  // ground
  fill("#eef4f8");
  rect(0, 320, width, 80);

  // snow mounds
  fill("#dbe6ee");
  ellipse(110, 332, 210, 48);
  ellipse(305, 336, 250, 58);
  ellipse(510, 330, 215, 48);
}

// gradient
function drawVerticalGradient(y1, y2, c1, c2) {
  for (let y = y1; y < y2; y++) {
    let amt = map(y, y1, y2, 0, 1);
    let c = lerpColor(c1, c2, amt);
    stroke(c);
    line(0, y, width, y);
  }

  noStroke();
}

// snowman
function drawSnowman() {
  noStroke();

  // shadow
  fill(170, 185, 200, 70);
  ellipse(125, 343, 80, 16);

  // body
  fill("#f8fafc");
  ellipse(125, 300, 72, 72);
  ellipse(125, 245, 50, 50);
  ellipse(125, 205, 34, 34);

  // face
  fill("#1a1a1a");
  ellipse(119, 202, 4, 4);
  ellipse(131, 202, 4, 4);

  // nose
  fill("#f28c38");
  triangle(125, 208, 125, 214, 140, 211);

  // arms
  stroke("#5c3a24");
  strokeWeight(3);
  line(100, 245, 72, 228);
  line(150, 245, 178, 228);

  // hat
  noStroke();
  fill("#1a1a1a");
  rect(108, 184, 34, 8);
  rect(115, 160, 20, 26);
}

// snow
function drawSnow() {
  noStroke();

  for (let i = 0; i < snowflakes.length; i++) {
    let s = snowflakes[i];

    fill(255, 255, 255, s.opacity);
    ellipse(s.x, s.y, s.size, s.size);

    s.y += s.speed;
    s.x += s.drift + sin(frameCount * 0.02 + i) * 0.25;

    if (s.y > height + 10) {
      snowflakes[i] = makeSnowflake(random(width), random(-40, 0));
    }
  }
}

// frost
function drawFrost() {
  noStroke();

  for (let i = 0; i < frostMarks.length; i++) {
    let f = frostMarks[i];

    fill(255, 255, 255, f.opacity);
    ellipse(f.x, f.y, f.size, f.size * 0.35);
  }

  fill(255, 255, 255, 140);
  rect(0, height - 32, width, 32);

  fill(230, 238, 245, 120);
  ellipse(95, height - 34, 150, 28);
  ellipse(290, height - 30, 185, 34);
  ellipse(485, height - 34, 170, 28);
}

// window
function drawWindowFrame() {
  noFill();
  stroke(30);
  strokeWeight(18);
  rect(0, 0, width, height);

  strokeWeight(8);
  line(width / 2, 0, width / 2, height);
  line(0, height / 2, width, height / 2);
}