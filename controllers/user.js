
const User = require("../models/user.js");

module.exports.renderSignupForm = (req,res)=>{
    res.render("users/signup");
}

module.exports.signup = async(req,res)=>{
    try{
    let {email , username , password} = req.body;
    const user = new User({email , username});
    const registeredUser = await User.register(user , password);
    console.log(registeredUser);
    req.login(registeredUser , (err)=>{
        if(err){
            req.flash("error" , err.message);
            return res.redirect("/signup");
        }
        req.flash("success" , "Welcome to the wanderlust family");
        return res.redirect("/listings");
    })}
    catch(e){
        req.flash("error" , e.message);
        return res.redirect("/signup");
    }
}


module.exports.renderLoginForm = (req,res)=>{
    res.render("users/login");
}

module.exports.login = async(req,res)=>{
        req.flash("success" , "logged in successfully");
        return res.redirect(res.locals.redirectUrl || "/listings");
    }
    
module.exports.logout = (req,res)=>{
    req.logout((err)=>{
        if(err){
            req.flash("error" , err.message);
            return res.redirect("/listings");
        }
        req.flash("success" , "logged out successfully");
        return res.redirect("/listings");
    }
)
}