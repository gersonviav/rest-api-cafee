require('./config/config');

const express = require('express');
const mongoose=require('mongoose')
const app = express();
const path= require('path');

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
//habilitar la carpeta public
app.use(express.static(path.resolve(__dirname,'../public')))
//configuracion global de rutass
app.use(require('./routes/index'))


app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
});
mongoose.connect(process.env.urlDB,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology:true}, (err ,res)=>{
    if (err)  throw err ;
    console.log('base de datos online ')
    
    
})