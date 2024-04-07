const fs = require('fs');
const path = require('path');
const SerialPort = require('serialport'); 

function log(text, addParentheses = false) {
  if (addParentheses) {
    console.log(`(${text})`);
  } else {
    console.log(text);
  }
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// index.js

function date() {
  const currentDate = new Date().toLocaleDateString();
  return currentDate;
}

// Funzione per ottenere l'ora corrente
function hour() {
  const currentHour = new Date().toLocaleTimeString();
  return currentHour;
}


function addFile(fileName, folderPath) {
  // Crea il percorso completo del nuovo file
  const filePath = path.join(folderPath, fileName);
  
  // Verifica se il file esiste già
  if (fs.existsSync(filePath)) {
    throw new Error(`Il file ${fileName} esiste già nella cartella ${folderPath}`);
  }

  // Crea il file vuoto nella cartella specificata
  fs.writeFileSync(filePath, '');

  return `Il file ${fileName} è stato aggiunto alla cartella ${folderPath}`;
}


function deleteFile(fileName, folderPath) {
  // Crea il percorso completo del file da eliminare
  const filePath = path.join(folderPath, fileName);

  // Verifica se il file esiste
  if (!fs.existsSync(filePath)) {
    throw new Error(`The file not exist.`);
  }

  // Elimina il file
  fs.unlinkSync(filePath);

}

function renameFile(oldFileName, newFileName, folderPath) {
  // Crea il percorso completo dei file
  const oldFilePath = path.join(folderPath, oldFileName);
  const newFilePath = path.join(folderPath, newFileName);

  // Verifica se il file originale esiste
  if (!fs.existsSync(oldFilePath)) {
    throw new Error(`The file not exist.`);
  }

  // Rinomina il file
  fs.renameSync(oldFilePath, newFilePath);
}

function communicateWithArduino(dataToSend, serialPort) {
  const port = new SerialPort(serialPort, { baudRate: 9600 }); // Utilizza la porta seriale specificata dall'utente

  port.on('open', function() {
    console.log('Communication with Arduino established');
    port.write(dataToSend); // Invia dati ad Arduino
  });

  port.on('error', function(err) {
    console.error('Error communicating with Arduino:', err.message);
  });
}

function writeInFile(filePath, data) {
  fs.appendFile(filePath, data + '\n', function (err) {
    if (err) {
      console.error('Error writing to file:', err);
    } else {
      console.log('Data written to file successfully');
    }
  });
}

function load(templateName) {
  let templateContent = '';

  // Determina il codice del template in base al nome
  if (templateName === 'template1') {
    templateContent = `
      // Codice del template 1
      console.log('Questo è il template 1');
    `;
  } else if (templateName === 'template2') {
    templateContent = `
      // Codice del template 2
      console.log('Questo è il template 2');
    `;
  }

  // Crea un nuovo file JavaScript sul desktop
  const desktopPath = require('os').homedir(); // Percorso della directory Desktop
  const newFilePath = path.join(desktopPath, `${templateName}.js`);

  // Scrivi il contenuto del template nel nuovo file JavaScript
  fs.writeFileSync(newFilePath, templateContent);

  return `File "${templateName}.js" creato sul desktop`;
}



module.exports = {
  log,
  random,
  date,
  hour,
  addFile,
  deleteFile,
  renameFile,
  communicateWithArduino,
  writeInFile,
  load
};