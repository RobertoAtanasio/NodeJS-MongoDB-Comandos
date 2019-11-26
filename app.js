//--- inserir coleção 'documents'

const usuarios = [
    { login: "Roberto", senha: "123" },
    { login: "Katia", senha: "123" },
    { login: "Gabriel", senha: "123" },
    { login: "Teste1", senha: "123" },
    { login: "Teste2", senha: "123" }
]

const inserirDados = (dados, colecao, db, callback) => {
    const collection = db.collection(colecao);
    collection.insertMany(dados, (err, result) => {
        // assert.equal(err, null);
        // if (err)
        //     console.log("Erro ao inserir documento: " + err);
        // else
        //     console.log(`Inseridos ${result.result.n} documentos na coleção`);
        callback(result, err);
    });
}

const insertDocuments = function (db, callback) {

    const collection = db.collection('documents');

    collection.insertMany(usuarios, (err, result) => {
        assert.equal(err, null);
        // assert.equal(5, result.result.n);
        // assert.equal(5, result.ops.length);

        if (err)
            console.log("Erro ao inserir documento: " + err);
        else
            console.log(`Inserted ${result.result.n} documents into the collection`);

        callback(result);
    });
}

//--- Find All Documents

const findDocumentsAll = function (db, callback) {
    // Get the documents collection
    const collection = db.collection('documents');
    // Find some documents
    collection.find({}).toArray(function (err, docs) {
        assert.equal(err, null);
        // console.log("Found the following records");
        // console.log(docs)
        callback(docs);
    });
}

//--- Find Documents with a Query Filter
// Add a query filter to find only documents which meet the query criteria.

const findDocumentsBy = (db, callback) => {
    const collection = db.collection('documents');

    collection.find({ login: 'Katia' }).toArray((err, docs) => {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs);
        callback(docs);
    });
}

const findTopicosByConteudo = (db, callback) => {
    const collection = db.collection('topicos');

    collection.createIndex( { conteudo: "text" } );

    // const filtro = { $text: { $search: "pesquisa" } }
    const filtro = { $text: { $search: "pesquisar" } }

    collection.find(filtro).toArray((err, docs) => {
        console.log("Encontrado os seguintes registros:");
        console.log(docs);
        callback(docs);
    });
}

//--- Update a document
// The following operation updates a document in the documents collection.

const updateDocument = function (db, callback) {
    // Get the documents collection
    const collection = db.collection('documents');
    // Update document where login is 'Katia'
    const filtro = { login: 'Katia' }
    const alteracao = { sobrenome: 'Egito' }
    collection.updateOne(filtro, { $set: alteracao }, (err, result) => {
        assert.equal(err, null);
        assert.equal(1, result.result.n);
        console.log("Updated the document with the field login equal to Katia");
        callback(result);
    });
}

//--- Update all documents

const updateAllDocument = function (db, callback) {
    // Obter a coleção 'documents'
    const collection = db.collection('documents');
    // atualizando sem filtro de pesquisa
    const filtro = {}
    const alteracao = { $set: { ativo: true } }
    collection.updateMany(filtro, alteracao, (err, result) => {
        assert.equal(err, null);
        // assert.equal(1, result.result.n);
        console.log("Atulizado todos os documentos incluindo ativo = true");
        callback(result);
    });
}

//--- Remove a document
// Remove the document where the field a is equal to 3.

const removeDocument = function (db, callback) {
    // Get the documents collection
    const collection = db.collection('documents');

    collection.deleteMany({ login: 'Gabriel' }, function (err, result) {
        assert.equal(err, null);
        assert.equal(1, result.result.n);
        console.log("Removed the document with the field login equal to Gabriel");
        callback(result);
    });
}

const removeVariosDocument = function (db, callback) {
    const collection = db.collection('documents');
    const filtro = { login: 'Teste2' };

    collection.deleteMany(filtro, (err, result) => {
        assert.equal(err, null);
        console.log("Documentos removidos com sucesso!");
        callback(result);
    });
}

const topicos = [
    {
        titulo: "Erro de compilação",
        conteudo: "Não consigo compilar meu projeto",
        tags: ["Java", "Android", "Mobile"]
    },
    {
        titulo: "Erro de pesquisa",
        conteudo: "Não consigo pesquisar meu projeto",
        tags: ["Java", "Android", "Mobile"]
    },
    {
        titulo: "Erro de gravação",
        conteudo: "Não consigo gravar meu projeto",
        tags: ["Java", "Android", "Mobile"]
    }
];

const topico = {
    titulo: "Erro de compilação",
    conteudo: "Não consigo compilar meu projeto",
    tags: ["Java", "Android", "Mobile"]
};

var MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';
const dbName = 'db_devmedia';
// const servidor = 'mongodb://localhost:27017/db_devmedia';

const conexao = MongoClient.connect(url, function (erro, client) {
    assert.equal(null, erro);

    if (erro)
        console.log("Erro ao estabelecer conexão:" + erro);
    else
        console.log("Conexão estabelecida com sucesso.");

    const db = client.db(dbName);

    //--- Inserir coleção 'topicos'

    // inserirDados(topicos, 'topicos', db, (result, erro) => {
    //     if (erro)
    //         console.log("Erro ao inserir documento: " + err);
    //     else
    //         console.log(`Inseridos ${result.result.n} documentos na coleção`);
    // });

    // let colecao = db.collection("topicos");

    // colecao.insertOne(topico, function (erro, resultado) {
    //     if (erro)
    //         console.log("Erro ao inserir documento: " + erro);
    //     else
    //         console.log("Documento inserido com sucesso");
    // });

    // insertDocuments(db, () => {});

    // const result = findDocumentsAll(db, result => {
    //     console.log("Documentos lidos:");
    //     console.log(result);
    //     console.log(result.map(e => e.login))
    //     result.forEach(element => {
    //         console.log('Login', element.login)
    //     });
    //     // client.close();
    // });

    findTopicosByConteudo(db, () => {})

    // findDocumentsBy(db, () => {});

    // updateDocument(db, () => { });

    // updateAllDocument(db, () => { });

    // removeDocument(db, function () {});

    // removeVariosDocument(db, () => {});

    client.close();
});
