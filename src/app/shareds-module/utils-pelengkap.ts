class UtilanPelengkap {

  /**
   * @description Cek apakah string bernilai kosong ataupun null
   * @param str nilai dalam bentuk string
   * @return {boolean} true jika string adalah kosong atau  null, false jika tidak
   */
  isEmptyStringsNulls(str): boolean {
    let booleanIsTrue = false;
    if (!str || str.trim().length === 0) {
      booleanIsTrue = true;
    }
    return booleanIsTrue;
  }


  /**
   * @description Cek apakah bilangan adalah nilai valid bentuk number Float atau tidak
   * @param str nilai dalam bentuk string
   * @return {boolean} true jika benar, false jika nilai tidak valid
   */
  isValidNumberFloatBenar(str): boolean {

    let booleanIsTrue = false;
    if (str) {
      if (str.trim().length > 0) {
        const numberFloat = parseFloat(str);
        booleanIsTrue = numberFloat >= 0.0;
      } else {
        booleanIsTrue = false;
      }
    } else {
      booleanIsTrue = false;
    }
    return booleanIsTrue;
  }
}

export { UtilanPelengkap };
