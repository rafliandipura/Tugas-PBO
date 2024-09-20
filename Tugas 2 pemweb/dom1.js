// DOM elements
const nameInput = document.getElementById('name');
const nimInput = document.getElementById('nim');
const kelasInput = document.getElementById('kelas');
const alamatInput = document.getElementById('alamat');
const submitBtn = document.getElementById('submit-btn');

const previewName = document.getElementById('preview-name');
const previewKelas = document.getElementById('preview-kelas');
const previewNim = document.getElementById('preview-nim');
const previewAlamat = document.getElementById('preview-alamat');

// Event 1: Update preview on input
nameInput.addEventListener('input', function() {
    previewName.textContent = nameInput.value;
});

nimInput.addEventListener('input', function() {
    previewNim.textContent = nimInput.value;
});

kelasInput.addEventListener('input', function() {
    previewKelas.textContent = kelasInput.value;
});

alamatInput.addEventListener('input', function() {
    previewAlamat.textContent = alamatInput.value;
});

// Event 2: Click submit button to finalize data
submitBtn.addEventListener('click', function(e) {
    e.preventDefault(); // Prevent form submission
    alert('Data telah dikirim!');
});

// Event 3: Focus on input field
nameInput.addEventListener('focus', function() {
    nameInput.style.backgroundColor = '#e6f7ff';
});

// Event 4: Blur event to change background color back
nameInput.addEventListener('blur', function() {
    nameInput.style.backgroundColor = '';
});

// Event 5: Mouseover to change button color
submitBtn.addEventListener('mouseover', function() {
    submitBtn.style.backgroundColor = '#0056b3';
});

submitBtn.addEventListener('mouseout', function() {
    submitBtn.style.backgroundColor = '#007bff';
});