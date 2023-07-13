const { MMKV } = require("react-native-mmkv");

function LocalStorage() {
  this.instance = new MMKV();
}
LocalStorage.prototype.setItem = function(key, value) {
  this.instance.set(key, value);
};
LocalStorage.prototype.getItem = function(key) {
  return this.instance.getString(key);
};
LocalStorage.prototype.getNumber = function(key) {
  return this.instance.getNumber(key);
};

LocalStorage.prototype.isOpenedFirstTime = function() {
  return !this.instance.getString("isOpenedFirstTime");
};
LocalStorage.prototype.setOpenedFirstTime = function() {
  this.instance.set("isOpenedFirstTime", "true");
};

LocalStorage.prototype.clear = function() {
  this.instance.clearAll();
};


const localStorage = new LocalStorage();

export default localStorage;
