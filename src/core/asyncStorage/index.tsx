import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKeyType } from './type';

export default (() => {
  async function get(key: StorageKeyType, defaultValue: any = undefined) {
    let value = defaultValue;
    try {
      const strValue = await AsyncStorage.getItem(key || '');
      if (strValue) value = JSON.parse(strValue);
    } catch (e) {
      /** */
    }
    return value;
  }

  async function getMulti(keys: StorageKeyType[], defaultValue: string[] = []) {
    let value = defaultValue;
    try {
      const arrValue = await AsyncStorage.multiGet(keys);
      value = arrValue.map(arrItem => {
        const [, itemValue] = arrItem;
        return itemValue ? JSON.parse(itemValue) : itemValue;
      });
    } catch (e) {
      /** */
    }
    return value;
  }

  async function set(key: StorageKeyType, value: string | Object) {
    if (!key) {
      if (__DEV__) throw new Error('key not allow empty');
      return;
    }
    try {
      const strValue = JSON.stringify(value);
      if (strValue === 'undefined' || strValue === 'null' || strValue === '[]' || strValue === '{}') {
        if (__DEV__) throw new Error('value not allow empty');
        return;
      }
      if (strValue === '' || strValue) {
        await AsyncStorage.setItem(key || '', strValue);
      }
    } catch (e) {
      /** */
    }
  }

  async function remove(key: StorageKeyType) {
    try {
      await AsyncStorage.removeItem(key || '');
    } catch (e) {
      /** */
    }
  }

  async function removeMulti(keys: StorageKeyType[]) {
    try {
      if (!keys || keys.length === 0) return;
      await AsyncStorage.multiRemove(keys);
    } catch (e) {
      /** */
    }
  }

  return {
    get,
    getMulti,
    set,
    remove,
    removeMulti,
  };
})();
