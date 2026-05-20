// leaf array
let leaves = [];

function setup() {
  let canvas = createCanvas(600, 400);
  canvas.parent("sketch-holder");

  // create leaves
  for (let i = 0; i < 30; i++) {
    leaves.push(makeLeaf(random(width), random(height)));
  }
}

function draw() {
  drawBackground();
  drawTreeBranch();
  drawLeaves();
  drawWindowFrame();

  // add leaves on click
  if (mouseIsPressed) {
    for (let i = 0; i < 2; i++) {
      leaves.push(makeLeaf(mouseX + random(-20, 20), mouseY + random(-20, 20)));
    }
  }

  // limit leaves
  if (leaves.length > 120) {
    leaves.splice(0, 2);
  }
}

// create leaf
function makeLeaf(x, y) {
  return {
    x: x,
    y: y,
    size: random(14, 28),
    speedX: random(1, 3),
    speedY: random(0.4, 1.6),
    angle: random(TWO_PI),
    spin: random(-0.06, 0.06),
    colorChoice: random(["#b45309", "#c2410c", "#92400e", "#d97706", "#7c2d12"])
  };
}

// background
function drawBackground() {
  noStroke();

  drawVerticalGradient(0, 150, color("#f2c38b"), color("#dca06d"));
  drawVerticalGradient(150, 300, color("#dca06d"), color("#c9875d"));
  drawVerticalGradient(300, height, color("#c9875d"), color("#b87453"));

  // sun
  fill(255, 220, 170, 90);
  ellipse(470, 95, 110, 110);

  fill(255, 235, 200, 40);
  ellipse(470, 95, 170, 170);

  // distant mountains
  fill("#8a5a3b");
  triangle(-40, 320, 120, 230, 280, 320);
  triangle(180, 320, 350, 245, 520, 320);
  triangle(390, 320, 560, 250, 700, 320);

  // front mountains
  fill("#6e4732");
  triangle(-50, 340, 100, 270, 260, 340);
  triangle(210, 340, 380, 275, 560, 340);
  triangle(430, 340, 560, 295, 700, 340);

  // ground
  fill("#4a3126");
  rect(0, 320, width, 80);
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

// tree branch
function drawTreeBranch() {
  stroke("#3b2417");
  strokeWeight(14);
  noFill();

  line(0, 115, 180, 165);

  strokeWeight(7);
  line(90, 140, 145, 95);
  line(120, 150, 195, 125);
  line(45, 125, 95, 85);
}

// leaves
function drawLeaves() {
  for (let i = 0; i < leaves.length; i++) {
    let l = leaves[i];

    push();
    translate(l.x, l.y);
    rotate(l.angle);

    noStroke();
    fill(l.colorChoice);

    beginShape();
    vertex(0, -l.size / 2);
    bezierVertex(l.size / 2, -l.size / 4, l.size / 2, l.size / 4, 0, l.size / 2);
    bezierVertex(-l.size / 2, l.size / 4, -l.size / 2, -l.size / 4, 0, -l.size / 2);
    endShape(CLOSE);

    stroke("#5c2e12");
    strokeWeight(1);
    line(0, -l.size / 2, 0, l.size / 2);

    pop();

    l.x += l.speedX + sin(frameCount * 0.04 + i) * 1.5;
    l.y += l.speedY + cos(frameCount * 0.03 + i) * 0.7;
    l.angle += l.spin;

    if (l.x > width + 30 || l.y > height + 30) {
      leaves[i] = makeLeaf(random(-80, 0), random(0, height / 2));
    }
  }
}

// window
function drawWindowFrame() {
  noFill();
  stroke("#2a2522");
  strokeWeight(12);
  rect(0, 0, width, height, 18);

  strokeWeight(6);
  line(width / 2, 0, width / 2, height);
  line(0, height / 2, width, height / 2);
}