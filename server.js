import * as dotenv from 'dotenv';
import fs from 'fs'
import path from 'path'
import Rcon from 'rcon';

dotenv.config();
const rcon = new Rcon(process.env.rconHost, process.env.rconPort, process.env.rconPassword);

rcon.connect();

const copyRecursive = (src, dest) => {
    const exist = fs.existsSync(src);
    const stats = exist && fs.statSync(src);
    const isDirectory = stats && stats.isDirectory();

    if(isDirectory) {
        if(!fs.existsSync(dest))
            fs.mkdirSync(dest);

        fs.readdirSync(src).forEach(childItemName => {
            if(childItemName !== 'session.lock')
                copyRecursive(path.join(src, childItemName), path.join(dest, childItemName));
        });
    } else {
        if(!fs.existsSync(dest))
            fs.copyFileSync(src, dest)
    }
}

const sendColoredMessage = (message, color) => {
    const coloredMessage = JSON.stringify({
        text: message,
        color: color
    })
    rcon.send(`tellraw @a ${coloredMessage}`)
}

const saveGame = () => {
    if (!fs.existsSync(process.env.backupPath)) {
        fs.mkdirSync(process.env.backupPath, { recursive: true });
        console.log('Created backup directory:', process.env.backupPath);
        sendColoredMessage('Server: A pasta de backup foi criada com sucesso!', 'blue')
    }
    copyRecursive(process.env.worldPath, path.join(process.env.backupPath, `save_${new Date().toISOString().replace(/[-:.]/g, '')}`))
    sendColoredMessage('Server: O mundo está sendo salvo!', 'green')
}

setInterval(saveGame, process.env.timeToBackUp)

rcon.on('auth', () => {
    console.log('RCON foi conectado!');
});


rcon.on('error', (error) => {
    console.error('Ocorreu um erro: ', error);
});

function disconnect() {
    rcon.disconnect();
}