// Fonction pour mettre à jour l'heure et la date
function getCurrentDateAndTime() {
  const now = new Date();
  
  // Obtenir l'heure, les minutes et les secondes
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  
  // Formater l'heure (ajouter un zéro si nécessaire)
  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;
  
  // Obtenir la date
  const day = now.getDate();
  const month = now.getMonth() + 1; // Janvier est le mois 0, donc on ajoute 1
  const year = now.getFullYear();
  
  // Formater la date
  const dateString = day < 10 ? '0' + day : day;
  const monthString = month < 10 ? '0' + month : month;
  const formattedDate = dateString + ' ' + getMonthName(month) + ' ' + year;
  
  // Afficher l'heure et la date
  document.querySelector('#clock').textContent = hours + ':' + minutes + ':' + seconds;
  document.querySelector('#date').textContent = formattedDate;
}

// Fonction pour obtenir le nom du mois
function getMonthName(month) {
  const months = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];
  return months[month - 1];
}

getCurrentDateAndTime();
// Mettre à jour l'heure et la date toutes les secondes
setInterval(getCurrentDateAndTime, 1000);

// ****************************************************************

// ----------------------------------------------------------------

// ****************************************************************

class TimeInterval {
  constructor() {
    this.totalMinutes = 0;
    this.intervalList = [];
  }

  convertToMinutes(time) {
    const [h, m] = time.split(':').map(num => parseInt(num));
    return h * 60 + m;
  }

  addInterval(startTime, endTime) {
    const startMinutes = this.convertToMinutes(startTime);
    const endMinutes = this.convertToMinutes(endTime);
    let difference = endMinutes - startMinutes;

    if (difference < 0) {
      difference += 24 * 60;  // Gestion si les jours se chevauchent
    }

    this.totalMinutes += difference;
    const index = this.intervalList.length;
    this.intervalList.push(difference);
    this.displayInterval(difference, index);
    this.displayTotal();
  }

  displayInterval(difference, index) {
    const hours = Math.floor(difference / 60);
    const minutes = difference % 60;
    const intervalElement = document.createElement('div');
    intervalElement.classList.add('interval');
    intervalElement.id = `interval-${index}`;
    intervalElement.innerHTML = `
      
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <span class="badge bg-primary rounded-pill">${index + 1}</span>
        <span class="text-light"> ${hours}heures ${minutes}minutes</span>
        <button class="btn btn-outline-danger btn-sm" onclick="deleteInterval(${index})">-</button>
      </li>
    `;
    document.getElementById('intervals').appendChild(intervalElement);
  }

  deleteInterval(index) {
    this.totalMinutes -= this.intervalList[index];
    this.intervalList.splice(index, 1);
    this.updateDisplay();
  }

  displayTotal() {
    const totalHours = Math.floor(this.totalMinutes / 60);
    const totalMinutes = this.totalMinutes % 60;
    document.querySelector('#total-hours').innerText = totalHours;
    document.querySelector('#total-minutes').innerText = totalMinutes;
  }

  updateDisplay() {
    document.getElementById('intervals').innerHTML = '';
    this.intervalList.forEach((difference, index) => {
      this.displayInterval(difference, index);
    });
    this.displayTotal();
  }
}

const timeInterval = new TimeInterval();

function addInterval() {
  const startTime = document.getElementById('startTime').value;
  const endTime = document.getElementById('endTime').value;

  if (startTime && endTime) {
    timeInterval.addInterval(startTime, endTime);
  } else {
    alert('Entrer des valeurs cohérentes');
  }
}

function deleteInterval(index) {
  timeInterval.deleteInterval(index);
}
