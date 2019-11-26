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

    // $set - insere ou atualiza o campo do registro
    // $unset - retira o campo do registro

    // colecao.updateOne({codigo : 1}, {$unset : { ponto : 0}}, (erro, resultado) => {
    // colecao.updateOne({codigo : 1}, {$set : { "endereco.numero": "72"}}, (erro, resultado) => {
    colecao.updateOne({codigo : 1}, {$inc : { pontos: 1 }}, (erro, resultado) => {
      if(erro)
          console.log("Erro ao atualizar documento: " + erro);
      else 
          console.log("Documento atualizado com sucesso");
    });

    client.close();
});