const express = require("express"); 
const path = require("path");  
const bcrypt = require("bcrypt");
const LoginCollection = require("./connect");
const WinnerCollection = require("./payment_form_connect");

const app = express();

app.use(express.json()); 
app.use(express.urlencoded({extended: false}));

const static = path.join(__dirname, '../public');
app.use(express.static(static));


app.get("/", (req, res) => {
    res.sendFile(path.join(static, 'login.html'));
});
app.get("/signup", (req, res) => {
    res.sendFile(path.join(static, 'signup.html'));
});
app.get("/payment_form", (req, res) => {
    res.sendFile(path.join(static, 'payment_form.html'));
});



// SignUp - Register user
app.post("/signup", async(req,res)=>{
    const data = {
        name: req.body.username,
        password: req.body.password
    }

    try {
        const existingUser = await LoginCollection.findOne({ name: data.name });

        if (existingUser) {
            res.status(400).send("User already exists. Please choose a different username");
        } else {
            const saltRounds = 10;
            const hashPassword = await bcrypt.hash(data.password, saltRounds);
            data.password = hashPassword;

            const userdata = await LoginCollection.create(data);
            console.log(userdata);
            res.status(201).send("User registered successfully");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error or Database Issue");
    }
});



// Login User
app.post("/login", async(req,res)=>{
    try{
        const check = await LoginCollection.findOne({name: req.body.username});
        if(!check){
            res.send("User cannot be found. Run Code in Vs-Code Again");
        }

        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
        if(isPasswordMatch){
            res.sendFile(path.join(static, 'home.html'));
        }
        else{ 
            res.send("Password Incorrect");
        }
    }
    
    catch{
        res.send("Server Error or Database Issue");
    }

});


// Payment form 
app.post("/payment_form", async (req, res) => {
    const data = {
        amount: req.body.amount,
        name_of_card_holder: req.body.name_of_card_holder,
        card_number: req.body.card_number,
        card_expiry: req.body.card_expiry,
        cvv: req.body.cvv,
        phone_no: req.body.phone_no,
        address: req.body.address        
    };

    const savedWinner = await WinnerCollection.insertMany(data);    
    console.log(savedWinner);
    res.send("Payment successfully!");
    
});

const port = 5000;
app.listen(port,()=>{
    console.log(`Server running on Port no. ${port}`);
});