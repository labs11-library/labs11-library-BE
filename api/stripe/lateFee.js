const schedule = require("node-schedule");

const db = require("../../data/dbConfig");

schedule.scheduleJob("5 * * * * *", () => {
  //0 0 * * *
  const overdues = await db("checkout")
    .where({ overdue: true })
    .andWhere("lateFee", "<", "10");
  if (overdues) {
    overdues.update("lateFee", "+", "1");
  }
  console.log("YOOOOOO");
});

// setInterval(() => {
//   console.log("YOOOO");
// }, 1000);
