export interface IStorageItem {
  key: string;
  value: any;
}

export class StorageItem {

  key: string;
  value: any;

  constructor(data: IStorageItem) {
    this.key = data.key;
    this.value = data.value;
  }
}
