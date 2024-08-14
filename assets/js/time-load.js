document.addEventListener('DOMContentLoaded', () => {
    const loadTimeElement = document.getElementById('load-time');
    const loadYearElement = document.getElementById('load-year');
    loadTimeElement.innerHTML = performance.now() / 1000  + "s";
    loadYearElement.innerHTML = new Date().getFullYear().toString();
});
