const router=require('express').Router();
const userController=require('../controllers/user.controller');
router.post("/sign-up",userController.register)
router.get("/get-all",userController.getAllUsers)
router.post("/sign-in",userController.login)
module.exports=router