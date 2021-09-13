const fs = require('fs');
const parser = require('csv-parser');

/* 
[Consultar hospitais] Permitir que o usuário digite o nome do executante e como
resultado o programa deverá exibir todos os pacientes que foram internados, sua
idade, o município residencial e solicitante de cada um deles, as datas de
autorização, de internação e alta e o executante; */

function consultaHospital(filePath, executantePesquisado) {

    let count = 0; //conta o numero do paciente na lista
    console.log(`\n -- Pacientes com internação executada por ${executantePesquisado} -- \n`)

    fs.createReadStream(filePath)
        .pipe(parser({
            separator: ';'
        }))
        .on('data', function (data) {
            try {
                if (data["executante"] === executantePesquisado) {
                    count++;
                    //lida com os campos vazios de idade               
                    let idade = data["idade"] != "" ? parseInt(data["idade"]).toFixed(0) : "indefinida";
                    
                    //nessa opção é impresso já durante o stream cada linha do resultado para nao guardar sem necessidade uma array de objetos com todas informações de cada paciente
                    //para depois imprimir. nesse caso optei por ja ir apresentando pois nao era necessario fazer calculos depois do stream de dados
                    console.log("Paciente " + count + " - idade: " +idade +
                                ". Município residencial: "+data["municipio_residencia"] + ". Município Solicitante: "+data["municipio_solicitante"] + 
                                ". Data autorização: " + data["data_autorizacao"].split(" ")[0] + ". Data de internação: " + data["data_internacao"].split(" ")[0] + 
                                ". Data de alta: " + data["data_alta"].split(" ")[0]
                                 );

                                 //retirei o executante da lista pois, como a pesquisa é justamente por executante, todos os itens terão o mesmo executante: o que foi pesquisado
                    count++;

                }

            } catch (err) {
                console.log("erro: " + err);
                console.log("Tente novamente")
               const { inicio3 } = require('../interfaces/interfaceConsultaHospital');
                inicio3(filePath);
                //informa algum erro não tratado e reenvia para a interface que solicita input da pesquisa
            }
        })
        .on('end', function () {
            if(count == 0) { //se o contador tiver permanecido em zero e portanto nao tiver pacientes encontrados, avisa que nao foi possivel encontrar
                console.log("Não foram encontrados pacientes do hospital pesquisado. \n Verifique se digitou corretamente o nome oficial da instituição como consta nas bases de dados oficiais\n")
            }

            //envia para a função final que pergunta como prosseguir
            const { fim } = require('../interfaces/fim');
                fim();
        });




}


module.exports = { consultaHospital };