document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('audiobook');
    const playButton = document.getElementById('play');
    const pauseButton = document.getElementById('pause');
    const stopButton = document.getElementById('stop');
    const volumeToggle = document.getElementById('volume-toggle');
    const volumeControl = document.getElementById('volume');
    const progressControl = document.getElementById('progress');
    const currentTimeSpan = document.getElementById('current-time');
    const durationSpan = document.getElementById('duration');

    // Atualiza o progresso e o tempo atual
    const updateProgress = () => {
        if (audio.duration) {
            const progress = (audio.currentTime / audio.duration) * 100;
            progressControl.value = progress;

            const formatTime = (seconds) => {
                const mins = Math.floor(seconds / 60);
                const secs = Math.floor(seconds % 60);
                return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
            };

            currentTimeSpan.textContent = formatTime(audio.currentTime);
            durationSpan.textContent = formatTime(audio.duration);
        }
    };

    playButton.addEventListener('click', () => {
        audio.play();
    });

    pauseButton.addEventListener('click', () => {
        audio.pause();
    });

    stopButton.addEventListener('click', () => {
        audio.pause();
        audio.currentTime = 0;
    });

    volumeToggle.addEventListener('click', () => {
        if (audio.muted) {
            audio.muted = false;
            volumeToggle.textContent = 'Volume';
        } else {
            audio.muted = true;
            volumeToggle.textContent = 'Silenciar';
        }
    });

    volumeControl.addEventListener('input', () => {
        audio.volume = volumeControl.value;
    });

    progressControl.addEventListener('input', () => {
        const newTime = (progressControl.value / 100) * audio.duration;
        audio.currentTime = newTime;
    });

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', updateProgress);
});
