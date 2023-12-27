const Store = require("../models/store");

async function getStore(storeId) {
  const store = await Store.findOne({ _id: storeId });
  return product;
}
async function getAllStores() {
  const store = await Store.find({});
  return store;
}

async function deleteStore(store_id) {
  const store = await Store.deleteOne({ _id: store_id });
}

async function updateStorePhone(id, new_phone) {
  const filter = { _id: id };
  const update = { phone_number: new_phone };
  const store = await Store.findOneAndUpdate(filter, update);
}

async function addStore(
  city,
  country,
  address,
  phone_number,
  latitude,
  longitude
) {
  const store = new Store({
    address: address,
    city: city,
    country: country,
    phone_number: phone_number,
    lat: latitude,
    lon: longitude,
  });
  await store.save();
}

module.exports = { getAllStores, deleteStore, updateStorePhone, addStore };
