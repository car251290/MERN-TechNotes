const express = require('express');
const app = express();
const path = require('path');
const {logger} = require('./middleware/logger')
const errorHandler = require('./middleware/erroHandler')
const cookieParser = require('cookie-parser');
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const PORT = process.env.PORT|| 3500;
app.use(express.json())
app.use(logger);
app.use(cookieParser());
app.use(cors(corsOptions));


//app.use('/',express.static(path.join(_dirname,'/public')))
app.use(express.static('public'))

app.use('/',require('./routes/root'))

app.all('*',(req,res)=> {
    res.status(404)
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname,'views','404.html'))
    } else if(req.accepte('json')){
        res.json({message:'404 not found'})
    } else {
        res.type('txt').send('404 not found')
    }
})
app.use(errorHandler);
app.listen(PORT, () =>  console.log(`Sever is running on port ${PORT}`))
