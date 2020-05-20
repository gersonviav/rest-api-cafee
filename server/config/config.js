// ============================
//  Puerto
// ============================
process.env.PORT = process.env.PORT || 3000;
//entorno
process.env.NODE_ENV=process.env.NODE_ENV || 'dev'
//base de datos
let urlDB;
//if (process.env.NODE_ENV === 'dev') {
//    urlDB = 'mongodb://localhost:27017/cafe'
//} else {
    //admin_cafe
    //XIYRHH6YO2tB79rJ
    urlDB='mongodb+srv://admin_cafe:XIYRHH6YO2tB79rJ@cluster0-mmg6n.mongodb.net/cafe'
//}
process.env.urlDB=urlDB;
