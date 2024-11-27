const router=require('express').Router();
const userController=require('../controllers/user.controller');
const {verifyJwt}=require('../middlewares/auth.middleware');
router.post("/sign-up",userController.register)
router.get("/get-all",userController.getAllUsers)
router.post("/sign-in",userController.login);
router.post("/logout",userController.logout);
router.post("/verify-user",verifyJwt,userController.checkAuth);


module.exports=router

