var database = require("../database/config")

function listar() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT * FROM usuario;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function entrar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucao = `
    SELECT *
	FROM usuario
			WHERE email = '${email}'
            AND senha = '${senha}';	
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function pegarDadosVotos(idUsuario)
{
    var instrucao = 
    ` 
    SELECT count(fkUsuario) AS numeroVotos
        FROM votos
            WHERE fkUsuario = ${idUsuario};
    `
    
    return database.executar(instrucao);
}

function cadastrar(nome, email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);
    var instrucao = `
        INSERT INTO usuario (nome, email, senha) VALUES ('${nome}', '${email}', '${senha}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function votar(fkUsuario, fkMusica)
{
    let instrucao = `
    INSERT INTO votos VALUES (${fkUsuario}, ${fkMusica});
    `
    console.log('Executando a query de voto na tabela votos');

    return database.executar(instrucao);
}

module.exports = {
    entrar,
    cadastrar,
    listar,
    votar,
    pegarDadosVotos
};