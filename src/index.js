// index.js
const fs = require('fs');
const path = require('path');
const SerialPort = require('serialport'); 
const ping = require('ping');
const nodemailer = require('nodemailer');
const { exec } = require('child_process');

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
    throw new Error(`The file ${fileName} alredy exist in ${folderPath}`);
  }

  // Crea il file vuoto nella cartella specificata
  fs.writeFileSync(filePath, '');

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
    } 
  });
}

function load(templateName) {
  let templateContent = '';

  // Determina il codice del template in base al nome
  if (templateName === 'template1') {
    templateContent = `
      const sp = require('simo.package');
      sp.log('This is the template 1');
    `;
  }
  }

  // Crea un nuovo file JavaScript sul desktop
  const desktopPath = require('os').homedir(); // Percorso della directory Desktop
  const newFilePath = path.join(desktopPath, `${templateName}.js`);

  // Scrivi il contenuto del template nel nuovo file JavaScript
  fs.writeFileSync(newFilePath, templateContent);

function calc(num1, num2) {
  if (typeof num1 !== 'number' || typeof num2 !== 'number') {
    throw new Error('The argoments must be numbers!');
  }
  
  return num1 + num2;
}

async function ping(host) {
  try {
    const response = await ping.promise.probe(host);
    if (response.alive) {
      return `Ping for ${host}: ${response.time} ms`;
    } else {
      return `Host ${host} not found!`;
    }
  } catch (error) {
    return `Error to ${host}: ${error.message}`;
  }
}

function open(filePath) {
  // Ottieni il percorso completo del file
  const fullPath = path.resolve(filePath);

  // Utilizza il comando "start" di Windows per aprire il file
  exec(`start "" "${fullPath}"`, (error, stdout, stderr) => {
      if (error) {
          console.error(`Error in the opening of the file: ${error.message}`);
          return;
      }
      if (stderr) {
          console.error(`Error in the opening of the file: ${stderr}`);
          return;
      }
      console.log(`File opened: ${filePath}`);
  });
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
  load,
  calc,
  ping,
  open,
};
