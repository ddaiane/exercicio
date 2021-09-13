//funções de verificações no csv informado antes de setar no main para conferir se é válido e se tem as colunas necessárias

const parser = require('csv-parser');
const fs = require('fs');

const {setFilepath, escolheFuncao} = require("../../main.js");

var existe;
var acessivel;
var isCSV;
var headersOK;

var novoCSV;

  //verifica se o arquivo existe
  function verificaexiste(csv) {
      novoCSV = csv;
    const fs = require('fs');
    const constants = require('fs');
    try {
      fs.accessSync(novoCSV, constants.F_OK);
      existe = true;
      verificaAcesso(); //se existe, envia para a proxima verificação
    } catch (err) {
      console.error('Arquivo não encontrado, verifique a digitação do caminho');
      existe = false;
      escolheFuncao(); //se nao existe, envia de volta para o menu principal
    }
  }
  
      //verifica se o arquivo esta acessivel
    function verificaAcesso() {
      const fs = require('fs');
    const constants = require('fs');
    try {
      fs.accessSync(novoCSV, constants.R_OK);
      acessivel = true;
      verificaExtensao(); //se esta acessivel, envia para a proxima verificação
  
    } catch (err) {
      console.error('Arquivo não acessivel');
      acessivel = false;
      escolheFuncao(); //se nao esta acessivel, envia de volta para o menu principal
    }
    }
  
    //verifica se a extensao do arquivo passado é csv
    function verificaExtensao() {
      var extensao = novoCSV.split('.');
      extensao = extensao[extensao.length - 1];
      extensao = extensao.toLowerCase();
      
      extensao == 'csv' ? isCSV = true : isCSV = false;
      if(isCSV) {
        verificaHeaders() //se a extensao for csv, passa para a proxima verificação
      }
      else {
        console.log("O arquivo escolhido não é um csv."); 
        escolheFuncao(); //se nao for csv, volta para o menu principal
      }
    }
  
  
    //header correto para ser comparado com o que esta sendo passado no novo csv:
  const headerCorreto = [
      'data_extracao',
      'id_usuario',
      'situacao',
      'central_regulacao_origem',
      'data_solicitacao',
      'sexo',
      'idade',
      'municipio_residencia',
      'solicitante',
      'municipio_solicitante',
      'codigo_cid',
      'carater',
      'tipo_internacao',
      'tipo_leito',
      'data_autorizacao',
      'data_internacao',
      'data_alta',
      'executante',
      'horas_na_fila'
    ];
    var novoHeader;

  
    //verifica se os headers do csv passado sao os necessarios no programa
    function verificaHeaders() {
       fs.createReadStream(novoCSV)
      .pipe(parser({
          separator: ';'
      }))  .on('headers', (headers) => {
          novoHeader = headers; //pega os headers do csv informado e coloca em uma array para verificação
    })
          .resume() //para o stream de dados
          .on('end', function () {
              headersOK = comparaArrays(novoHeader, headerCorreto); //envia para função de comparação de arrays para verificar se o  csv possui as colunas necessárias
              if(headersOK) {
                  enviaMain(); //se passa na verificação, vai para a função que seta o novo csv no main
              }
              else {
                  console.log("O arquivo csv informado não possui as colunas de dados necessárias ao programa");
                  escolheFuncao(); //se o csv nao tiver as colunas necessarias, retorna para menu principal
              }
          });
    
    }
  
    //se todas verificações ok, seta o novo csv no filepath do main que é exposto para todas outras funçoes
    function enviaMain() {
        if(existe && acessivel && isCSV && headersOK) {
          setFilepath(novoCSV); //verifica novamente se passou em todas verificações e envia para o main
        }
        else {
            console.log("Arquivo inválido");
            escolheFuncao();       } //se nao tiver true em alguma das verificações, retorna para o menu principal
    }


    

    //funcao utilitaria para comparar arrays
function comparaArrays(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;
    //compara cada item da array
    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
}


    module.exports = {verificaexiste};
  