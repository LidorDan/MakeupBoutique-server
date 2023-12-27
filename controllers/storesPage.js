const storeService = require("../services/stores");

async function storesPage(req, res) {
  try {
    const stores = await storeService.getAllStores();
    res.send(stores);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function deleteStore(req, res) {
  try {
    const stores = await storeService.deleteStore(req.body.store_id);
    const new_stores = await storeService.getAllStores();
    res.send(new_stores);
  } catch (error) {
    res.status(500).send(error);
  }
}
async function updateStorePhone(req, res) {
  try {
    const stores = await storeService.updateStorePhone(
      req.body.id,
      req.body.new_phone_number
    );
    const new_stores = await storeService.getAllStores();
    res.send(new_stores);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function addStore(req, res) {
  try {
    const stores = await storeService.addStore(
      req.body.city,
      req.body.country,
      req.body.address,
      req.body.phone_number,
      req.body.lat,
      req.body.lon
    );
    const new_stores = await storeService.getAllStores();
    res.send(new_stores);
  } catch (error) {
    res.status(500).send(error);
  }
}
module.exports = { storesPage, deleteStore, updateStorePhone, addStore };
