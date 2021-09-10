const fs = require('fs');
const parser = require('csv-parser');
const process = require('process');
/* 
1. [Consultar média de idade dos pacientes] Permitir que o usuário informe o nome do
município residencial e como resultado o programa deverá exibir:
a. O número total de pacientes do município;
b. A média de idade dos pacientes separados por gênero;
c. A média de idade de todos os pacientes; */

function mediaIdade() {
    const filePath = __dirname + process.argv[2];

    let municipioPesquisado = 'CANOAS';
    let idadesPacientesMunicipio = []
    let idadesF = [];
    let idadesM = [];

    fs.createReadStream(filePath)
        .pipe(parser({
            separator: ';'
        }))
        .on('data', function (data) {
            try {
                
                if (data["municipio_residencia"] == municipioPesquisado) {

                    let idades = parseInt(data["idade"]);

                    if (data["sexo"] == 'MASCULINO') {
                        idadesM.push(idades);
                    } else if (data["sexo"] == 'FEMININO') {
                        idadesF.push(idades);
                    }
                    
                    idadesPacientesMunicipio.push(idades);
                }

            } catch (err) {
                //tratamento de erros
            }
        })
        .on('end', function () {
            console.log("\nNumero total de pacientes da cidade de " + municipioPesquisado + " : " + idadesPacientesMunicipio.length);
            console.log("Média de idade feminina: " + calculaMedia(idadesF));
            console.log("Média de idade feminina: " + calculaMedia(idadesM));
            console.log("Média de idade total: " + calculaMedia(idadesPacientesMunicipio) + "\n");
        });

}

mediaIdade();

//utilitaria

function calculaMedia(array) {
    let somaIdades = 0;
    for (i = 0; i < array.length; i++) {
        somaIdades += array[i];
    }
    let saida = somaIdades / array.length;
    return saida.toFixed(3);
}


module.exports = { mediaIdade };