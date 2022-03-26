const { User } = require('../models/User');

let auth = (req, res, next) => {
    //로그인 할때 token을 cookie에 저장함 
    let token = req.cookies.x_auth;

    User.findByToken(token, (err, user) => {
        if(err) throw err;
        if(!user) return res.json({isAuth: false, error: true})

        /*app.get('/api/users/auth', auth, (req,res)=>{ ... }) 여기서 req로 token과 user 가져올 수 있음*/
        req.token = token;
        req.user = user;
        next();
    })
}

module.exports = { auth };