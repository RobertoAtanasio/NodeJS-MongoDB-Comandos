const cliente = {
    codigo: 3,
    nome: "Roberto Pires",
    endereco: {
        logradouro: "Rua Fulano de Tal",
        numero: "123",
        bairro: "Bairro Qualquer",
        cidade: "recife",
        estado: "PE"
    },
    status: "Ativo",
    pontos: 8
};

const inserirDados = (dados, colecao, db, callback) => {
    const collection = db.collection(colecao);
    collection.insertOne(dados, (err, result) => {
        callback(result, err);
    });
}

var MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';
const dbName = 'db_devmedia';

MongoClient.connect(url, function (erro, client) {
    if (erro)
        console.log("Erro ao estabelecer conexão:" + erro);
    else
        console.log("Conexão estabelecida com sucesso.");

    const db = client.db(dbName);

    inserirDados(cliente, 'clientes', db, (result, erro) => {
        if (erro)
            console.log("Erro ao inserir documento: " + erro);
        else {
            console.log("Documento inserido com sucesso");
        }
    });

    client.close();
});