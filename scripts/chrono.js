class Chronometre {
    constructor(displayElement) {
        this.displayElement = displayElement;
        this.running = false;
        this.seconds = 0;
        this.minutes = 0;
        this.hours = 0;
        this.timer = null;
    }

    // Met à jour l'affichage du chronomètre
    updateDisplay() {
        this.displayElement.textContent = `${String(this.hours).padStart(2, '0')}:${String(this.minutes).padStart(2, '0')}:${String(this.seconds).padStart(2, '0')}`;
    }

    // Démarre ou met en pause le chronomètre
    startStop() {
        if (this.running) {
            clearInterval(this.timer); // Arrêter le chronomètre
        } else {
            this.timer = setInterval(() => {
                this.seconds++;
                if (this.seconds === 60) {
                    this.seconds = 0;
                    this.minutes++;
                }
                if (this.minutes === 60) {
                    this.minutes = 0;
                    this.hours++;
                }
                this.updateDisplay();
            }, 1000);
        }
        this.running = !this.running;
    }

    // Réinitialise le chronomètre
    reset() {
        clearInterval(this.timer);
        this.running = false;
        this.seconds = 0;
        this.minutes = 0;
        this.hours = 0;
        this.updateDisplay();
    }
}

const chronoDisplay = document.getElementById("chrono");
const chrono = new Chronometre(chronoDisplay);

document.getElementById("startStopBtn").addEventListener("click", () => {
    chrono.startStop();
    document.getElementById("startStopBtn").textContent = chrono.running ? "||" : ">";
});

document.getElementById("resetBtn").addEventListener("click", () => {
    chrono.reset();
    document.getElementById("startStopBtn").textContent = ">";
});
