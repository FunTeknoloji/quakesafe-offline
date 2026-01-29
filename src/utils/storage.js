const PREFIX = 'qs_';
const SALT = 'quakesafe_secret_2024';

const xorEncrypt = (str) => {
  return btoa(str.split('').map((char, i) =>
    String.fromCharCode(char.charCodeAt(0) ^ SALT.charCodeAt(i % SALT.length))
  ).join(''));
};

const xorDecrypt = (encoded) => {
  try {
    const str = atob(encoded);
    return str.split('').map((char, i) =>
      String.fromCharCode(char.charCodeAt(0) ^ SALT.charCodeAt(i % SALT.length))
    ).join('');
  } catch (e) {
    return null;
  }
};

export const storage = {
  get: (key, defaultValue = null) => {
    try {
      const value = localStorage.getItem(PREFIX + key);
      if (!value) return defaultValue;

      const decrypted = xorDecrypt(value);
      return decrypted ? JSON.parse(decrypted) : defaultValue;
    } catch (e) {
      console.error('Storage get error', e);
      return defaultValue;
    }
  },
  set: (key, value) => {
    try {
      const encrypted = xorEncrypt(JSON.stringify(value));
      localStorage.setItem(PREFIX + key, encrypted);
    } catch (e) {
      console.error('Storage set error', e);
    }
  },
  remove: (key) => {
    localStorage.removeItem(PREFIX + key);
  }
};
