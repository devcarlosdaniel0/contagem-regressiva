function updateCountdown() {
    const endDate = new Date('2025-02-15T06:00:00'); 
    const currentDate = new Date();
    const totalSeconds = Math.floor((endDate - currentDate) / 1000);

    displayEndDate(endDate);

    if (totalSeconds <= 0) {
        document.getElementById('countdown').innerHTML = "";
        document.getElementById('message').textContent = "Chegouuuu!!!";
        document.getElementById('message').classList.remove('hidden');
        return; 
    }

    const timeUnits = {
        months: Math.floor(totalSeconds / (30 * 24 * 60 * 60)),
        weeks: Math.floor((totalSeconds % (30 * 24 * 60 * 60)) / (7 * 24 * 60 * 60)), 
        days: Math.floor((totalSeconds % (7 * 24 * 60 * 60)) / (24 * 60 * 60)),
        hours: Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60)),
        minutes: Math.floor((totalSeconds % (60 * 60)) / 60),
        seconds: totalSeconds % 60,
    };

    updateTimeDisplay(timeUnits);

    toggleUnitVisibility(timeUnits);
}

function displayEndDate(endDate) {
    const endDateElement = document.getElementById('end-date');
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
    const formattedDate = endDate.toLocaleDateString('pt-BR', options);
    endDateElement.textContent = `Data prevista: ${formattedDate}`;
}

function updateTimeDisplay(timeUnits) {
    Object.keys(timeUnits).forEach(unit => {
        const element = document.getElementById(unit);
        let label = '';

        switch(unit) {
            case 'months':
                label = timeUnits[unit] === 1 ? 'mês' : 'meses';
                break;
            case 'weeks':
                label = timeUnits[unit] === 1 ? 'semana' : 'semanas';
                break;
            case 'days':
                label = timeUnits[unit] === 1 ? 'dia' : 'dias';
                break;
            case 'hours':
                label = timeUnits[unit] === 1 ? 'hora' : 'horas';
                break;
            case 'minutes':
                label = timeUnits[unit] === 1 ? 'minuto' : 'minutos';
                break;
            case 'seconds':
                label = timeUnits[unit] === 1 ? 'segundo' : 'segundos';
                break;
        }

        element.textContent = `${timeUnits[unit]} ${label}`;
    });
}

function toggleUnitVisibility(timeUnits) {
    Object.keys(timeUnits).forEach(unit => {
        const element = document.getElementById(unit);

        // Oculta unidades com valor 0
        if (timeUnits[unit] === 0) {
            element.classList.add('hidden');
        } else {
            element.classList.remove('hidden');
        }
    });
}

setInterval(updateCountdown, 1000);

updateCountdown();
