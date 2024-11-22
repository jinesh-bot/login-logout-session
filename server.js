const express=require('express');
const app=express();

const session=require('express-session')
const nocache=require('nocache')

app.use(express.static('public'))

app.set('view engine','hbs');

const username="admin"
const password="admin@123"

app.use(express.urlencoded({extended:true}));

 app.use(express.json())

app.use(session({
    secret:'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

app.use(nocache())

app.get('/',(req,res)=>{
    if(req.session.user){
        res.render('home')
    }else{
        if(req.session.passwordwrong){
            res.render('login',{msg:"invalid credentials" })
           req.session.passwordwrong=false 
        }else{
            res.render('login')
        }
        
    }
    
})

app.post('/verify',(req,res)=>{

    console.log(req.body);

    if(req.body.username===username && req.body.password===password){
        
        req.session.user=req.body.username
        res.redirect('/home')
    }
    else{


      req.session.passwordwrong=true

      res.redirect('/')
    }
})
app.get('/home',(req,res)=>{
    // res.send(req.body.username)
    if(req.session.user){

        res.render('home')
    }else{
        if(req.session.passwordwrong){
            req.session.passwordwrong=false
            res.render('login',{msg:"invalid credentials" })
        }else
        {
            res.render('login')
        } 
      
        
    }

}) 

app.get('/logout',(req,res)=>{

    req.session.destroy()
    res.render('login')
})

app.listen(3003,()=>console.log('server running on port 3003'))
  