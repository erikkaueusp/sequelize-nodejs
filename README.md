# sequelize-nodejs

Projeto criado para aprender mais sobre nodejs e sequelize, nele foi utilizado o banco de dados postgreSQL e criada a imagem em docker para
subir o projeto em container.


## Estruturando o projeto

Para inicio do projeto utilizamos ``npm init -y`` para darmos inicio ao projeto node e após isso fizemos o uso do framework express através do ``npm install express``
também utilizamos a lib body-parser através do comando ``npm install body-parser``
que é utilizado para converter os dados que chegam nas requisições do tipo post para json e por fim colocamos o nodemon ``npm install nodemon --sev-dev nodemon``
para que possa ficar escutando todas as alterações feitas nos arquivos, assim não precisamos derrubar o servidor toda hora, para isto basta
criar um script passando o entrypoint da app através de **nodemon arquivo-de-entrada.js**

### ORM e Banco de dados

Aqui vamos utilizar a ORM sequelize também utilizando o gerenciador de pacotes com o comando ``npm install sequelize``, porém também utilizaremos o cli do sequelize
utizando ``npm install sequelize-cli`` e outra lib que é o path ``npm install path`` com isso ficara mais simples trabalhar com recursos em linha de comando
 através da cli do sequelize e com o path poderemos estrutar os novos caminhos para a configurações da orm.

Como banco de dados eu utilizei o postgreSQL por ter mais familiaridade com este, para instalação também usamos o npm
utilizando o comando

``npm install --save pg pg-hstore``

### Comandos utilizando o sequelize-cli

Para criação da configuração base do sequelize como as pastas de config,models,migrations e seeders

``npx sequelize-cli init``

Para criação de tabelas e colunas

``npx sequelize-cli model:create --name Nome-Da-Tabela --atributes atributo1:string``

Para gerenciamento utilizamos o comando abaixo, dessa forma ele ira fazer a migração para o banco de dados que indicamos nas configurações

``npx sequelize-cli db:migrate``

Para criar um seed

``npx sequelize-cli seed:generate --name nome-do-seed``

e para enviarmos todos os seeds criados para o banco utilizamos

``npx sequelize-cli db:seed:all``

***

# Executando projeto

Feito o clone do repositório e criado o banco de dados em postgreSQL basta ir no arquivo de config.json e alterar

```
"development": {
        "username": "postgres",
        "password": "postgres",
        "database": "escola_ingles",
        "host": "db_postgres",
        "dialect": "postgres",
        "logging": false
    }
```

Feito isto, utilize ``npm install`` para instalar as dependencias e ``npm start`` para iniciar, com isso basta navegar em ``http://localhost:3000/``
uma vez para que seja feita a migração e o seed do banco, e testar os recursos criados utilizando os verbos https.


_Nota: O projeto atual se encontra configurado para docker, se quiser pode utilizar através de ``docker-compose up``_
