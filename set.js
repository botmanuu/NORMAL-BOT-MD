const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNkk2M3FFN3ppTERuYU5VR09XM1p5RzFHTm1DUyttZWRIMWZHMkFibmhHTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVVNmZm85Q2dWclBIczY1T0dEclozRlhqKzN1azl0d0J4MHJIeHhpVDMyZz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJFRDgzWTJwWjdzekRxbUNyL2NmTFA5NUV1UW45N1J3OEYzTVlSY1FTQ1dBPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI1akM1MjB4YlY1NHdRVGFDK0tWYmk5U2pHbXd6d2dsMnozR3NoakZyb0g0PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImdPYVJjM2wyYi9ienR5dEpOWVlCTjcwTGtVQ1NHd3Zza2tuRHZ4bkozM289In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlIzNXhXWEsyUGkxN2FaaEVsYXV5NkU2TW5CbDY5b2JwMDZ0aWlZWjFJVTQ9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidUhjSS9BTGpQK1ZTRW5XYXdhb0xuSmVaRUZQQzFqb2xLTmVJNG1wU1JYQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMUdFRVYyRHNuVXYzb0xQaEl4OWd1Zy8yVXJDc0pFWHlQcHBWNUdFdEhEVT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InBIWVR2ZkgyaldZRWRQNE1ta1ZFNWdCRkdJQlhLSkNnY0g5eFdERzkzTWM5M1N6MjFhVXBIbUxqU3B4U21RbXdRbU93VkU2QXJYMFNFY2VDOHgyYkJnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NjUsImFkdlNlY3JldEtleSI6IlZtODNmaUJjS1F5bkJJUmFQeTlYdXBhU0JnUnR2ejVLR01aSkh1dzFMaWM9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IlN4QnZ4RElaU0k2MkxqOGFYd3RyenciLCJwaG9uZUlkIjoiMjU1NjI5NmEtYTQ0Yy00NzM1LTlmNjEtNzU2MWUwMzcxMzgyIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IncyOTI2dEk5czVNUXdnSXZXeHNGYUp1aDNYMD0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI1c280RE1XTDhVOHc5ejZjR0x0R0pLd2ZYdU09In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiS0c3V0JMUEYiLCJtZSI6eyJpZCI6Ijk0NzU5MzI5MDIzOjYwQHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNMVDB4TXNERU1Hc3c3a0dHQWtnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJWTFFWTUJNOXJhVmtBaEZ2eU5qRmNjMWp4bFhWU1ZpWTRDVlRsQ2REUmhvPSIsImFjY291bnRTaWduYXR1cmUiOiJMSkFxN1pXWHViSzNpZ05pYUNsQTA1SkxEeTVsVjRBbXIrT0VScjJZeWNqNUNYc1QvbTdCNUxOSEZMOWFFVy9rSXBVNEREeE9Na0R2RmpjcG40ZU5Edz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiei9IOWpFTlJYdkVRVnJxeTIvNGtFS0s0bmRMMkNia0lJVmpjR2J6RjRiV2R3MzB2Sis1UnNnclE1NytUTXlIbXpqYTQ3Y0JKYmdiQUhrZlcvalJNQmc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI5NDc1OTMyOTAyMzo2MEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJWUzBGVEFUUGEybFpBSVJiOGpZeFhITlk4WlYxVWxZbU9BbFU1UW5RMFlhIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzMxMjUzODM4LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUVEWSJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "VIHAGA MD",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " VIHAGA MD",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'VIHAGA_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
