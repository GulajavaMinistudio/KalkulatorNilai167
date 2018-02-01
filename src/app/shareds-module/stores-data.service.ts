import { Injectable } from '@angular/core';
import { StorageItem } from './local-storages/storage-item';

@Injectable()
export class StoresDataService {

  isLocalStorageSupported = false;

  constructor() {
    this.checkLocalStorageCompatible();
  }

  /**
   * @description cek apakah browser mendukung local storage API atau tidak
   **/
  checkLocalStorageCompatible() {
    this.isLocalStorageSupported = typeof window['localStorage'] !== 'undefined' && window['localStorage'] !== null;
  }

  /**
   * @description ambil instance dari local storage
   * @returns nilai balikan berupa local storage
   */
  getLocalStorage(): any {
    return window.localStorage;
  }

  /**
   * @description tambahkan data dengan key tertentu ke dalam local storage kemudian simpan
   *
   * @param keyData yang akan ditambahkan
   *
   * @param itemData data yang ingin ditambahkan
   *
   * @return void Data balikan tidak ada
   **/
  addDataLocalStorage(keyData: string, itemData: string) {

    if (this.isLocalStorageSupported) {
      this.getLocalStorage().setItem(keyData, itemData);
    }
  }

  // get all values from storage (all items)
  /**
   * @description ambil semua nilai yang tersimpan di local storage data
   * @return Array<StorageItem> array key dan isi key data yang tersimpan di dalam local storage
   **/
  getAllDataItems(): Array<StorageItem> {

    const list = [];
    const localStorageLength = localStorage.length;

    for (let i = 0; i < localStorageLength; i++) {
      const key = this.getLocalStorage().key(i);
      const value = this.getLocalStorage().getItem(key);

      list.push(
        new StorageItem({
          key: key,
          value: value
        }));
    }

    return list;
  }


  /**
   @description Ambil semua isi data yang tersimpan di dalam local storage
   @return Array<any> array isi data yang diambil dari masing-masing key
   **/
  getAllValuesData(): Array<any> {

    const list = [];
    const localStorageLength = localStorage.length;

    for (let i = 0; i < localStorageLength; i++) {
      const key = this.getLocalStorage().key(i);
      const value = this.getLocalStorage().getItem(key);

      list.push(value);
    }
    return list;
  }


  /**
   @description Ambil data dengan key tertentu dari local storage
   @param keyData key atau kata kunci dari data yang disimpan di local storage
   @return string Nilai balikan berupa data dengan key yang dipilih, dalam bentuk string
   **/
  getDataWithKey(keyData: string): any {

    let data: any;

    if (this.isLocalStorageSupported) {
      data = this.getLocalStorage().getItem(keyData);
    } else {
      data = null;
    }

    return data;
  }


  /**
   * @description Hapus data di local storage dengan key kunci tertentu
   * Also, check out {@link http://www.google.com|Google}
   * @see http://www.google.com|Google
   * @param keyData key atau kata kunci dari data yang disimpan di local storage
   **/
  removeDataWithKey(keyData: string) {

    if (this.isLocalStorageSupported) {
      this.getLocalStorage().remove(keyData);
    }
  }


  /**
   * @description Hapus semua data yang tersimpan di dalam local storage
   **/
  clearDataLocalStorage() {

    if (this.isLocalStorageSupported) {
      this.getLocalStorage().clear();
    }
  }
}
