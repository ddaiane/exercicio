const inquirer = require('inquirer');
const { consultaHospital } = require("../models/consultaHospital");



function inicio3(filePath) {
    //pede o nome do hospital executante e chama funcao
    const question = [
        {
          type: 'input',
          name: 'hospital',
          message: "Informe o nome do hospital executante desejado como consta nas bases de dados oficiais",
        }
    ]

    inquirer.prompt(question).then((answer) => {
        
        const hospital = answer["hospital"].toUpperCase();
        consultaHospital(filePath, hospital); 
      });
}






module.exports = { inicio3};
