const fs = require('fs');
const parser = require('csv-parser');


/* [Determinar tempos de espera na fila] O programa deverá determinar e exibir os
cinco casos com maior tempo de espera na fila; */

function tempoFila(filePath) {


    //inicia comm uma array com 5 posições todas zeradas que ira organizar o ranking
    let maiorestempos = [0,0,0,0,0];

    fs.createReadStream(filePath)
        .pipe(parser({
            separator: ';'
        }))
        .on('data', function (data) {
            try {          
                //sempre que passa para a proxima linha, organiza as posições da array em forma crescente
                maiorestempos = maiorestempos.sort(compararNumeros);
                //horas na fila transformado para int e guardado na variavel valor
                let valor = parseInt(data["horas_na_fila"]);

                //pega o ano da solicitação de cada linha e transforma em int para remover o erro de uma solicitação que esta como tendo sido feita em 1919
                let anoSolicitacao = parseInt(data["data_solicitacao"].split("-")[0]);  

                if(valor > maiorestempos[0] && anoSolicitacao > 2000) { //retira solicitações anteriores a 2005 para retirar a solicitação que esta erroneamente como sendo de 1919
                    maiorestempos.push(valor); //se o tempo de espera for maior que o menor numero da array do ranking (posição 0 é sempre o menor), inclui o valor atual no fim da array
                    maiorestempos.shift(); //e retira o menor valor (o da posição 0) e na proxima iteração a array é novamente organizada em sentido crescente
                }
                
            } catch (err) {
                console.log("erro: " + err)
                
            const { escolheFuncao } = require('../../main');
            escolheFuncao();
                //informa algum erro não tratado e reenvia para o menu principal
            }
        })
        .on('end', function () {
            //envia a array com o ranking para a interface apresentar os resultados
            const {apresentaResultado} = require('../interfaces/interfaceTempoFila');
            apresentaResultado(maiorestempos)
        });

}




//utilitarias
function compararNumeros(a, b) {
    return a - b;
  }


module.exports = { tempoFila };