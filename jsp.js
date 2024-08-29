const audio = new Audio();
const playlist = document.getElementById("playlist");
const tracks = playlist.getElementsByTagName("li");
const playBtn = document.getElementById("playBtn");
const pauseBtn = document.getElementById("pauseBtn");
const volumeControl = document.querySelector(".volume");
const progressBar = document.querySelector(".progress .status");

let currentIndex = 0;

console.log("playlist", tracks);

const loadTrack = (index) => {
    audio.src = tracks[index].getAttribute("data-src");
    console.log(`Loaded track: ${audio.src}`);
    resetProgress();
}

const playTrack = () => {
    playBtn.classList.add("hide");
    pauseBtn.classList.remove("hide");
    audio.play();
}

const pauseTrack = () => {
    playBtn.classList.remove("hide");
    pauseBtn.classList.add("hide");
    audio.pause();
}

const nextTrack = () => {
    currentIndex = (currentIndex + 1) % tracks.length;
    loadTrack(currentIndex);
    audio.addEventListener('canplaythrough', playTrack, { once: true });
}

const prevTrack = () => {
    currentIndex = (currentIndex - 1 + tracks.length) % tracks.length;
    loadTrack(currentIndex);
    audio.addEventListener('canplaythrough', playTrack, { once: true });
}

Array.from(tracks).forEach((item, index) => {
    item.addEventListener("click", () => {
        currentIndex = index;
        loadTrack(currentIndex); // Load the track first
        audio.addEventListener('canplaythrough', playTrack, { once: true }); // Then play it when ready
    });
});

//loaded track
playBtn.addEventListener("click", playTrack);
//currently playing track
pauseBtn.addEventListener("click", pauseTrack);

// Volume control
volumeControl.addEventListener("input", () => {
    audio.volume = volumeControl.value / 100; 
});

//progress bar status
audio.addEventListener("timeupdate", () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${progress}%`;
});

const resetProgress = () => {
    progressBar.style.width = '0%';
}

// Load the initial track without playing it
loadTrack(currentIndex);
