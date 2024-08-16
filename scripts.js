// Handle the advanced toggle to show/hide advanced fields
document.getElementById('advance-toggle').addEventListener('change', function () {
    const advancedFields = document.getElementById('advanced-fields');
    if (this.checked) {
        advancedFields.style.display = 'block';
    } else {
        advancedFields.style.display = 'none';
    }
});
