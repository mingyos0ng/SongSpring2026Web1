let plants = document.querySelectorAll(".plant");

plants.forEach(function(plant) {
  dragElement(plant);
});

function dragElement(plant) {
  plant.onmousedown = dragMouseDown;

  function dragMouseDown(event) {
    event.preventDefault();

    let page = document.getElementById("page");
    let rect = plant.getBoundingClientRect();

    let startX = event.pageX;
    let startY = event.pageY;

    let originalLeft = rect.left + window.scrollX;
    let originalTop = rect.top + window.scrollY;

    page.appendChild(plant);

    plant.style.position = "absolute";
    plant.style.left = originalLeft + "px";
    plant.style.top = originalTop + "px";
    plant.style.zIndex = "1000";

    document.onmousemove = function(event) {
      let moveX = event.pageX - startX;
      let moveY = event.pageY - startY;

      plant.style.left = originalLeft + moveX + "px";
      plant.style.top = originalTop + moveY + "px";
    };

    document.onmouseup = function() {
      document.onmousemove = null;
      document.onmouseup = null;
    };
  }
}