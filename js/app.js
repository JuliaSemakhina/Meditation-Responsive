const play = document.querySelector('.play');
const pause = document.querySelector('.pause');


const audio = document.querySelector('.audio audio');

play.addEventListener('click', () => {
    audio.play();
    update();
});
pause.addEventListener('click', () => {
    audio.pause();
});

// Select Seasons and the video

const seasons = document.querySelectorAll('.season');
const video = document.querySelector('.video video');

seasons.forEach((season) => {
    season.addEventListener("click", () => {
        video.src = season.getAttribute("video-src");
    });
});

// Select duration buttons
const durations = document.querySelectorAll(".duration");

// Default audio duration
let audioDuration = 120;

// Change audio duration

durations.forEach((duration) => {
    duration.addEventListener("click", () => {
        audioDuration = duration.getAttribute("audio-duration");
        update();
    });
});


// Select react and remaining time lement

const path = document.querySelector(".rect");
const remainingTimeEl = document.querySelector(".audio-remaining-time");

// Total length of the path (perimeter of the rect)
const pathLength = path.getTotalLength();

path.style.strokeDasharray = pathLength;

function update() {
    // Stop audio
    if (audio.currentTime >= audioDuration) {
        audio.pause();
        audio.currentTime = 0;
    }

    //Time played from the audio
    let portionPlayed = audio.currentTime / audioDuration;

    // Stroke dashoofset is propotional to the portionPlayed
    path.style.strokeDashoffset = -portionPlayed * pathLength;

    // Calculate remaining time in sec
    let remainingTimeInSec = audioDuration - audio.currentTime;
    renderRemainingTime(remainingTimeInSec);

    if (!audio.paused) {
        requestAnimationFrame(update);
    }
}

// update();

// Render remaining time
function renderRemainingTime(timeInSec) {
    let min = Math.floor(timeInSec / 60);
    let sec = Math.floor(timeInSec % 60);

    min = min < 10 ? `0${min}` : min;
    sec = sec < 10 ? `0${sec}` : sec;

    remainingTimeEl.innerHTML = `${min}:${sec}`;
}