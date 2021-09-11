const inquirer = require('inquirer');
const { mediaIdade } = require("../models/mediaIdade.js");


function inicio(filePath) {
    //pede o municipio e chama funcao
    const question = [
        {
          type: 'input',
          name: 'municipio',
          message: "Informe o município de residência desejado: ",
        }
    ]

    inquirer.prompt(question).then((answer) => {
        
        const municipio = answer["municipio"].toUpperCase();
        mediaIdade(filePath, municipio);
      });
}


function apresentaResultado(municipioPesquisado, idadesPacientesMunicipio, mediaM, mediaF, mediaTotal) {

    if(idadesPacientesMunicipio.length > 0) {
        console.log("\nNumero total de pacientes da cidade de " + municipioPesquisado + " : " + idadesPacientesMunicipio.length);
        console.log("Média de idade feminina: " + mediaF);
        console.log("Média de idade masculina: " + mediaM);
        console.log("Média de idade total: " + mediaTotal + "\n");
        }
        else {
            console.log("\nO município informado não consta nos dados");
        }
        fim();
}

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
        const main = require("../../main.js")
        main.escolheFuncao();
        break;
      case 2:
        shell = require('shelljs');
        shell.exit(0);
        break;
    }
  });
}


module.exports = { inicio, apresentaResultado};
