'use strict';

const fs = require('fs');

async function salvarArquivoJson(dados, nomeArquivo='clientes', utf='utf8') {
	fs.writeFileSync(`${nomeArquivo}.json`, JSON.stringify(dados), utf);
}

async function verificarArquivoClientes(nomeArquivo='clientes', utf='utf8') {
	if (!fs.existsSync(`${nomeArquivo}.json`)) {
		await salvarArquivoJson([], nomeArquivo, utf);
	}
}

async function obterClientesFromJsonFile(nomeArquivo='clientes', utf='utf8') {
	await verificarArquivoClientes();
  const clientes = await JSON.parse(fs.readFileSync(`${nomeArquivo}.json`, utf));

	if (!Array.isArray(clientes)) {
		throw new Error('O arquivo de clientes deveria conter um array.');
	}

	return clientes;
}

module.exports.obter = async (id) => {
	const clientes = await obterClientesFromJsonFile();

	return clientes.find(c => Number(c.id) === Number(id)) || [];
};

module.exports.obterTodos = async () => obterClientesFromJsonFile() || [];

module.exports.criar = async (dados) => {
	const novoCliente = JSON.parse(dados);

	if (Array.isArray(novoCliente)) {
		throw new Error('O body da requisição não pode ser um Array');
	}

	if (!novoCliente.nome) {
		throw new Error('O parâmetro "nome" é obrigatório no body da requisição.');
	}

	if (!novoCliente.email) {
		throw new Error('O parâmetro email é obrigatório no body da requisição.');
	}

	const clientes = await obterClientesFromJsonFile();

	if (clientes.some(c => c.email.toLowerCase() === novoCliente.email.toLowerCase())) {
		throw new Error('O email já foi cadastrado.');
	}

	novoCliente.id = 1;

	if (clientes.length > 0) {
		novoCliente.id = clientes[clientes.length - 1].id + 1;
	}

	clientes.push(novoCliente);

	await salvarArquivoJson(clientes);

	return novoCliente;
};