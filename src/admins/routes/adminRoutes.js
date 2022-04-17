const isAuthorized = require("../../../common/middleware/isAuthorized");
const handleValidation = require("../../../common/middleware/validationRequest");
const { addAdmin, confirmAccount, loginAdmin, getAllAdmin, updateAdmin } = require("../controller/adminController");
const { ADD_ADMIN, GET_ADMIN_BY_SUPER, UPDATE_ADMIN } = require("../endPointsAdmin");

const { addAdminSchema, loginAdminSchema } = require("../joi/adminJoi");

const router=require("express").Router();

router.post('/admin',handleValidation(addAdminSchema),isAuthorized(ADD_ADMIN), addAdmin)

router.get('/confirmAcc/:token', confirmAccount)

router.post('/loginAdmin', handleValidation(loginAdminSchema),loginAdmin)

router.get('/admin',isAuthorized(GET_ADMIN_BY_SUPER), getAllAdmin)

router.patch('/admin', isAuthorized(UPDATE_ADMIN),updateAdmin)

module.exports=router;