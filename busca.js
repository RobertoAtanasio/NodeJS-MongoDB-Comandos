var MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';
const dbName = 'db_devmedia';

MongoClient.connect(url, function(erro, client) {
    if(erro)
        console.log("Erro ao estabelecer conexão:" + erro);
    else  
        console.log("Conexão estabelecida com sucesso.");

    const db = client.db(dbName);

    var colecao = db.collection("clientes");   

    // colecao.find({status:"Ativo"}).toArray(function(erro, documentos){
    colecao.find({"endereco.estado":"PE"}).toArray(function(erro, documentos){
        documentos.forEach(function(doc) {
            console.log("_______________________");
            console.log("Codigo: " + doc.codigo);
            console.log("Nome: " + doc.nome);
            console.log("Status: " + doc.status);
            console.log("Estado: " + doc.endereco.estado);
        }, this);
    });

    client.close();
});