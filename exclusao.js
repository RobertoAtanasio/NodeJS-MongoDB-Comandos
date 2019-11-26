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

    colecao.deleteMany({status : "Inativo"}, (erro, resultado) => {
      if(erro)
          console.log("Erro ao excluir documento: " + erro);
      else    
          console.log("Documento excluído com sucesso");
    });

    client.close();
});