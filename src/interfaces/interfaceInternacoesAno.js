const inquirer = require('inquirer');
const { internacoesAno } = require("../models/internacoesAno.js");



function inicio2(filePath) {
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
        internacoesAno(filePath, municipio);
      });
}



function apresentaResultado(municipioPesquisado, total, internacoes2018, internacoes2019, internacoes2020, internacoes2021) {
//se tiver mais de um paciente listado no total de pacientes do municipio, informa os resultados, senao informa que nao foi encontrado
    if(total > 0) {
        console.log("\n -- Internações de " + municipioPesquisado + " por ano -- \n");
            console.log("2018 - " + internacoes2018);
            console.log("2019 - " + internacoes2019);
            console.log("2020 - " + internacoes2020);
            console.log("2021 - " + internacoes2021);
            console.log("Total na base de dados - " + total + "\n");

        }
        else {
            console.log("\nNão encontramos internações de moradores desse município \n");
        }
        const {fim} = require("./fim");
        fim();
}


module.exports = { inicio2, apresentaResultado};
