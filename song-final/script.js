let particles = [];
let season = "";

function setup() {
  let canvas = createCanvas(520, 340);
  canvas.parent("sketch-holder");

  if (document.body.classList.contains("spring-page")) {
    season = "spring";
  } else if (document.body.classList.contains("summer-page")) {
    season = "summer";
  } else if (document.body.classList.contains("autumn-page")) {
    season = "autumn";
  } else if (document.body.classList.contains("winter-page")) {
    season = "winter";
  }

  for (let i = 0; i < 35; i++) {
    particles.push({
      x: random(width),
      y: random(height),
      size: random(6, 18),
      speed: random(1, 2.5),
      drift: random(-1, 1)
    });
  }
}

function draw() {
  if (season === "spring") {
    background(189, 224, 254);
    drawSpring();
  } else if (season === "summer") {
    background(15, 23, 42);
    drawSummer();
  } else if (season === "autumn") {
    background(221, 161, 94);
    drawAutumn();
  } else if (season === "winter") {
    background(219, 234, 254);
    drawWinter();
  }

  drawWindowLines();
}

function drawSpring() {
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];

    fill(244, 182, 194);
    noStroke();
    ellipse(p.x, p.y, p.size, p.size / 2);

    p.y += p.speed;
    p.x += sin(frameCount * 0.03 + i) * 0.6;

    resetParticle(p);
  }
}

function drawSummer() {
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];

    fill(246, 247, 161);
    noStroke();
    ellipse(p.x, p.y, p.size / 1.8);

    p.x += sin(frameCount * 0.02 + i) * 0.8;
    p.y += cos(frameCount * 0.02 + i) * 0.5;

    if (p.x > width) p.x = 0;
    if (p.x < 0) p.x = width;
    if (p.y > height) p.y = 0;
    if (p.y < 0) p.y = height;
  }
}

function drawAutumn() {
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];

    fill(188, 108, 37);
    noStroke();
    ellipse(p.x, p.y, p.size, p.size / 2);

    p.y += p.speed;
    p.x += 1 + sin(frameCount * 0.03 + i);

    resetParticle(p);
  }
}

function drawWinter() {
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];

    fill(255);
    noStroke();
    ellipse(p.x, p.y, p.size / 1.5);

    p.y += p.speed;
    p.x += sin(frameCount * 0.02 + i) * 0.4;

    resetParticle(p);sprin
  }
}

function resetParticle(p) {
  if (p.y > height + 10 || p.x > width + 10) {
    p.y = -10;
    p.x = random(width);
  }
}

function drawWindowLines() {
  fill(93, 99, 79);
  noStroke();

  rect(width / 2 - 4, 0, 8, height);
  rect(0, height / 2 - 4, width, 8);
}

// jQuery interaction
$(document).ready(function() {
  $("#toggleIntro").click(function() {
    $(".intro").fadeToggle();
  });
});