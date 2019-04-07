import schedule from "node-schedule";

const db = require("../../data/dbConfig");

schedule.scheduleJob({ second: 30 }, async () => {
  //0 0 * * *
  const overdues = await db("checkout")
    .where({ overdue: true })
    .andWhere("lateFee", "<", "10");
  if (overdues) {
    overdues.update("lateFee", "+", "1");
  }
});
