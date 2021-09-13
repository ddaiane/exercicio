const inquirer = require('inquirer');
const { mediaIdade } = require("../models/mediaIdade.js");



function inicio1(filePath) {
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
//apresenta os resultados e se nenhum paciente tiver sido inserido na array de todos pacientes da cidade, informa que nao foi encontrado paciente
    if(idadesPacientesMunicipio.length > 0) {
        console.log("\nNumero total de pacientes da cidade de " + municipioPesquisado + " : " + idadesPacientesMunicipio.length);
        console.log("Média de idade feminina: " + mediaF);
        console.log("Média de idade masculina: " + mediaM);
        console.log("Média de idade total: " + mediaTotal + "\n");
        }
        else {
            console.log("\nO município informado não consta nos dados\n");
        }
        const {fim} = require("./fim");
        fim();
}




module.exports = { inicio1, apresentaResultado};
