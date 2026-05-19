const stations = [
  {
    frequency: "92.8",
    name: "Night Drive",
    description: "A calm late-night mix with soft electronic textures and city ambience."
  },
  {
    frequency: "101.4",
    name: "Morning Wire",
    description: "Fresh headlines, quick interviews, and bright music for the first hour online."
  },
  {
    frequency: "88.6",
    name: "Analog Room",
    description: "Warm vinyl selections, archive sessions, and unhurried weekend discoveries."
  }
];

let currentStation = 0;
let isPlaying = false;

const stationFrequency = document.querySelector("#stationFrequency");
const stationDescription = document.querySelector("#stationDescription");
const statusLabel = document.querySelector("#statusLabel");
const playToggle = document.querySelector("#playToggle");
const previousStation = document.querySelector("#previousStation");
const nextStation = document.querySelector("#nextStation");
const stationCards = Array.from(document.querySelectorAll(".station-card"));
const waveform = document.querySelector(".waveform");

function renderStation() {
  const station = stations[currentStation];

  stationFrequency.textContent = station.frequency;
  stationDescription.textContent = station.description;

  stationCards.forEach((card, index) => {
    card.classList.toggle("is-active", index === currentStation);
  });
}

function setPlaying(nextState) {
  isPlaying = nextState;
  statusLabel.textContent = isPlaying ? "On air" : "Paused";
  playToggle.textContent = isPlaying ? "Pause" : "Play";
  waveform.classList.toggle("is-playing", isPlaying);
}

function moveStation(direction) {
  currentStation = (currentStation + direction + stations.length) % stations.length;
  renderStation();
}

playToggle.addEventListener("click", () => setPlaying(!isPlaying));
previousStation.addEventListener("click", () => moveStation(-1));
nextStation.addEventListener("click", () => moveStation(1));

stationCards.forEach((card) => {
  card.addEventListener("click", () => {
    currentStation = Number(card.dataset.station);
    renderStation();
  });
});

renderStation();
