### Sobre o projeto
O projeto é uma api que utiliza o framework serverless.

Possui uma lista de usuários (nome e email) salvos em um arquivo JSON.

As rotas permitem buscar por todos os registros, buscar apenas 1 ou criar um novo.

### Pré Requisitos ###
É preciso ter o framework Serverless instalado

npm install -g serverless

### Rodando a aplicação
- Abra o console na pasta do projeto
- Digite o comando:
    - npm run offline
- Será instalado as dependências que o projeto precisa e iniciado o serverless offline

### Utilização
O projeto possui 3 rotas:

GET /usuarios
 - Retorna todos os usuários cadastrados no sistema

GET /usuarios/{id}
 - Retorna um usuário com o id expecífico

POST /usuarios
 - O body deve ser um json com os parâmetros { "nome": "example", "email": "example@exa.com" }

Para acessar as rotas, é necessário passar um token no header do request.

O token é gerado ao inicar a aplicação, procure no console por algo como abaixo

Serverless: Key with token: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

Serverless: Remember to use x-api-key on the request headers
