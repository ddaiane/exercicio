const inquirer = require('inquirer');

const {escolheFuncao} = require("../../main.js");


var novoCSV;


//função para input de um novo csv
function atualizaCSV() {
  const question = [
    {
      name: 'atualizacsv',
      message: "Digite o caminho completo do novo arquivo CSV a ser lido ou pressione enter com o campo vazio para voltar para o menu principal",
    }
]
inquirer.prompt(question).then((answer) => {
  
  //se usuario tiver deixado campo vazio, retorna para menu principal
    if(answer["atualizacsv"] == "") {
    escolheFuncao();
  }
  else {
    //se usuario tiver digitado algo, encaminha para as funções de verificação do arquivo informado
    novoCSV = answer["atualizacsv"];
    const { verificaexiste } = require("../models/atualizacsv.js");
    verificaexiste(novoCSV);
  }}   
);
}


 

module.exports = { atualizaCSV, novoCSV };