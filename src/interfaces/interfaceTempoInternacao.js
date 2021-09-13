const inquirer = require('inquirer');
const { tempoInternacao } = require("../models/tempoInternacao");




function inicio4(filePath) {
    //pede o nome do solicitante (por solicitante entendi que se referia ao campo "solicitante" do csv, nao a municipio_solicitante que tbm existe) e chama funcao
    const question = [
        {
          type: 'input',
          name: 'solicitante',
          message: "Informe o nome da instituição solicitante desejada como consta nas bases de dados oficiais: ",
        }
    ]

    inquirer.prompt(question).then((answer) => {
        const solicitante = answer["solicitante"].toUpperCase();
        tempoInternacao(filePath, solicitante);
      });
}



module.exports = {inicio4};
