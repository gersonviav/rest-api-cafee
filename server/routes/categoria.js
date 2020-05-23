const express=require('express')
let {verificaToken,verificaAdmin_Role} =require ('../middlewares/authenticacion');
let app = express();
let Categoria = require('../models/categoria')
//mostrar todas las categorias 
app.get('/categoria',(req,res)=>{
    Categoria.find({})
    .sort('descripcion')
    .populate('usuario','nombre email')
    .exec((err,categorias)=>{
        if(err){
            return res.status(500).json({
                ok :false,
                err
            });
        }
        res.json({
            ok: true,
            categorias
        })
    })
});
//busca una categoria
app.get('/categoria/:id',(req,res)=>{
    let id =req.params.id;

    Categoria.findById(id, (err,categoriaDB)=>{
        if (err) {
            return res.status(500).json({
                ok : false,
                err
            })
        }
        if (!categoriaDB){
            return res.status(400).json({
                ok : false,
                message:'El id no es correcto'
            })
        }
        res.json({
            ok:true,
            categoria : categoriaDB

        })
    })
    
})
//crear una nueva categoria
app.post('/categoria',verificaToken,(req,res)=>{
    //regresa la nueva categoria
    //req.usuario._id
    let body = req.body;
    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario:req.usuario._id,

    });
    categoria.save((err,categoriaDB)=>{
        if (err) {
            return res.status(500).json({
                ok : false,
                err
            })
        }
        if (!categoriaDB){
            return res.status(400).json({
                ok : false,
                err
            })
        }
        res.json({
            ok:true,
            categoria : categoriaDB

        })

    })


})
///actualizar categoria
app.put('/categoria/:id',verificaToken,(req,res)=>{
    let id =req.params.id;
    let body =req.body;
    let descCategoria = {
        descripcion :body.descripcion
    };
    Categoria.findByIdAndUpdate(id , descCategoria, {new :true ,runValidators:true},(err,categoriaDB)=>{
        if (err) {
            return res.status(500).json({
                ok : false,
                err
            })
        }
        if (!categoriaDB){
            return res.status(400).json({
                ok : false,
                err
            })
        }
        res.json({
            ok:true,
            categoria : categoriaDB

        }) 
    })
})
//elminar las categorias
app.delete('/categoria/:id',[verificaToken,verificaAdmin_Role],(req,res)=>{
    //solo la puede borrar una administrados puede borrar categorias 
    //Categoria.find
    let id = req.params.id;
    Categoria.findByIdAndRemove( id ,(err,categoriaDB)=>{
        if (err) {
            return res.status(500).json({
                ok : false,
                err
            })
        }
        if (!categoriaDB){
            return res.status(400).json({
                ok : false,
                err :{
                    message :'el id no existe'
                }
            })
        }
        res.json({
            ok:true,
            message : 'Categoria borrada'

        })
    })
})



module.exports=app;