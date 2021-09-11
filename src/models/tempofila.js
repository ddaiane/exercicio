const fs = require('fs');
const parser = require('csv-parser');
const process = require('process');

const { escolheFuncao } = require("../../main.js");

/* [Determinar tempos de espera na fila] O programa deverá determinar e exibir os
cinco casos com maior tempo de espera na fila; */

function tempoFila(filePath) {
   // const filePath = __dirname + process.argv[2];

    let maiorestempos = [0,0,0,0,0];

    fs.createReadStream(filePath)
        .pipe(parser({
            separator: ';'
        }))
        .on('data', function (data) {
            try {          
                maiorestempos = maiorestempos.sort(compararNumeros);
                let valor = parseInt(data["horas_na_fila"]);
                //remove o erro de uma solicitação que esta como tendo sido feita em 1919
                let anoSolicitacao = parseInt(data["data_solicitacao"].split("-")[0]);  
                
                if(valor > maiorestempos[0] && anoSolicitacao > 2010) {
                    maiorestempos.push(valor);
                    maiorestempos.shift();
                }
                
            } catch (err) {
                //tratamento de erros
            }
        })
        .on('end', function () {
            console.log("\n -- Maiores tempos de espera na fila -- ");
            console.log("\nquinto lugar: " + maiorestempos[0] + " horas (" + (maiorestempos[0]/24).toFixed(0) + " dias)");
            console.log("quarto lugar: " + maiorestempos[1] + " horas (" + (maiorestempos[1]/24).toFixed(0) + " dias)");
            console.log("terceiro lugar: " + maiorestempos[2] + " horas (" + (maiorestempos[2]/24).toFixed(0) + " dias)");
            console.log("segundo lugar: " + maiorestempos[3] + " horas (" + (maiorestempos[3]/24).toFixed(0) + " dias)");
            console.log("primeiro lugar: " + maiorestempos[4] + " horas (" + (maiorestempos[4]/24).toFixed(0) + " dias)\n");
        });

}

tempoFila();



//utilitarias
function compararNumeros(a, b) {
    return a - b;
  }


module.exports = { tempoFila };