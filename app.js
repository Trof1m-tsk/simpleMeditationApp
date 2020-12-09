const app = () => {
    const playButton = document.querySelector(`.play`);
    const music = document.querySelector(`.music`);
    const video = document.querySelector(`.video`);
    const timeSelectors = document.querySelectorAll(`.time-select button`);
    const timeDisplay = document.querySelector(`.time-display`);
    const soundSelectors = document.querySelectorAll(`.sound-select button`);

    let duration = 600;
    const circle = document.querySelector(`.moving-circle circle`);
    const circleLength = circle.getTotalLength();

    circle.style.strokeDasharray = circleLength;
    circle.style.strokeDashoffset = circleLength;

    timeSelectors.forEach( (timeBtn) => {
        timeBtn.addEventListener(`click`, (evt) => {
            duration = evt.target.dataset.time;
            timeDisplay.textContent = `${Math.floor(duration / 60)}:00`;
        });
    });

    soundSelectors.forEach( (soundBtn) => {
        soundBtn.addEventListener(`click`, (evt) => {
            music.src = evt.target.closest("button").dataset.sound;
            video.src = evt.target.closest("button").dataset.video;
            playToggle();
        });
    });

    const playToggle = () => {
        if (music.paused === true) {
            music.play();
            video.play();
            playButton.src = "./svg/pause.svg";
        } else {
            music.pause();
            video.pause();
            playButton.src = "./svg/play.svg";
        }
    };

    music.ontimeupdate = () => {
        let currentTime = music.currentTime;
        let reminder = duration - currentTime;
        let seconds = Math.floor(reminder % 60);
        let minutes = Math.floor(reminder / 60);
        
        timeDisplay.textContent = seconds >= 10 ? `${minutes}:${seconds}` : `${minutes}:0${seconds}`;
        circle.style.strokeDashoffset = circleLength * (1 - currentTime / duration);

        if (currentTime >= duration) {
            music.pause();
            music.currentTime = 0;
            playButton.src = "./svg/play.svg"
            video.pause();

        }
    };
    
    playButton.addEventListener(`click`, playToggle);
}

app();