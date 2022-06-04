-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/* para workbench - local - desenvolvimento */
CREATE DATABASE individual;

USE individual;

CREATE TABLE usuario (
	id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(50),
	email VARCHAR(50),
	senha VARCHAR(50)
);

create table musica (
idMusica int primary key auto_increment,
titulo varchar (35),
artista varchar (40),
genero varchar (20),
plataforma varchar (40),
fkUsuario int,
	foreign key (fkUsuario) references usuario(id)
) auto_increment = 2201;

create table votos (
fkUsuario int,
	foreign key (fkUsuario) references usuario(id),
fkMusica int,
	foreign key (fkMusica) references musica(idMusica),
primary key (fkUsuario, fkMusica),
votos decimal (4,2)
);