const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const app = express();

const uri = "mongodb+srv://felipe:teste@cluster0.qv2cgic.mongodb.net/?retryWrites=true&w=majority&appName=bancoCRUD";

MongoClient.connect(uri, { useUnifiedTopology: true })
    .then(client => {
        console.log('Conectado ao MongoDB Atlas');
        const db = client.db('bancoCRUD');
        const collection = db.collection('usuarios');

        app.use(bodyParser.urlencoded({ extended: true }));
        app.set('view engine', 'ejs');

        app.get('/', (req, res) => {
            res.render('index.ejs');
        });

        app.post('/formulario', (req, res) => {
            collection.insertOne(req.body)
                .then(result => {
                    console.log('Documento salvo com sucesso!');
                    res.redirect('/');
                })
                .catch(err => console.error('Erro ao salvar documento:', err));
        });

        app.listen(3000, () => {
            console.log('Servidor rodando na porta 3000');
        });
    })
    .catch(err => console.error('Erro ao conectar ao MongoDB:', err));
