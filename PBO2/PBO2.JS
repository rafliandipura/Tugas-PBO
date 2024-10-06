const sik = {
    kelas : "B",
    angkatan : "2023",
    walidosen: "Bu Jani",
}

console.log(sik.kelas);
console.log(sik.angkatan);
console.log(sik.walidosen);

const siKel = new Object

siKel.atribut1 = "contoh atribut 1"
siKel.atribut2 = "contoh atribut 2"
siKel.atribut3 = "contoh atribut 3"

console.log(siKel.atribut3)

delete siKel.atribut2;

let orang = {
    nama : " Bintang",
    pekerjaan : " Wiraswasta",
    kendaraan : {
        mobil : "Kawasaki Ninja",
        pesawat : "Boeing"

    }

}

console.log(orang.kendaraan.mobil)

orang.kendaraan.mobil = "Pajero Spot"
console.log(orang.kendaraan.mobil)

let tampil = "Nama saya " + orang.nama + ", Saya bekerja sebagai " + orang.pekerjaan + 
"sehari-hari saya terbiasa menggunakan pesawat pribadi dengan jenis " + orang.kendaraan.pesawat

document.getElementById("objek").innerHTML = tampil

let mahasiswa ={
    namaDepan : "Bintang",
    namaBelakang : "Bulan",
    namaLengkap : function (){
        this.namaDepan + " " + this.namaBelakang
    }

}

tampilMhs = "nama saya " + mahasiswa.namaDepan + ", nama lengkap saya adalah " + mahasiswa.namaLengkap()

document.getElementById("objek").innerHTML = tampilMhs

function mahasiswaSIK(nama,kelas,angkatan){
    this.nama = nama,
    this.kelas = kelas,
    this.angkatan = angkatan

}

const mhs1 = new mahasiswaSIK ("Bintang", "B", 2023);
const mhs2 = new mahasiswaSIK ("Bulan", "B", 2023);
const mhs3 = new mahasiswaSIK ("Awan", "B", 2023);
console.log ("nama mahasiswa pertama adalah " + mhs1.nama)
console.log ("nama mahasiswa kedua adalah " + mhs2.nama)
console.log ("nama mahasiswa ketiga adalah " + mhs3.nama)