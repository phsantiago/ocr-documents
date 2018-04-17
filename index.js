var Tesseract = require('tesseract.js')
var request = require('request')
var fs = require('fs')
//var url = 'http://tesseract.projectnaptha.com/img/eng_bw.png'
var url = 'https://conteudo.imguol.com.br/c/entretenimento/ba/2017/12/18/tadeu-schmidt-mostra-sua-carteira-de-motorista-1513629346527_v2_900x506.jpg'
var filename = 'pic.png'

var writeFile = fs.createWriteStream(filename)

var tesseractPromise = Tesseract.create({ langPath: "por.traineddata" })
request(url).pipe(writeFile).on('close', function() {
  console.log(url, 'saved to', filename)
  tesseractPromise.recognize(filename, 'eng')
    .progress(function  (p) { console.log('progress', p)  })
    .catch(err => console.error(err))
    .then(function (result) {
      console.log(result.text)
      process.exit(0)
    })
});
