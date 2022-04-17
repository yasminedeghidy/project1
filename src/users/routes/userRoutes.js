const {signUp, verifyAccount, signIn, updateProfile, updatePassword, forgetPassword, resetPassword, reportUser, blockUserByAdmin, deActivate } = require("../controller/userController");

const router=require("express").Router()

const isAuthorized = require("../../../common/middleware/isAuthorized");
const handleValidation= require("../../../common/middleware/validationRequest")
const { UPDATE_PROFILE, UPDATE_PASSWORD, REPORT_USER, BLOCK_USER_BY_ADMIN, DEACTIVATE } = require("../endPoints");
const { updatePasswordSchema, updateProfileSchema, loginSchema, addUserSchema } = require("../joi/userJoi");
const upload = require("../../../common/services/uploadFile");


router.post("/users",upload.single('userImg'),handleValidation(addUserSchema),signUp)

router.get("/verifyAccount/:token",verifyAccount )

router.post('/login',handleValidation(loginSchema), signIn)

router.put('/users', handleValidation(updateProfileSchema),isAuthorized(UPDATE_PROFILE),updateProfile)

router.post('/updatePassword', handleValidation(updatePasswordSchema),isAuthorized(UPDATE_PASSWORD),updatePassword)

router.post('/forgetPassword', forgetPassword)

router.post('/resetPassword', resetPassword)

router.put('/reportUser',isAuthorized(REPORT_USER) ,reportUser)

router.put('/blockByAdmin',isAuthorized(BLOCK_USER_BY_ADMIN),blockUserByAdmin)

router.put('/deActivate',isAuthorized(DEACTIVATE) ,deActivate)
module.exports=router;