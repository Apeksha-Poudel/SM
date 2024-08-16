const toggleSwitch = document.getElementById('mode-toggle');

toggleSwitch.addEventListener('change', function() {
    document.body.classList.toggle('dark-mode', this.checked);
    document.querySelector('.section').classList.toggle('dark-mode', this.checked);
    document.querySelector('footer').classList.toggle('dark-mode', this.checked);
    document.querySelector('.big').classList.toggle('dark-mode', this.checked);
});
