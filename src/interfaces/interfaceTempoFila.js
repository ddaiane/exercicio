const inquirer = require('inquirer');
const {
    tempoFila
} = require("../models/tempofila");



function inicio5(filePath) {
    //chama a funcao que calcula o maior tempo na fila e envia o filepath do csv
    tempoFila(filePath);

}


function apresentaResultado(maiorestempos) {
    //apresenta os resultados que estao nas posiçoes da array maiorestempos

            console.log("\n -- Maiores tempos de espera na fila -- ");
            console.log("\nquinto lugar: " + maiorestempos[0] + " horas (" + (maiorestempos[0]/24).toFixed(0) + " dias)");
            console.log("quarto lugar: " + maiorestempos[1] + " horas (" + (maiorestempos[1]/24).toFixed(0) + " dias)");
            console.log("terceiro lugar: " + maiorestempos[2] + " horas (" + (maiorestempos[2]/24).toFixed(0) + " dias)");
            console.log("segundo lugar: " + maiorestempos[3] + " horas (" + (maiorestempos[3]/24).toFixed(0) + " dias)");
            console.log("primeiro lugar: " + maiorestempos[4] + " horas (" + (maiorestempos[4]/24).toFixed(0) + " dias)\n");
    
    const {
        fim
    } = require("./fim");
    fim();
}




module.exports = {
    inicio5,
    apresentaResultado
};