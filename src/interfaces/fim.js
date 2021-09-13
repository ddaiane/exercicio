const inquirer = require('inquirer');

//opcao de voltar para o menu principal ou sair
function fim() {
    inquirer
  .prompt([{
      type: 'list',
      name: 'escolheFuncao',
      message: 'Escolha uma opção',
      choices: [
        {
          name: 'Retornar para o menu principal',
          value: 1,
        },
        {
          name: 'Sair',
          value: 2,
        }
      ],
    }
  ])
  .then((selecao) => {
    switch(selecao["escolheFuncao"]) {
      case 1: 
        const {escolheFuncao} = require("../../main.js")
        escolheFuncao();
        break;
      case 2:
        const shell = require('shelljs');
        shell.exit(0);
        break;
    }
  });
}


module.exports = { fim };