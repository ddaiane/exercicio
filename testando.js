const parse = require('csv-parse');
const fs = require('fs');


const filepath = "/dados.csv";

const processFile = async () => {
    records = []
    const parser = fs
    .createReadStream(__dirname + filepath)
    .pipe(parse({
        delimiter: ';'
    }));
    for await (const record of parser) {
      // Work with each record
      if (record[5] === 'FEMININO' && record[7] > 'PORTO ALEGRE') {
        console.log(record);

      }
      //records.push(record)
    }
    return records
  }
  
  (async () => {
    const records = await processFile()
    console.info(records);
   
  })()

 