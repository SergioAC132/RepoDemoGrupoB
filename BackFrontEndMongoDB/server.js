const express=require("express");
const cors=require("cors"); 
const mongoose = require('mongoose');

const Usuario = require("./models/Usuario");

const app=express();
const port=3600;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

mongoose.connect("mongodb://sergioac:Chechorrol@ac-cgbyvyp-shard-00-00.l5sli8p.mongodb.net:27017,ac-cgbyvyp-shard-00-01.l5sli8p.mongodb.net:27017,ac-cgbyvyp-shard-00-02.l5sli8p.mongodb.net:27017/?db=GrupoB&ssl=true&replicaSet=atlas-as79dy-shard-0&authSource=admin&appName=Cluster0")
.then(
    ()=>console.log("MongoDB database service listo")
)
.catch(
    err => console.log(err)
);


app.get("/api/usuarios", async(req, res)=>{
    const usuarios = await Usuario.find();
    res.json(usuarios);
});

app.post("/api/usuarios", async(req, res)=> {
    const nuevo = new Usuario(
        {
            nombre: req.body.nombre,
            email: req.body.email,
            genero: req.body.genero,
            plataformas: req.body.plataformas
        }
    );
    
    const guardado = await nuevo.save();
    res.json(guardado);
});

app.put("/api/usuarios/:id", (req, res)=>{
    const id= parseInt(req.params.id);
    const usuario = registros.find(u => u.id == id);

    if (!usuario) {
        return res.status(404).json({mensaje: "Usuario no encontrado"});
    }

    usuario.nombre = req.body.nombre;
    usuario.email = req.body.email;
    usuario.genero = req.body.genero;
    usuario.plataformas = req.body.plataformas;

    res.json(usuario);
});

app.listen(port, () =>{
    console.log("Listening at http://localhost:3600")
});