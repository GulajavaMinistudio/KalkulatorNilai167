/**
 * @description Kelas single instance untuk menampung data nilai dan data penghitung, yang dapat dipakai
 * untuk seluruh lingkup project
 */
class SingletonDataNilai {

  public static instances: any;

  // pengali nilai tugas
  public stringPengaliNilaiTugas = '0';
  public stringPengaliNilaiUTS = '0';
  public stringPengaliNilaiUAS = '0';

  // data batas nilai
  public stringBatasNilaiA = '0';
  public stringBatasNilaiB = '0';
  public stringBatasNilaiC = '0';
  public stringBatasNilaiD = '0';

  constructor() {
    if (!SingletonDataNilai.instances) {
      SingletonDataNilai.instances = this;
    }

    return SingletonDataNilai.instances;
  }
}

const singletonInstanceDataNilai = new SingletonDataNilai();
// Object.freeze(singletonInstanceDataNilai);
export { singletonInstanceDataNilai };
