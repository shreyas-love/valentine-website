const stamp = document.getElementById("stamp");
const content = document.getElementById("content");
const letter = document.getElementById("letter");

const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");

const celebration = document.getElementById("celebration");

// Open the letter
stamp.addEventListener("click", () => {
  stamp.style.display = "none";
  document.querySelector(".closed-text").style.display = "none";
  content.classList.remove("hidden");
});

// Make NO button run away
let noIsFree = false;

function moveNoButton(e) {
  e.preventDefault();

  // First escape: lock position next to YES
  if (!noIsFree) {
    const rect = noBtn.getBoundingClientRect();

    noBtn.style.position = "fixed";
    noBtn.style.left = rect.left + "px";
    noBtn.style.top = rect.top + "px";

    noIsFree = true;
  }

  const jump = 140;
  const angle = Math.random() * Math.PI * 2;

  let x = noBtn.offsetLeft + Math.cos(angle) * jump;
  let y = noBtn.offsetTop + Math.sin(angle) * jump;

  const maxX = window.innerWidth - noBtn.offsetWidth - 10;
  const maxY = window.innerHeight - noBtn.offsetHeight - 10;

  x = Math.max(10, Math.min(x, maxX));
  y = Math.max(10, Math.min(y, maxY));

  noBtn.style.left = x + "px";
  noBtn.style.top = y + "px";
}

noBtn.addEventListener("touchstart", moveNoButton, { passive: false });
noBtn.addEventListener("mousedown", moveNoButton);

// YES clicked
yesBtn.addEventListener("click", () => {
  letter.style.display = "none";
  celebration.classList.remove("hidden");
  confetti();
});

// Confetti effect
function confetti() {
  for (let i = 0; i < 60; i++) {
    const dot = document.createElement("div");
    dot.style.position = "absolute";
    dot.style.width = "8px";
    dot.style.height = "8px";
    dot.style.background = `hsl(${Math.random()*360},100%,70%)`;
    dot.style.left = Math.random() * window.innerWidth + "px";
    dot.style.top = "-10px";
    dot.style.borderRadius = "50%";
    document.body.appendChild(dot);

    dot.animate(
      [
        { transform: "translateY(0)" },
        { transform: "translateY(100vh)" }
      ],
      {
        duration: 3000 + Math.random() * 2000,
        easing: "ease-out"
      }
    ).onfinish = () => dot.remove();
  }
}