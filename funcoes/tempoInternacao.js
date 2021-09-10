const fs = require('fs');
const parser = require('csv-parser');
const process = require('process');

/* [Calcular tempo de internação] Permitir que o usuário digite o nome do solicitante e
como resultado o programa deverá exibir:
a. Uma lista com todos os pacientes;
b. O nome dos hospitais executantes;
c. O número de dias que os pacientes permaneceram internados desde a
solicitação até a alta deste paciente; */


function tempoInternacao() {
    const filePath = __dirname + process.argv[2];

    let solicitantePesquisado = 'HOSPITAL SAO VICENTE DE PAULO';
    let count = 1; //conta o numero do paciente na lista

    console.log(`\n -- Tempo de internação de pacientes encaminhados por ${solicitantePesquisado} -- \n`)

    fs.createReadStream(filePath)
        .pipe(parser({
            separator: ';'
        }))
        .on('data', function (data) {
            try {
                if (data["solicitante"] === solicitantePesquisado) {
                    
                    //lida com os campos vazios de sexo
                    let sexo = data["sexo"] === 'MASCULINO' ? "M" : data["sexo"] === 'FEMININO' ? "F" : "não informado";
                    //lida com os campos vazios de idade               
                    let idade = data["idade"] != "" ? parseInt(data["idade"]).toFixed(0) : "indefinida";

                    //calcula tempo da internacao
                    let dataInternação = data["data_internacao"].split(" ")[0];
                    dataInternação = new Date(dataInternação);
                    let dataAlta = data["data_alta"].split(" ")[0];
                    dataAlta = new Date(dataAlta);
                    const diferencaDatas = Math.abs(dataAlta.getTime() - dataInternação.getTime());
                    const internacaoDias = Math.ceil(diferencaDatas / (1000 * 60 * 60 * 24));
                    
                    //imprime a lista
                    console.log("Paciente " + count + ": sexo " + sexo + ", idade: " +idade +". Tempo internado: "+internacaoDias+" dias. Instituição executante: " + data["executante"]);
                    count++;

                }

            } catch (err) {
                //tratamento de erros
            }
        })
        .on('end', function () {
            //executar outro arquivo
            // var shell = require('shelljs');
            // shell.exec('node mediaIdade.js');
        });

}

tempoInternacao();

