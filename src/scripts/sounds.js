class Sound {
    constructor(filename) {
        this.sound = document.createElement("audio");
        this.sound.src = `./src/assets/sounds/${filename}`;
        this.sound.setAttribute('preload', 'auto');
        //  Specifies that audio controls should be displayed (such as a play/pause button etc)
        // we don't want it
        this.sound.setAttribute('controls', 'loop');
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);
    }

    play() {
        this.sound.play();
    }

    stop() {
        this.sound.pause();
    }
}

export default Sound;