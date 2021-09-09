const fs = require('fs'); 
const parser = require('csv-parser');
const process = require('process');



function manipulaCSV() { 
    const filePath = __dirname + process.argv[2];
    console.log(filePath);

    fs.createReadStream(filePath)
.pipe(parser({ separator: ';' }))
.on('data', function(data){
    try {
        
        if(data["idade"] > 100 && data["sexo"] == "MASCULINO") {
            console.log(data);
        }

        //operacao em cada linha
    }
    catch(err) {
        //tratamento de erros
    }
})
.on('end',function(){
    //ação no final do stream
});  

}

manipulaCSV();

