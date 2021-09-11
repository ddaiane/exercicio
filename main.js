const inquirer = require('inquirer');
const interface1 = require("./src/interfaces/interfaceMediaidade.js");
let filePath = __dirname + '\\dados.csv';

function inicio() {
  inquirer
  .prompt([{
      type: 'list',
      name: 'escolheCSV',
      message: 'Você deseja utilizar para as pesquisas o CSV incluso no projeto ou informar outro csv?',
      choices: [
        {
          name: 'Utilizar o csv dados.csv incluso no projeto',
          value: 1,
        },
        {
          name: 'Informar o caminho de outro csv',
          value: 2,
        }
      ],
    }
  ])
  .then((selecao) => {
    switch(selecao["escolheCSV"]) {
      case 1: 
        escolheFuncao();
        break;
      case 2:
        atualizaCSV()
        break;
    }
  });
}

function escolheFuncao() {
  inquirer
  .prompt([{
      type: 'list',
      name: 'escolheFuncao',
      message: 'Escolha uma opção de consulta',
      choices: [
        {
          name: 'Consultar número de paciente e média de idade dos pacientes por município',
          value: 1,
        },
        {
          name: 'Consultar internações por ano por município',
          value: 2,
        },
        {
          name: 'nomear',
          value: 3,
        },
        {
          name: 'Consultar tempo de internacao dos pacientes encaminhados por determinada instituição',
          value: 4,
        },
        {
          name: 'Consultar os cinco casos com maior tempo de espera em fila',
          value: 5,
        },
        new inquirer.Separator(),
        {
          name: 'Sair',
          value: 6,
        }
      ],
    }
  ])
  .then((selecao) => {
    switch(selecao["escolheFuncao"]) {
      case 1: interface1.inicio(filePath);
        break;
      case 2:
        break;
      case 3:
        break;
      case 4:
        break;
      case 5:
        break;
      case 6:
        shell = require('shelljs');
        shell.exit(0);
        break;
      default:
        escolheFuncao();
    }
  });
}

function atualizaCSV() {

}

inicio();

module.exports = { escolheFuncao }

