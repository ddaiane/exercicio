//autor: Daiane Marcon


const inquirer = require('inquirer');
let filePath;


//inicia o programa perguntando se o usuario quer fazer as pesquisas no csv padrão já cadastrado no programa ou incluir um novo
function inicio() {
  inquirer
    .prompt([{
      type: 'list',
      name: 'escolheCSV',
      message: 'Você deseja utilizar para as pesquisas o CSV incluso no projeto ou informar outro csv?',
      choices: [{
          name: 'Utilizar o csv dados.csv incluso no projeto',
          value: 1,
        },
        {
          name: 'Informar o caminho de outro csv',
          value: 2,
        }
      ],
    }])
    .then((selecao) => {
      switch (selecao["escolheCSV"]) {
        case 1:
          filePath =  __dirname + '\\dados.csv';
          escolheFuncao();
          break;
        case 2:
          const {
            atualizaCSV
          } = require("./src/interfaces/interfaceAtualizaCSV");
          atualizaCSV();
          break;
      }
    });
}



//menu principal da aplicação
function escolheFuncao() {
  inquirer
    .prompt([{ //lista com as opções do menu
      type: 'list',
      name: 'escolheFuncao',
      message: 'Escolha uma opção de consulta',
      choices: [{
          name: 'Consultar número de paciente e média de idade dos pacientes por município',
          value: 1,
        },
        {
          name: 'Consultar internações por ano por município',
          value: 2,
        },
        {
          name: 'Consultar pacientes pelo nome do hospital executante da internação',
          value: 3,
        },
        {
          name: 'Consultar tempo de internacao dos pacientes encaminhados por determinada instituição',
          value: 4,
        },
        {
          name: 'Consultar os cinco casos com maior tempo de espera em fila',
          value: 5,
        },
        new inquirer.Separator(),
        {
          name: 'Ler outro arquivo csv',
          value: 6,
        },
        {
          name: 'Sair',
          value: 7,
        }
      ],
    }])
    .then((selecao) => {
      switch (selecao["escolheFuncao"]) { //switch para direcionar para a interface do menu escolhido
        case 1:
          const { inicio1 } = require("./src/interfaces/interfaceMediaidade.js");
          inicio1(filePath);
          break;
        case 2:
          const { inicio2 } = require("./src/interfaces/interfaceInternacoesAno.js");
          inicio2(filePath);
          break;
        case 3:
          const { inicio3 } = require("./src/interfaceS/interfaceConsultaHospital");
          inicio3(filePath);
          break;
        case 4:
          const { inicio4 } = require("./src/interfaces/interfaceTempoInternacao.js");
          inicio4(filePath);
          break;
        case 5:
          const { inicio5 } = require("./src/interfaces/interfaceTempoFila");
          inicio5(filePath);
          break;
        case 6:
          const { atualizaCSV } = require("./src/interfaces/interfaceAtualizaCSV");
          atualizaCSV();
          break;
        case 7:
          const shell = require('shelljs');
          shell.exit(0);
          break;
        default:
          escolheFuncao();
      }
    });
}


//função para setar o filepath caso o usuario escolha atualizar o csv
function setFilepath(novoCSV) {
  filePath = novoCSV;
  console.log("CSV atualizado com sucesso");
  console.log(filePath);
  escolheFuncao();
}






inicio();


module.exports = {
  escolheFuncao, setFilepath
}