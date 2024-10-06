class Kapal {
    constructor(nama,jenis,kapasitas,panjang,lebar){
        this.nama = nama;
        this.jenis = jenis;
        this.kapasitas = kapasitas;
        this.panjang = panjang;
        this.lebar = lebar;
    }

    infoKapal(){
        return 'kapal ini bernama ${this.nama} yang berjenis ${this.jenis} dengan kapasitas ${this.kapasitas} memiliki dimensi ${this.panjang} x ${this.lebar}';

    }
    
}

let kapalPenumpang = new Kapal("ell","Ferry", 500, 200, 100);
console.log(kapalPenumpang.infoKapal());
document.getElementById("objek").innerHTML = kapalPenumpang.infoKapal()