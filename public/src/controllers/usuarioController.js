var usuarioModel = require("../models/usuarioModel");

var sessoes = [];

function testar(req, res) {
    console.log("ENTRAMOS NA usuarioController");
    res.json("ESTAMOS FUNCIONANDO!");
}

function listar(req, res) {
    usuarioModel.listar()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function entrar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {
        
        usuarioModel.entrar(email, senha)
            .then(
                function (resultado) {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                    if (resultado.length == 1) {
                        console.log(resultado);
                        res.json(resultado[0]);
                    } else if (resultado.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function pegarDadosVotos(req, res)
{
    let idUsuario = req.params.idUsuario

    console.log(idUsuario)
    console.log(`Estou no controller pegarDadosVotos Esse é o id do usuario: ${idUsuario}`);

    if(idUsuario == undefined)
    {
        res.status(400).send("O id usuário está undefined");
    }
    else
    {
        console.log(idUsuario);
        usuarioModel.pegarDadosVotos(idUsuario)
            .then((resposta) => {
                res.json(resposta);
            })
            .catch((erro) => {
                console.log(erro);
                res.status(500).json(erro.sqlMessage);
            })
    }
}

function cadastrar(req, res) {
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {
        
        usuarioModel.cadastrar(nome, email, senha)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function votar(req, res)
{
    let fkUsuario = req.body.fkUsuarioServer;
    let fkMusica = req.body.fkMusicaServer;

    console.log('estou no controller');

    if(fkUsuario == undefined)
    {
        res.status(400).send("O fkUsuario está undefined");
    }
    else if(fkMusica == undefined)
    {
        res.status(400).send("O fkMusica está undefined");
    }
    else
    {
        usuarioModel.votar(fkUsuario, fkMusica)
            .then((resultado) =>{
                res.json(resultado);
            })
            .catch((erro) =>{
                console.log(erro);
                console.log("Houve um erro ao relalizar o cadastro\n", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            })
    
    }

}


module.exports = {
    entrar,
    cadastrar,
    listar,
    testar,
    votar,
    pegarDadosVotos
}