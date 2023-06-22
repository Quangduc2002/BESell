const { request } = require('express');
const User = require('../models/User');

class userController {

    // [POST] user/register
    async Register(req, res, next) {
        User.findOne({})
        .sort({_id: 'desc'})
        .then(latesCourse => {
            // id tự tăng
          req.body._id = latesCourse._id + 1;
          const user = new User(req.body)
          user.save()
              .then(() => res.status(200).json())
              .catch(() => res.status(500).json())
        })
           
    }

    // [GET] user/Customer
    async getCustomer(req, res ) {
        try {
            const save = await User.find({RoleId: 1})
            res.status(200).json(save)
        } catch (error) {
            console.log(error);
        }
    }

    // [DELETE] user/:id/Customer
    async DelCustomer(req, res) {
        try {
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json("delete success")
        } catch (error) {
            console.log(error);
        }
    }

    // [POST] user/login
    async handleLogin  (req, res) {
        let email = req.body.Email;
        let password = req.body.PassWord;

        if (!email || !password) {
            return res.status(500).json({
                errCode: 1,
                message: "Missing inputs parameter !"
            })
        }


         let  handleUserLogin = (email, password) => {
            return new Promise(async (resolve, reject) => {
                try {
                    let userData = {};
                    let isExist = await chekUserEmail(email);
                    if(isExist){
                        let user = await User.findOne({ 
                            Email: email
                        });
                        // check user có tồn tại hay không
                        if(user){
                            //compare password
                            // let check = await bcrypt.compareSync(password, user.PassWord);

                            let getUser = {
                                Email: user.Email,
                                Name: user.Name,
                                RoleId: user.RoleId,
                                DateOfBirth: user.DateOfBirth
                              };
                            if(password === user.PassWord){
                                userData.errCode = 0;
                                userData.errMessage = "OK";
                                userData.user = getUser;
                                return res.status(200).json({
                                    errCode: userData.errCode,
                                    message: userData.errMessage,
                                    user: userData.user ? userData.user : {}
                                })
                            }else{
                                userData.errCode = 3;
                                userData.errMessage = "Wrong password";
                                return res.status(500).json()
                            }
                        }else{
                            userData.errCode = 2;
                            userData.errMessage = `User's not found`;
                            return res.status(500).json()
                        }
                    }else{
                        userData.errCode = 1;
                        userData.errMessage = `your's email isn't exist in your system`
                        return res.status(500).json()
                    }
                    // resolve(userData)
                } catch (e) {
                    reject(e);
                }
            })
        }

            //check email
            let chekUserEmail = (userEmail) =>{
                return new Promise(async (resolve, reject) => {
                    try {
                        let user = await User.findOne({ 
                            Email: userEmail
                        })
            
                        if(user){
                            resolve(true); // return
                        }
                        else{
                            resolve(false);
                        }
                    } catch (e) {
                        reject(e);
                    }
                })
            }

            
        let userData = await handleUserLogin(email, password)
    }
}

module.exports = new userController();