const bars = document.getElementById('bars');
const sidebar = document.getElementById('sidebar');
const xmark = document.getElementById('xmark');

bars.addEventListener('click', () => {
    sidebar.style.display = 'flex';
});

xmark.addEventListener('click', () => {
    sidebar.style.display = 'none';
});
