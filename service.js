'use strict';

const fs = require('fs');

async function salvarArquivoJson(dados, nomeArquivo='usuarios', utf='utf8') {
	return fs.writeFileSync(`${nomeArquivo}.json`, JSON.stringify(dados), utf);
}

async function verificarArquivoUsuarios(nomeArquivo='usuarios', utf='utf8') {
	if (!fs.existsSync(`${nomeArquivo}.json`)) {
		await salvarArquivoJson([], nomeArquivo, utf);
	}
}

async function obterUsuariosFromJsonFile(nomeArquivo='usuarios', utf='utf8') {
	await verificarArquivoUsuarios();
  const usuarios = await JSON.parse(fs.readFileSync(`${nomeArquivo}.json`, utf));

	if (!Array.isArray(usuarios)) {
		throw new Error('O arquivo de usuários deveria conter um array.');
	}

	return usuarios;
}

module.exports.obter = async (id) => {
	const usuarios = await obterUsuariosFromJsonFile();

	return usuarios.find(c => Number(c.id) === Number(id)) || [];
};

module.exports.obterTodos = async () => obterUsuariosFromJsonFile() || [];

module.exports.criar = async (dados) => {
	const novoUsuario = JSON.parse(dados);

	if (Array.isArray(novoUsuario)) {
		throw new Error('O body da requisição não pode ser um Array');
	}

	if (!novoUsuario.nome) {
		throw new Error('O parâmetro "nome" é obrigatório no body da requisição.');
	}

	if (!novoUsuario.email) {
		throw new Error('O parâmetro email é obrigatório no body da requisição.');
	}

	const usuarios = await obterUsuariosFromJsonFile();

	if (usuarios.some(c => c.email.toLowerCase() === novoUsuario.email.toLowerCase())) {
		throw new Error('O email já foi cadastrado.');
	}

	novoUsuario.id = 1;

	if (usuarios.length > 0) {
		novoUsuario.id = usuarios[usuarios.length - 1].id + 1;
	}

	usuarios.push(novoUsuario);

	await salvarArquivoJson(usuarios);

	return novoUsuario;
};
