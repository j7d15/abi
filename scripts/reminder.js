class Reminder {
    constructor(time, id) {
      this.time = time;  // L'heure du rappel
      this.id = id;  // Identifiant unique pour chaque rappel
      this.timeoutId = null;  // Pour annuler le timeout si nécessaire
    }
  
    // Méthode pour vérifier si c'est l'heure du rappel
    checkTime() {
        if (!this.time) return;
      const now = new Date();
      const [hours, minutes] = this.time.split(':').map(num => parseInt(num));
      const reminderTime = new Date(now);
      reminderTime.setHours(hours, minutes, 0, 0); // Heure spécifique
  
      if (now >= reminderTime && !this.timeoutId) {
        // Il est temps, on joue le son
        this.triggerReminder();
      }
    }
  
    // Déclenche l'alerte (son et affichage)
    triggerReminder() {
      const sound = document.getElementById('reminder-sound');
      sound.play();
  
      // Retirer le rappel de la liste après 10 secondes pour qu'il ne sonne plus
      setTimeout(() => {
        sound.pause();
        sound.currentTime = 0;
        this.removeReminder();
      }, 5000);
    }
  
    // Supprime ce rappel
    removeReminder() {
        this.time = null;
      clearTimeout(this.timeoutId); // Annule l'appel du rappel si nécessaire
      this.timeoutId = null;
      const reminderItem = document.getElementById(this.id);
      reminderItem && reminderItem.remove();
    }
  }
  
  class ReminderManager {
    constructor() {
      this.reminders = [];  // Liste des rappels
    }
  
    // Ajoute un rappel
    addReminder(time) {
      const id = `reminder-${new Date().getTime()}`;
      const reminder = new Reminder(time, id);
      this.reminders.push(reminder);
      
      // Affichage dans la liste des rappels
      this.displayReminder(reminder);
      
      // Vérifier périodiquement si l'heure est atteinte
      setInterval(() => {
        reminder.checkTime();
      }, 1000); // Vérification toutes les secondes
    }
  
    // Affiche un rappel dans la liste
    displayReminder(reminder) {
      const remindersList = document.getElementById('reminders-list');
      const reminderItem = document.createElement('li');
      reminderItem.classList.add('list-group-item');
      reminderItem.id = reminder.id;
      reminderItem.textContent = reminder.time;
  
      // Bouton pour supprimer le rappel
      const removeButton = document.createElement('button');
      removeButton.classList.add('btn', 'btn-danger', 'btn-sm', 'ms-3');
      removeButton.textContent = '-';
      removeButton.onclick = () => {
        reminder.removeReminder();
      };
      
      reminderItem.appendChild(removeButton);
      remindersList.appendChild(reminderItem);
    }
  }
  
  // Instancier le gestionnaire de rappels
  const reminderManager = new ReminderManager();
  
  // Ajouter un rappel lors du clic sur le bouton
  document.getElementById('set-reminder-btn').onclick = () => {
    const timeInput = document.getElementById('reminder-time').value;
    if (timeInput) {
      reminderManager.addReminder(timeInput);
    }
  };
  