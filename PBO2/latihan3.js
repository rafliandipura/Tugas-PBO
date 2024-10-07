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

    cekBaterai() {
        return `Kapasitas baterai sensor ${this.nama} adalah ${this._baterai}%.`;
    }

    kalibrasi() {
        this._baterai -= 5;
        return `Sensor ${this.nama} di ${this.lokasi} telah dikalibrasi. Baterai tersisa: ${this._baterai}%.`;
    }
}

// Kelas SensorSuhu yang meng-extend SensorPasut
class SensorSuhu extends SensorPasut {
    cekSuhu() {
        return `Suhu di lokasi sensor ${this.nama} adalah 28°C.`;
    }
}

// Kelas SensorKelembaban yang meng-extend SensorPasut
class SensorKelembaban extends SensorPasut {
    cekKelembaban() {
        return `Kelembaban di lokasi sensor ${this.nama} adalah 60%.`;
    }
}

// Kelas Kapal
class Kapal {
    constructor(nama, jenis, kapasitas, panjang, lebar, kecepatan = 0) {
        this.nama = nama;
        this.jenis = jenis;
        this.kapasitas = kapasitas;
        this.panjang = panjang;
        this.lebar = lebar;
        this.kecepatan = kecepatan;
        this.operasional = false;
    }

    infoKapal() {
        return `Kapal ${this.nama} berjenis ${this.jenis} dengan kapasitas ${this.kapasitas} orang, memiliki panjang ${this.panjang} meter dan lebar ${this.lebar} meter.`;
    }

    ubahKecepatan(kecepatanBaru) {
        this.kecepatan = kecepatanBaru;
        return `Kecepatan kapal ${this.nama} sekarang adalah ${this.kecepatan} km/jam.`;
    }

    statusOperasional() {
        this.operasional = !this.operasional;
        return `Kapal ${this.nama} sekarang ${this.operasional ? "sedang beroperasi" : "tidak beroperasi"}.`;
    }
}

// Kelas KapalPenumpang yang meng-extend Kapal
class KapalPenumpang extends Kapal {
    constructor(nama, kapasitas, panjang, lebar, jumlahDeck) {
        super(nama, "Penumpang", kapasitas, panjang, lebar);
        this.jumlahDeck = jumlahDeck;
    }

    infoKapal() {
        return `Kapal Penumpang ${this.nama} memiliki ${this.jumlahDeck} deck dengan kapasitas ${this.kapasitas} penumpang.`;
    }
}

// Kelas KapalKargo yang meng-extend Kapal
class KapalKargo extends Kapal {
    constructor(nama, kapasitas, panjang, lebar, tonase) {
        super(nama, "Kargo", kapasitas, panjang, lebar);
        this.tonase = tonase;
    }

    infoKapal() {
        return `Kapal Kargo ${this.nama} memiliki kapasitas muatan ${this.tonase} ton dan panjang ${this.panjang} meter.`;
    }
}

// Polimorfisme melalui kelas InfoTiket yang juga meng-extend Kapal
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

// Polimorfisme di sini
let sensorArray = [
    new SensorPasut("Selat Sunda", "Merak"),
    new SensorSuhu("Teluk Jakarta", "Jakarta"),
    new SensorKelembaban("Pantai Kuta", "Bali")
];

sensorArray.forEach(sensor => {
    console.log(sensor.aktifkan());
    console.log(sensor.cekBaterai());
    if (sensor instanceof SensorSuhu) {
        console.log(sensor.cekSuhu());
    } else if (sensor instanceof SensorKelembaban) {
        console.log(sensor.cekKelembaban());
    }
});

let kapalArray = [
    new KapalPenumpang("Ferry Express", 500, 100, 30, 3),
    new KapalKargo("Logistics King", 20, 200, 40, 10000),
    new InfoTiket("Sea Cruiser", "Penumpang", 200, 150, 20, 100)
];

kapalArray.forEach(kapal => {
    console.log(kapal.infoKapal());
    console.log(kapal.ubahKecepatan(40));
    console.log(kapal.statusOperasional());
});
