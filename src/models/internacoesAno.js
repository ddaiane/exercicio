const fs = require('fs');
const parser = require('csv-parser');

/* [Consultar internações por ano] Permitir que o usuário informe o nome do município
residencial e como resultado o programa deverá exibir uma lista com os anos de
2018 a 2021 e a quantidade de pacientes que foram internados por ano; */

function internacoesAno(filePath, municipioPesquisado) {

    let internacoes2018 = 0;
    let internacoes2019 = 0;
    let internacoes2020 = 0;
    let internacoes2021 = 0;
    let internacoesTotal = 0

    fs.createReadStream(filePath)
        .pipe(parser({
            separator: ';'
        }))
        .on('data', function (data) {
            try {          
                if (data["municipio_residencia"] == municipioPesquisado) { //verifica se a linha se refere ao municipio pesquisado pelo usuario
                    internacoesTotal++; //soma todos pacientes encontrados
                    let ano = parseInt(data["data_internacao"].split("-")[0]); //retira do campo data apenas o ano
                    //soma o paciente no ano certo
                    ano === 2018 ? internacoes2018++ : null;
                    ano === 2019 ? internacoes2019++ : null;
                    ano === 2020 ? internacoes2020++ : null;
                    ano === 2021 ? internacoes2021++ : null;

                }
            } catch (err) {
                console.log("erro: " + err);
                console.log("Tente novamente")
               const { inicio2 } = require('../interfaces/interfaceInternacoesAno');
                inicio2(filePath);
                //informa algum erro não tratado e reenvia para a interface que solicita input da pesquisa
            }
        })
        .on('end', function () {
            //ao finalizar envia os dados para serem impressos pela interface
            const { apresentaResultado } = require('../interfaces/interfaceInternacoesAno.js');
            apresentaResultado(municipioPesquisado, internacoesTotal, internacoes2018, internacoes2019, internacoes2020, internacoes2021);
        });
}



module.exports = { internacoesAno };