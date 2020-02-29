'use strict';

const service = require('./service');

module.exports.obter = async event => {
  const { id } = event.pathParameters;

  try {
    const usuario = await service.obter(id);

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: 'Consulta realizada com sucesso',
          result: usuario,
        },
      )
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(
        {
          message: `Erro ao tentar obter o usuário com id: ${id}`,
          error: error.message
        }
      )
    }
  }
};

module.exports.obterTodos = async () => {
  try {
    const usuarios = await service.obterTodos();

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: 'Consulta realizada com sucesso',
          result: usuarios,
        },
      ),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(
        {
          message: 'Erro ao tentar obter a lista de usuários',
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

    const usuarioCadastrado = await service.criar(event.body);

    return {
      statusCode: 201,
      body: JSON.stringify(
        {
          message: 'Usuário cadastrado com sucesso',
          result: usuarioCadastrado,
          eventBody: event.body,
        },
      ),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(
        {
          message: 'Erro ao tentar criar o usuário.',
          error: error.message,
        },
      ),
    };
  }  
};
