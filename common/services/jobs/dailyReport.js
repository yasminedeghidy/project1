const cron = require('node-cron');
const sendEmail = require('../sendEmail');

const dailyReportUser=()=>{
cron.schedule('54 17  * * *', () => {
  console.log(new Date().toISOString());
   sendEmail("dala@gmail.com", "daily report")
});
}

module.exports=dailyReportUser

