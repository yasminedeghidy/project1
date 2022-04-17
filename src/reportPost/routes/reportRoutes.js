const isAuthorized = require("../../../common/middleware/isAuthorized");
const { reportPost } = require("../controller/reportController");
const { REPORTED_POST } = require("../endPointReport");

const router=require("express").Router();

router.post('/report', isAuthorized(REPORTED_POST),reportPost)
module.exports=router;