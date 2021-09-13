const fs = require('fs');
const parser = require('csv-parser');
const inquirer = require('inquirer');



/* 
1. [Consultar média de idade dos pacientes] Permitir que o usuário informe o nome do
município residencial e como resultado o programa deverá exibir:
a. O número total de pacientes do município;
b. A média de idade dos pacientes separados por gênero;
c. A média de idade de todos os pacientes; */


function mediaIdade(filePath, municipioPesquisado) {
    //arrays para incluir as idades de todos pacientes, de todas mulheres e de todos homens
    let idadesPacientesMunicipio = []
    let idadesF = [];
    let idadesM = [];

    fs.createReadStream(filePath)
        .pipe(parser({
            separator: ';'
        }))
        .on('data', function (data) {
            try {
                let idades = parseInt(data["idade"]); //transforma a idade em int para poder fazer os calculos

                //verificação de valor de idade entre 0 e 200 para deixar de fora as linhas que o campo idade estão como "nao informado" ou textos do tipo
                if (data["municipio_residencia"] == municipioPesquisado && idades >=0 && idades <=200) {                    

                    //envia as idades para as arrays corretas
                    if (data["sexo"] == 'MASCULINO') {
                        idadesM.push(idades);
                    } else if (data["sexo"] == 'FEMININO') {
                        idadesF.push(idades);
                    }
                    //envia a idade de todos para a array geral
                    idadesPacientesMunicipio.push(idades);
                }

            } catch (err) {
                console.log("erro: " + err)
                
            const { inicio1 } = require('../interfaces/interfaceMediaidade.js');
            inicio1(filePath);
                //informa algum erro não tratado e reenvia para a interface que solicita a cidade
                
            }
        })

        .on('end', function () {
            //calcula as medias e envia para a função da interface que apresenta os resultados
            const mediaF = calculaMedia(idadesF);
            const mediaM = calculaMedia(idadesM);
            const mediaTotal = calculaMedia(idadesPacientesMunicipio);

            const { apresentaResultado } = require('../interfaces/interfaceMediaidade.js');
            apresentaResultado(municipioPesquisado, idadesPacientesMunicipio, mediaM, mediaF, mediaTotal);
            
        });
}


//utilitaria
function calculaMedia(array) {
    let somaIdades = 0;
    for (i = 0; i < array.length; i++) {
        somaIdades += array[i];
    }
    let saida = somaIdades / array.length;
    return saida.toFixed(0);
}



module.exports = { mediaIdade };