const app = () => {
  const playBtn = document.querySelector('.player-timer-btn');
  const song = document.querySelector('.song');
  const player = document.querySelector('.player');
  const sounds = document.querySelectorAll('.soundList-item');
  const outline = document.querySelector('.player-timer-moving-circle circle');
  const outlineLength = outline.getTotalLength();
  const timeDisplay = document.querySelector('.time-display');
  let currentTime = song.currentTime;
  let currentDuration = 120;
  let leftDuration = currentDuration - currentTime;
  let minutes = Math.floor(leftDuration / 60);
  let seconds = Math.floor(leftDuration % 60);

  window.addEventListener('DOMContentLoaded', () => {
    mapClickEventToSoundBtn();
    setAnimateCircle();
    mapCheckPlayingEvent();
    updateTimerText(minutes, seconds);
  });

  const mapCheckPlayingEvent = () => {
    playBtn.addEventListener('click', () => {
      checkPlaying(song);
    });
  }

  const mapClickEventToSoundBtn = () => {
    sounds.forEach(sound => {
      sound.addEventListener('click', function() {
        const imageUrl = this.getAttribute('data-image');

        song.src = this.getAttribute('data-sound');
        player.style.backgroundImage = `url(${imageUrl})`;
      });
    });
  };

  const checkPlaying = () => {
    if (song.paused) {
      song.play();
      playBtn.src = 'svg/stop.svg';
    } else {
      song.pause();
      playBtn.src = 'svg/play.svg';
    }
  };

  const updateTimerText = (minutes, seconds) => {
    const renderSeconds = () => {
      return seconds > 10 ? seconds : `0${seconds}`;
    }

    timeDisplay.textContent = `${minutes}:${renderSeconds()}`;
  };

  const animateCircle = () => {
    let progress = outlineLength - (currentTime / currentDuration) * outlineLength;

    outline.style.strokeDashoffset = progress;
  };

  const checkSongEnding = () => {
    if (currentTime > currentDuration) {
      song.pause();
      song.currentTime = 0;
      playBtn.src = 'svg/play.svg';
    }
  };

  const setAnimateCircle = () => {
    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

    song.addEventListener('timeupdate', () => {
      currentTime = song.currentTime;
      leftDuration = currentDuration - currentTime;
      minutes = Math.floor(leftDuration / 60);
      seconds = Math.floor(leftDuration % 60);

      animateCircle();
      updateTimerText(minutes, seconds);
      checkSongEnding();
    });
  };

  const updatePlayerText = (title, description) => {
    const playerTitle = document.querySelector('.title-headline');
    const playerDescription = document.querySelector('.title-description');

    playerTitle.innerText = title;
    playerDescription.innerText = description;
  };

  sounds.forEach(option => {
    option.addEventListener('click', function() {
      currentDuration = parseInt(this.getAttribute('data-time'));
      minutes = Math.floor(currentDuration / 60);
      seconds = Math.floor(currentDuration % 60);
      playBtn.src = 'svg/play.svg';
      const title = this.querySelector('.soundList-title').innerText;
      const description = this.querySelector('.soundList-description').innerText;

      updateTimerText(minutes, seconds);
      updatePlayerText(title, description);
    });
  });
}

app();