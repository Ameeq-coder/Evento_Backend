const {sendVerificationEmail,verifyCode} = require("../controller/verificationemailcontroller")


const router=require('express').Router()


router.route('/sendverification').post(sendVerificationEmail)
router.route('/verifycode').post(verifyCode)



module.exports=router;