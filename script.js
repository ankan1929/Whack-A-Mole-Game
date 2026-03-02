const holes = document.querySelectorAll(".hole");
    const scoreBoard = document.querySelector(".score");
    const moles = document.querySelectorAll(".mole");
    const button = document.querySelector("#start");
    let lastHole;
    let timeUp = false;
    let score = 0;

    // Randomize time between mole appearance
    function randomTime(min, max) {
      return Math.round(Math.random() * (max - min) + min);
    }

    // Randomly select a hole
    function randomHole(holes) {
      const idx = Math.floor(Math.random() * holes.length);
      const hole = holes[idx];

      if (hole === lastHole) {
        return randomHole(holes); // Avoid same hole as last time
      }

      lastHole = hole;
      return hole;
    }

    // Make the mole appear
    function peep() {
      const time = randomTime(200, 1000);
      const hole = randomHole(holes);
      hole.classList.add("up");

      setTimeout(() => {
        hole.classList.remove("up");
        if (!timeUp) peep(); // Keep the moles popping up
      }, time);
    }

    // Start the game
    function startGame() {
      scoreBoard.textContent = 0; // Reset the score to 0
      timeUp = false;
      score = 0;
      button.style.visibility = "hidden"; 
      peep(); // Start the mole popping
      setTimeout(() => {
        timeUp = true; // Stop the game after 10 seconds
        button.innerHTML = "Try again?"; 
        button.style.visibility = "visible"; 
      }, 20000);
    }

    // When a mole is clicked
    function bonk(e) {
      if (!e.isTrusted) return; // Ensure it’s a genuine click event
      score++; 
      scoreBoard.textContent = score; 
      this.classList.remove("up"); 
    }

    // event listeners for mole clicks
    moles.forEach((mole) => mole.addEventListener("click", bonk));

    // Start the game on button click 
    button.addEventListener("click", startGame);