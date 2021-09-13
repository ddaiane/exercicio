const fs = require('fs');
const parser = require('csv-parser');

/* [Calcular tempo de internação] Permitir que o usuário digite o nome do solicitante e
como resultado o programa deverá exibir:
a. Uma lista com todos os pacientes;
b. O nome dos hospitais executantes;
c. O número de dias que os pacientes permaneceram internados desde a
solicitação até a alta deste paciente; */


function tempoInternacao(filePath, solicitantePesquisado) {
    
    let count = 0; //conta o numero do paciente na lista

    console.log(`\n -- Tempo de internação de pacientes encaminhados por ${solicitantePesquisado} -- \n`)

    fs.createReadStream(filePath)
        .pipe(parser({
            separator: ';'
        }))
        .on('data', function (data) {
            try {
                if (data["solicitante"] === solicitantePesquisado) { //verifica se o solicitante da linha atual é igual o solicitante pesquisado pelo usuario
                    count++;
                    //lida com os campos vazios de sexo
                    let sexo = data["sexo"] === 'MASCULINO' ? "M" : data["sexo"] === 'FEMININO' ? "F" : "não informado";
                    //lida com os campos vazios de idade               
                    let idade = data["idade"] != "" ? parseInt(data["idade"]).toFixed(0) : "indefinida";

                    //calcula tempo da internacao
                    let dataInternação = data["data_internacao"].split(" ")[0]; //retira a parte de horario
                    dataInternação = new Date(dataInternação); //instancia um object date para facilitar o calculo
                    let dataAlta = data["data_alta"].split(" ")[0];
                    dataAlta = new Date(dataAlta);
                    const diferencaDatas = Math.abs(dataAlta.getTime() - dataInternação.getTime()); //calcula a diferença em milisegundos
                    const internacaoDias = Math.ceil(diferencaDatas / (1000 * 60 * 60 * 24));
                    //divide pela multiplicação de horas do dia, minutos de 1 hora, segundos de 1 minutos e milisegundos de 1 segundo para transformar o valor em dias

                    
                    //nessa opção é impresso durante o stream cada linha do resultado para nao guardar sem necessidade uma array de objetos com todas informações de cada paciente
                    //para depois imprimir. nesse caso opteipor ja ir apresentando pois nao era necessario fazer calculos depois do stream de dados
                    console.log("Paciente " + count + ": sexo " + sexo + ", idade: " +idade +". Tempo internado: "+internacaoDias+" dias. Instituição executante: " + data["executante"]);
                    count++;

                }

            } catch (err) {
                console.log("erro: " + err)
               const { inicio4 } = require('../interfaces/interfaceTempoInternacao');
                inicio4(filePath);
                //informa algum erro não tratado e reenvia para a interface que solicita input da pesquisa
            }
        })
        .on('end', function () {
            if(count == 0) { //se nenhum paciente foi encontrado, informa
                console.log("Não foram encontrados dados de encaminhamento do hospital pesquisado. \n Verifique se digitou corretamente o nome oficial da instituição como consta nas bases de dados oficiais\n")
            }
            //envia para a função final da interface
            const { fim } = require('../interfaces/fim');
                fim();
        });

}


module.exports = {tempoInternacao}

