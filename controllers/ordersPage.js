const ordersService = require("../services/orders");

async function ordersPage(req, res) {
  try {
    const data = await ordersService.getTotalPriceByMonth();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function totalPriceLastYear(req,res){
  try {
    const data = await ordersService.getTotalPriceLastYear();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
}
module.exports = { ordersPage ,totalPriceLastYear};
