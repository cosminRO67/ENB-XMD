const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV0luazRqZ09ZdWVzS1FrcFVoTFZnUWM4YWRnODdxMjhCTElILzk0d05Hdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiengzRHRFT0dSS3U1WmsreDV2dENNQ3Z4UTROWnRUcnFmeG1IQktPVVQzUT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJFR2FkS0JSeklsaURISDVyT3ZSYnFudCs5cTJvT2tWVDZrT2I5cC80d0ZFPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQUFHR2N5ai9tQll3T01OZlpFUGJ2UHVia1NwMmV2aU0vQnBiVTdpams4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjRMU250cVlhQXlMdU9JUnp5RnFKNWd6cm5iMTRxZVVnQldRTHdNY012MUE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ink2YjExdlNyV0VRZTZqY29NV2kvN1U0UVZHeElDMzFnUS8vVFByYkNnaFE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS05qZmd0N21FeGcxVDc1RXBtU2p1RXNBTUJWbE9SaEFSQVBJZXl3a1czaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTTBVemtrdU9LcWNOQTJmUWFhNVJmY2NoZHZuY0crcG9oQjgyMDdVM053Yz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkQwV0lDM056RHB1dU1NV0JhRTBudWx6Ri9xTXJKNHRRYWw3TkhnSjliL25XUDJmTmNsQmJCemQzNkw0bEQvbGpKZ3dpeGY2ZUhkUGM1RlVUOTF2L0RRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTcyLCJhZHZTZWNyZXRLZXkiOiJIZVlSUnF0SktVU2F0ZEpnYlhGYkRqK0ZoZ2VnQU41VTVNNHBWaEFmM3owPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJrOTh6Y2NCdlNIT3Q3bUtHUGpXUVR3IiwicGhvbmVJZCI6Ijc0N2I0MDUxLWUyM2MtNDAzMC1iZjY0LTA5OTlmZmVhYmU3NCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ0VnNEUys1eFY4TDQ5V1JCcTFjRHBibU5Lb0E9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQWd6cXhiVUpyZ1Q2Z2JhcHg5dVNzTVhTb3YwPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjFCSDFERENKIiwibWUiOnsiaWQiOiI0MDc3MDgxMTkyOTo3QHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNQYWg1UFFFRUtTR3hiNEdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJJV1J6bm80YnJjbWlXRUZzVUZiTmpueUtwOHo1SXZ6UVRZZ2xJVG5PMGhZPSIsImFjY291bnRTaWduYXR1cmUiOiJESHRVaDVkUnE1ZlZ4cE5FZUQ0a0ZMQ3NuamhqN1R6WktVc1d0NkQvSHlqSEZSOGRTc1hxdko2cW03ZEs3TElIOExFY2Y5VVVYQ3NrOUwzZmF5VFFBQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiNGV0N2xDR0NESWsvL0JkQ2pCZlorTEJZTE8rR1lrTHA2d09uNDB2UTN6c0hrN2hvWW8zSWQvWDhQNjJxTk5hSzVLdG5QNVR0NUxmeU1FMXkvK3JTQkE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI0MDc3MDgxMTkyOTo3QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlNGa2M1Nk9HNjNKb2xoQmJGQld6WTU4aXFmTStTTDgwRTJJSlNFNXp0SVcifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDE3Njc0NzMsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBTUk2In0=',
    PREFIXE: process.env.PREFIX || "+",
    GITHUB : process.env.GITHUB|| 'https://github.com/enbbrand84/ENB-XMD',
    OWNER_NAME : process.env.OWNER_NAME || "cosmin",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "0770811929, 0770811929",  
              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    AUTO_REACT: process.env.AUTO_REACTION || "non",  
    URL: process.env.URL || "https://files.catbox.moe/7ttvmj.jpg",  
    AUTO_REACT_STATUS: process.env.AUTO_REACT_STATUS || 'non',              
    CHATBOT: process.env.CHAT_BOT || "off",              
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "yes",
    AUTO_BLOCK: process.env.AUTO_BLOCK || 'no', 
    GCF: process.env.GROUP_HANDLE || 'no', 
    AUTO_REPLY : process.env.AUTO_REPLY || "no", 
    AUTO_STATUS_TEXT: process.env.AUTO_STATUS_TEXT || 'viewed by enb md',   
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || 'no',
    AUTO_BIO: process.env.AUTO_BIO || 'yes',       
    ANTI_CALL_TEXT : process.env.ANTI_CALL_MESSAGE || '',             
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029Vb2NqkvBPzjPEvFiYa0R",
    WEBSITE :process.env.GURL || "https://whatsapp.com/channel/0029Vb2NqkvBPzjPEvFiYa0R",
    CAPTION : process.env.CAPTION || "E.N.B-XMD",
    BOT : process.env.BOT_NAME || 'E.N.B-XMD⁠',
    MODE: process.env.PUBLIC_MODE || "public",              
    TIMEZONE: process.env.TIMEZONE || "Africa/Dodoma", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_API_KEY : process.env.HEROKU_API_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '5' ,
    ETAT : process.env.PRESENCE || '1',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTI_DELETE_MESSAGE : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTICALL: process.env.ANTICALL || 'yes',              
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

