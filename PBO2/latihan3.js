// Kelas SensorPasut dengan tambahan metode dan properti baru
class SensorPasut {
    constructor(nama, lokasi) {
        this.nama = nama;
        this.lokasi = lokasi;
        this._status = "Nonaktif";
        this._baterai = 100; // Kapasitas baterai sensor dalam persen
    }

    aktifkan() {
        this._status = "Aktif";
        return `Sensor ${this.nama} di ${this.lokasi} telah diaktifkan.`;
    }

    nonaktifkan() {
        this._status = "Nonaktif";
        return `Sensor ${this.nama} di ${this.lokasi} telah dinonaktifkan/dimatikan.`;
    }

    getStatus() {
        return `Status Sensor ${this.nama} di ${this.lokasi} sedang ${this._status}.`;
    }

    cekLatihanKapal() {
        return `Latihan kapal sedang berlangsung di sekitar lokasi sensor ${this.nama}.`;
    }

    cekKondisiCuaca(cuaca) {
        return `Kondisi cuaca di ${this.lokasi} adalah ${cuaca}.`;
    }

    // Metode baru 1: cekBaterai
    cekBaterai() {
        return `Kapasitas baterai sensor ${this.nama} adalah ${this._baterai}%.`;
    }

    // Metode baru 2: kalibrasi
    kalibrasi() {
        this._baterai -= 5; // Mengurangi kapasitas baterai karena kalibrasi
        return `Sensor ${this.nama} di ${this.lokasi} telah dikalibrasi. Baterai tersisa: ${this._baterai}%.`;
    }
}

// Kelas Kapal dengan penambahan properti dan metode baru
class Kapal {
    constructor(nama, jenis, kapasitas, panjang, lebar, kecepatan = 0) {
        this.nama = nama;
        this.jenis = jenis;
        this.kapasitas = kapasitas;
        this.panjang = panjang;
        this.lebar = lebar;
        this.kecepatan = kecepatan; // Kecepatan dalam km/jam
        this.operasional = false; // Status operasional kapal
    }

    infoKapal() {
        return `Kapal ${this.nama} berjenis ${this.jenis} dengan kapasitas ${this.kapasitas} orang, memiliki panjang ${this.panjang} meter dan lebar ${this.lebar} meter.`;
    }

    // Metode baru 1: ubahKecepatan
    ubahKecepatan(kecepatanBaru) {
        this.kecepatan = kecepatanBaru;
        return `Kecepatan kapal ${this.nama} sekarang adalah ${this.kecepatan} km/jam.`;
    }

    // Metode baru 2: statusOperasional
    statusOperasional() {
        this.operasional = !this.operasional; // Ubah status operasional
        return `Kapal ${this.nama} sekarang ${this.operasional ? "sedang beroperasi" : "tidak beroperasi"}.`;
    }
}

// Kelas InfoTiket yang meng-extend Kapal
class InfoTiket extends Kapal {
    constructor(nama, jenis, kapasitas, panjang, lebar, jumlahTiket) {
        super(nama, jenis, kapasitas, panjang, lebar);
        this.jumlahTiket = jumlahTiket;
    }

    cekTiketTersedia() {
        return this.jumlahTiket > 0 ? "Tiket tersedia." : "Tiket habis.";
    }

    beliTiket(jumlah) {
        if (this.jumlahTiket >= jumlah) {
            this.jumlahTiket -= jumlah;
            return `${jumlah} tiket berhasil dibeli. Tiket tersisa: ${this.jumlahTiket}.`;
        } else {
            return "Jumlah tiket tidak mencukupi.";
        }
    }
}

// Contoh penggunaan
let sensorMerak = new SensorPasut("Selat Sunda", "Merak");
console.log(sensorMerak.aktifkan());
console.log(sensorMerak.cekBaterai());
console.log(sensorMerak.kalibrasi());

let ferryKapal = new InfoTiket("Ferry Express", "Penumpang", 500, 100, 30, 200);
console.log(ferryKapal.infoKapal());
console.log(ferryKapal.ubahKecepatan(25));
console.log(ferryKapal.statusOperasional());
console.log(ferryKapal.cekTiketTersedia());
console.log(ferryKapal.beliTiket(50));
