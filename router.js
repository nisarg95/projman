var express = require("express");
const { response } = require("express");
var router = express.Router();

//const express = require("express");
const userModel = require("./models");
const app = express();

const  credential = {
    email : "nisargvaishnav95@gmail.com",
    password : "Nisarg123"
}

app.post("/add_user", async(req, res) => {
    const user = new userModel(request.body);
    
    try {
        await user.save();
        response.send(user); 
    } catch (error){
        response.status(500).send(error);  
    }
});

app.get("/users", async (req, res) => {
    const users = await userModel.find ({});

        try{
            response.send(users);
        } catch(error) {
            response.status(500).send(error);      
        }
});


// login user
router.post('/login', (req, res)=>{
    if(req.body.email == credential.email && req.body.password == credential.password){
        req.session.user = req.body.email;
        res.redirect('/route/dashboard');
        //res.end("Login Successful.");
    }else{
        res.end("Invalid Username or Password.")
    }
});

// route for dashboard
router.get('/dashboard', (req, res) => {
    if(req.session.user){
        res.render('dashboard', {user : req.session.user})
    }else{
        res.send("Unauthorized User")
    }
})

//router for project details / view details  
router.get('/pdetails', (req, res) => {
    if(req.session.user){
        res.render('pdetails', {user : req.session.user})
    }else{
        res.send("Details not available.")
    }
})

//route for add new project
router.get('/addproj', (req, res) => {
    if(req.session.user){

      
        res.render('addproj', {user : req.session.user})
    }else{
        res.send("Error")
    }
})


router.post('/addproj', (req, res) => {
    if(req.session.user){

        console.log("Project name: ", req.body.p_name);
        console.log("Description: ", req.body.desc);
        console.log("Start date: ", req.body.s_date);
        console.log("Deadline: ", req.body.deadline);
        res.render('addproj', {user : req.session.user})
    }else{
        res.send("Error")
    }
})

// route for logout
router.get('/logout', (req ,res)=>{
    req.session.destroy(function(err){
        if(err){
            console.log(err);
            res.send("Error")
        }else{
            res.render('base', { title: "Login", logout : "Logout Successful."})
        }
    })
})

module.exports = app;
module.exports = router;