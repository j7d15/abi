function calculateTimeDifference() {
    const startTime1 = document.getElementById('start-time1').value;
    const endTime1 = document.getElementById('end-time1').value;
    const startTime2 = document.getElementById('start-time2').value;
    const endTime2 = document.getElementById('end-time2').value;

    if (!startTime1 || !endTime1 || !startTime2 || !endTime2) {
      alert('Compléter tous les champs !');
      return;
    }

    function calculatePeriodDifference(startTime, endTime) {
      const start = new Date(`1970-01-01T${startTime}:00Z`);
      const end = new Date(`1970-01-01T${endTime}:00Z`);

      if (end <= start) {
        end.setDate(end.getDate() + 1);
      }

      const diffInMs = end - start;

      const hours = Math.floor(diffInMs / (1000 * 60 * 60));
      const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));

      return { hours, minutes };
    }

    const diff1 = calculatePeriodDifference(startTime1, endTime1);
    const diff2 = calculatePeriodDifference(startTime2, endTime2);

    let totalHours = diff1.hours + diff2.hours;
    let totalMinutes = diff1.minutes + diff2.minutes;

    if (totalMinutes >= 60) {
      totalHours += Math.floor(totalMinutes / 60);
      totalMinutes = totalMinutes % 60;
    }


    // Display the result
    const resultElement = document.getElementById('result');
    resultElement.innerHTML = `
      <span class="text-warning h5">Matin: ${diff1.hours}h ${diff1.minutes}min &#x2009</span>
      <span class="text-warning-emphasis h5">Après midi: ${diff2.hours}h ${diff2.minutes}min &#x2009</span>
      <span class="text-info-emphasis h5">Total: ${totalHours}h ${totalMinutes}min</span>
    `;
  }