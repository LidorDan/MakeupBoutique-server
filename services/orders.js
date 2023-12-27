const Order = require("../models/orders");

async function getTotalPriceByMonth() {
  const data = await Order.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date("2022-01-01"),
          $lt: new Date("2023-01-01"),
        },
      },
    },
    {
      $group: {
        _id: { month: { $month: "$createdAt" } },

        Sum: { $sum: { $toInt: "$totalPrice" } },
      },
    },
    {
      $sort: { "_id.month": 1 },
    },
  ]);
  return data;
}

async function getTotalPriceLastYear() {
  const data = await Order.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date("2021-01-01"),
          $lt: new Date("2022-01-01"),
        },
      },
    },
    {
      $group: {
        _id: { month: { $month: "$createdAt" } },

        Sum: { $sum: { $toInt: "$totalPrice" } },
      },
    },
    {
      $sort: { "_id.month": 1 },
    },
  ]);
  return data;
}

module.exports = {
  getTotalPriceByMonth,
  getTotalPriceLastYear,
};
