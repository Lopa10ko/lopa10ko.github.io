document.addEventListener('DOMContentLoaded', () => {
    const loadTimeElement = document.getElementById('load-time');
    const loadYearElement = document.getElementById('load-year');
    loadTimeElement.innerHTML = (performance.now()).toPrecision(3)  + "ms";
    loadYearElement.innerHTML = new Date().getFullYear().toString();
});
