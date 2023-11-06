document.addEventListener('DOMContentLoaded', () => {
    const loadTimeValue = document.getElementById('load-time');
    const now = performance.now();
    loadTimeValue.innerHTML = Math.round(parseFloat(now)) / 1000  + " s";
});
