const fs = require('fs');
const parser = require('csv-parser');
const process = require('process');

/* [Consultar internações por ano] Permitir que o usuário informe o nome do município
residencial e como resultado o programa deverá exibir uma lista com os anos de
2018 a 2021 e a quantidade de pacientes que foram internados por ano; */

function internacoesAno() {
    const filePath = __dirname + process.argv[2];

    let municipioPesquisado = 'ESTEIO';
    let internacoes2018 = 0;
    let internacoes2019 = 0;
    let internacoes2020 = 0;
    let internacoes2021 = 0;

    fs.createReadStream(filePath)
        .pipe(parser({
            separator: ';'
        }))
        .on('data', function (data) {
            try {          
                if (data["municipio_residencia"] == municipioPesquisado) {
                    let ano = parseInt(data["data_internacao"].split("-")[0]);
                    ano === 2018 ? internacoes2018++ : null;
                    ano === 2019 ? internacoes2019++ : null;
                    ano === 2020 ? internacoes2020++ : null;
                    ano === 2021 ? internacoes2021++ : null;     
                }
            } catch (err) {
                //tratamento de erros
            }
        })
        .on('end', function () {
            console.log("\n -- Internações de " + municipioPesquisado + " por ano -- \n");
            console.log("2018 - " + internacoes2018);
            console.log("2019 - " + internacoes2019);
            console.log("2020 - " + internacoes2020);
            console.log("2021 - " + internacoes2021 + "\n");
        });
}

internacoesAno();


module.exports = { internacoesAno };