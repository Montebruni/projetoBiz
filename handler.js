'use strict';

const service = require('./service');

module.exports.obter = async event => {
  const { id } = event.pathParameters;

  try {
    const cliente = await service.obter(id);

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: 'Consulta realizada com sucesso',
          result: cliente,
        },
      )
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(
        {
          message: `Erro ao tentar obter o cliente com id: ${id}`,
          error: error.message
        }
      )
    }
  }
};

module.exports.obterTodos = async () => {
  try {
    const clientes = await service.obterTodos();

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: 'Consulta realizada com sucesso',
          result: clientes,
        },
      ),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(
        {
          message: 'Erro ao tentar obter a lista de clientes',
          error: error.message
        }
      )
    }
  }
};

module.exports.criar = async event => {
  try {
    if (!event.body) {
      throw new Error('É necessário ter um body em uma requisição POST');
    }

    const clienteCadastrado = await service.criar(event.body);

    return {
      statusCode: 201,
      body: JSON.stringify(
        {
          message: 'Cliente cadastrado com sucesso',
          result: clienteCadastrado,
          eventBody: event.body,
        },
      ),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(
        {
          message: 'Erro ao tentar criar o cliente.',
          error: error.message,
        },
      ),
    };
  }  
};
