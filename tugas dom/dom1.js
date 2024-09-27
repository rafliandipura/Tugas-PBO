// Membuat elemen DOM untuk form
document.addEventListener("DOMContentLoaded", function () {
    // Buat judul
    const title = document.createElement('h2');
    title.textContent = "Kuis Mahasiswa";
    document.body.appendChild(title);

    // Buat form
    const form = document.createElement('form');
    form.id = "quizForm";
    document.body.appendChild(form);

    // Fungsi pembuat elemen form dengan label
    function createInput(labelText, inputType, inputId, placeholder) {
        const formGroup = document.createElement('div');
        formGroup.className = "form-group";

        const label = document.createElement('label');
        label.setAttribute('for', inputId);
        label.textContent = labelText;

        const input = document.createElement('input');
        input.type = inputType;
        input.id = inputId;
        input.name = inputId;
        input.placeholder = placeholder || '';
        input.required = true;

        formGroup.appendChild(label);
        formGroup.appendChild(input);
        form.appendChild(formGroup);
    }

    // Pertanyaan Nama
    createInput("Nama:", "text", "nama", "Masukkan Nama Anda");

    // NIM
    createInput("NIM:", "text", "nim", "Masukkan NIM");

    // Alamat
    createInput("Alamat:", "text", "alamat", "Masukkan Alamat Anda");

    // Email
    createInput("Email:", "email", "email", "Masukkan Email Anda");

    // Nomor Telepon
    createInput("Nomor Telepon:", "tel", "telepon", "Masukkan Nomor Telepon Anda");

    // Tanggal Lahir
    createInput("Tanggal Lahir:", "date", "tanggalLahir");

    // Program Studi
    const programStudiGroup = document.createElement('div');
    programStudiGroup.className = "form-group";
    const programStudiLabel = document.createElement('label');
    programStudiLabel.textContent = "Program Studi:";
    programStudiLabel.setAttribute('for', 'programStudi');
    
    const programStudiSelect = document.createElement('select');
    programStudiSelect.id = 'programStudi';
    programStudiSelect.name = 'programStudi';
    programStudiSelect.required = true;

    const options = ["Pilih Program Studi", "Logistik Kelautan", "Pendidikan Kelautan dan Perikanan", "Sistem Informasi Kelautan", "PGSD", "PGPAUD"];
    options.forEach(optionText => {
        const option = document.createElement('option');
        option.value = optionText;
        option.textContent = optionText;
        programStudiSelect.appendChild(option);
    });

    programStudiGroup.appendChild(programStudiLabel);
    programStudiGroup.appendChild(programStudiSelect);
    form.appendChild(programStudiGroup);

    // Jenis Kelamin
    const jenisKelaminGroup = document.createElement('div');
    jenisKelaminGroup.className = "form-group";
    const jenisKelaminLabel = document.createElement('label');
    jenisKelaminLabel.textContent = "Jenis Kelamin:";
    
    const lakiLaki = document.createElement('input');
    lakiLaki.type = 'radio';
    lakiLaki.id = 'lakiLaki';
    lakiLaki.name = 'jenisKelamin';
    lakiLaki.value = 'Laki-laki';
    lakiLaki.required = true;
    const lakiLakiLabel = document.createElement('label');
    lakiLakiLabel.textContent = "Laki-laki";
    
    const perempuan = document.createElement('input');
    perempuan.type = 'radio';
    perempuan.id = 'perempuan';
    perempuan.name = 'jenisKelamin';
    perempuan.value = 'Perempuan';
    perempuan.required = true;
    const perempuanLabel = document.createElement('label');
    perempuanLabel.textContent = "Perempuan";
    
    jenisKelaminGroup.appendChild(jenisKelaminLabel);
    jenisKelaminGroup.appendChild(lakiLaki);
    jenisKelaminGroup.appendChild(lakiLakiLabel);
    jenisKelaminGroup.appendChild(perempuan);
    jenisKelaminGroup.appendChild(perempuanLabel);
    form.appendChild(jenisKelaminGroup);

    // Hobi
    const hobiGroup = document.createElement('div');
    hobiGroup.className = "form-group";
    
    // Menambahkan judul hobi
    const hobiTitle = document.createElement('h3');
    hobiTitle.textContent = "Hobi";
    hobiTitle.style.marginBottom = '10px'; // Margin bawah untuk spacing
    hobiGroup.appendChild(hobiTitle); // Tambahkan judul ke dalam group hobi

    const hobiList = [
        { id: 'bermainGame', label: 'Bermain Game' },
        { id: 'nontonFilm', label: 'Nonton Film dan Sepakbola' },
        { id: 'memancing', label: 'Memancing' },
        { id: 'tidur', label: 'Tidur' }
    ];

    hobiList.forEach(hobi => {
        const hobiInput = document.createElement('input');
        hobiInput.type = 'checkbox';
        hobiInput.id = hobi.id;
        hobiInput.name = 'hobi';
        hobiInput.value = hobi.label;

        const hobiInputLabel = document.createElement('label');
        hobiInputLabel.textContent = hobi.label;
        hobiInputLabel.setAttribute('for', hobi.id);

        const hobiContainer = document.createElement('div');
        hobiContainer.className = 'hobi-checkbox';
        hobiContainer.appendChild(hobiInput);
        hobiContainer.appendChild(hobiInputLabel);
        hobiGroup.appendChild(hobiContainer);
    });

    form.appendChild(hobiGroup);

    // Hobi Lain
    createInput("Hobi Lain:", "text", "hobiLain", "Masukkan hobi lain jika ada");

    // Motivasi Kuliah
    createInput("Motivasi Kuliah:", "text", "motivasiKuliah", "Masukkan motivasi kuliah Anda");

    // Tombol Submit
    const submitButton = document.createElement('button');
    submitButton.type = "submit";
    submitButton.textContent = "Kirim";
    form.appendChild(submitButton);

    // Tombol Reset
    const resetButton = document.createElement('button');
    resetButton.type = "reset";
    resetButton.textContent = "Reset";
    resetButton.className = "btn-reset";
    form.appendChild(resetButton);

    // Output
    const output = document.createElement('div');
    output.id = "output";
    document.body.appendChild(output);

    // Submit Event: Terjadi saat form disubmit.
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const formData = new FormData(form);
        let result = "Data yang dikirim:\n";

        formData.forEach((value, key) => {
            result += `${key}: ${value}\n`;
        });

        output.textContent = result.replace(/\\n/g, '\n');
    });

    // Event listener untuk input focus
    const inputs = form.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('focus', function () {
            this.style.borderColor = '#4a4a8d'; // Mengubah warna border saat fokus
        });

        input.addEventListener('blur', function () {
            this.style.borderColor = '#ddd'; // Mengembalikan warna border saat blur
        });
    });

    // Event listener untuk perubahan pada checkbox
    hobiList.forEach(hobi => {
        const hobiInput = document.getElementById(hobi.id);
        hobiInput.addEventListener('change', function () {
            if (this.checked) {
                console.log(`${hobi.label} terpilih`);
            } else {
                console.log(`${hobi.label} tidak terpilih`);
            }
        });
    });

    // Event listener untuk perubahan pada select
    programStudiSelect.addEventListener('change', function () {
        console.log(`Program Studi yang dipilih: ${this.value}`);
    });

    // Event listener untuk reset form
    resetButton.addEventListener('click', function () {
        console.log('Form telah direset');
        output.textContent = ''; // Menghapus output
    });

    // Event listener untuk input nama
    const namaInput = document.getElementById('nama');
    namaInput.addEventListener('input', function () {
        console.log(`Nama saat ini: ${this.value}`);
    });
});
