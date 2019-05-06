const player = document.querySelector(".player");

const video = player.querySelector(".viewer");

const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");

const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip");
const ranges = player.querySelectorAll(".player__slider");

function togglePlay() {
  const method = video.paused ? "play" : "pause";
  video[method]();
}

function updateButton() {
  const icon = this.paused ? "►" : "❚❚";
  toggle.textContent = icon;
}

function skip() {
  console.log("skipping");
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

video.addEventListener("click", togglePlay, false);
video.addEventListener("play", updateButton, false);
video.addEventListener("pause", updateButton, false);
video.addEventListener("timeupdate", handleProgress, false);

toggle.addEventListener("click", togglePlay, false);

skipButtons.forEach(button => {
  button.addEventListener("click", skip, false);
});

ranges.forEach(range => {
  range.addEventListener("change", handleRangeUpdate, false);
});

ranges.forEach(range => {
  range.addEventListener("mousemove", handleRangeUpdate, false);
});

let mousedown = false;
progress.addEventListener("click", scrub, false);
progress.addEventListener("mousemove", e => mousedown && scrub(e), false);
progress.addEventListener("mousedown", () => (mousedown = true), false);
progress.addEventListener("mouseup", () => (mousedown = false), false);
