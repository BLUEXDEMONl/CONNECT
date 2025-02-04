/*
If you want to recode, please give credit😩
© powered by Sir toya
*/
//♡[ Toya And Rehman]♡
const fs = require('fs');
const { Telegraf } = require('telegraf');
const obfuscateCode = require('./toyaenc');
const axios = require('axios');

// Setup bot token and owner ID
const TOKEN = '7278588122:AAG2Joa9TT7pOjPb-nDw5LJUBl8Oi9OoGwQ';  // Replace with your bot token
const OWNER_ID = '6573270131'; // Replace with your owner ID
const bot = new Telegraf(TOKEN);


//JANGAN UBAH TAKUTNYA ERROR
let userSessions = {};

function getRuntime() {
  const uptime = process.uptime(); // Waktu aktif dalam detik
  const days = Math.floor(uptime / (24 * 3600)); // Menghitung hari
  const hours = Math.floor((uptime % (24 * 3600)) / 3600); // Menghitung jam
  const minutes = Math.floor((uptime % 3600) / 60); // Menghitung menit
  const seconds = Math.floor(uptime % 60); // Menghitung detik
  
  return `${days} Hours ${hours} minute ${minutes} second`;
}
// ASCII Art for bot startup
const asciiArt = ` 
⣿⣿⣷⡁⢆⠈⠕⢕⢂⢕⢂⢕⢂⢔⢂⢕⢄⠂⣂⠂⠆⢂⢕⢂⢕⢂⢕⢂⢕⢂
⣿⣿⣿⡷⠊⡢⡹⣦⡑⢂⢕⢂⢕⢂⢕⢂⠕⠔⠌⠝⠛⠶⠶⢶⣦⣄⢂⢕⢂⢕
⣿⣿⠏⣠⣾⣦⡐⢌⢿⣷⣦⣅⡑⠕⠡⠐⢿⠿⣛⠟⠛⠛⠛⠛⠡⢷⡈⢂⢕⢂
⠟⣡⣾⣿⣿⣿⣿⣦⣑⠝⢿⣿⣿⣿⣿⣿⡵⢁⣤⣶⣶⣿⢿⢿⢿⡟⢻⣤⢑⢂
⣾⣿⣿⡿⢟⣛⣻⣿⣿⣿⣦⣬⣙⣻⣿⣿⣷⣿⣿⢟⢝⢕⢕⢕⢕⢽⣿⣿⣷⣔
⣿⣿⠵⠚⠉⢀⣀⣀⣈⣿⣿⣿⣿⣿⣿⣿⣿⣿⣗⢕⢕⢕⢕⢕⢕⣽⣿⣿⣿⣿
⢷⣂⣠⣴⣾⡿⡿⡻⡻⣿⣿⣴⣿⣿⣿⣿⣿⣿⣷⣵⣵⣵⣷⣿⣿⣿⣿⣿⣿⡿
⢌⠻⣿⡿⡫⡪⡪⡪⡪⣺⣿⣿⣿⣿⣿⠿⠿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠃
⠣⡁⠹⡪⡪⡪⡪⣪⣾⣿⣿⣿⣿⠋⠐⢉⢍⢄⢌⠻⣿⣿⣿⣿⣿⣿⣿⣿⠏⠈
⡣⡘⢄⠙⣾⣾⣾⣿⣿⣿⣿⣿⣿⡀⢐⢕⢕⢕⢕⢕⡘⣿⣿⣿⣿⣿⣿⠏⠠⠈
⠌⢊⢂⢣⠹⣿⣿⣿⣿⣿⣿⣿⣿⣧⢐⢕⢕⢕⢕⢕⢅⣿⣿⣿⣿⡿⢋⢜⠠⠈
⠄⠁⠕⢝⡢⠈⠻⣿⣿⣿⣿⣿⣿⣿⣷⣕⣑⣑⣑⣵⣿⣿⣿⡿⢋⢔⢕⣿⠠⠈
⠨⡂⡀⢑⢕⡅⠂⠄⠉⠛⠻⠿⢿⣿⣿⣿⣿⣿⣿⣿⣿⡿⢋⢔⢕⢕⣿⣿⠠⠈
⠄⠪⣂⠁⢕⠆⠄⠂⠄⠁⡀⠂⡀⠄⢈⠉⢍⢛⢛⢛⢋⢔⢕⢕⢕⣽⣿⣿⠠⠈

• Created By Toya♡Rehman
• t.me/o_tyn
• wa.me/2347068599513
> Bot Is Connect                   
`;

// Log ASCII art to console
console.log(asciiArt);

// Start the bot
bot.start((ctx) => {
const firstName = ctx.from.first_name || 'Unknown'; // Nama depan pengguna
const lastName = ctx.from.last_name || ''; // Nama belakang 

  // URL foto yang akan dikirim
  ctx.replyWithPhoto('https://files.catbox.moe/x1a8j8.jpg', {
    caption: `
*Hi*, ${firstName} ${lastName}
> I'm *Toya* 
This Bot Telegram With Type JavaScript
Developed By Sir Toya

🇪🇬 ⌜information Dev⌟
╎ 🤓 : *Developer: Toya*
╎ 🤓 : *BotName: Enc Bot Toya v1*
╎ 🤓 : *Version: 1.0*
╎ 🤓 : *Type: Case*
╎ 🤓 : *Prefix: Multi*
╎ 🤓 : *runtime: ${getRuntime()}*
╰╌╌╌╌╌╌╌╌╌╌╌╌╌⌯

🇪🇬 ⌜ 𝐓𝐎𝐎𝐋𝐒 𝐌𝐄𝐍𝐔 ⌟ 
╎ 🤓 : /enctoyamenu 
╰╌╌╌╌╌╌╌╌╌╌╌╌╌⌯

🇪🇬 ⌜ 𝐒𝐓𝐀𝐓𝐔𝐒 ⌟ 
╎ 🤓 : /info 
╰╌╌╌╌╌╌╌╌╌╌╌╌╌⌯`,
    reply_markup: {
      inline_keyboard: [
        [
            { text: '𝐂𝐑𝐄𝐀𝐓𝐎𝐑', url: 'wa.me/2347068599513' }
        ]
      ]
    },
    parse_mode: "Markdown"
  });
});

// Obfuscation menu
bot.command('enctoyamenu', (ctx) => {
const firstName = ctx.from.first_name || 'Unknown'; // Nama depan pengguna
const lastName = ctx.from.last_name || ''; // Nama belakang 
  // URL foto yang akan dikirim
  ctx.replyWithPhoto('https://files.catbox.moe/x1a8j8.jpg', {
    caption: `
*Hi*, ${firstName} ${lastName}
> I'm *Toya* 
This Is Menu For Obf javascript 
Created By Sir Toya

🇪🇬 ⌜information User⌟
╎ 🤓 : *Developer: Toya*
╎ 🤓 : *BotName: Enc bot Toya*
╎ 🤓 : *Version: 1.0*
╎ 🤓 : *Type: Case*
╎ 🤓 : *Prefix: Multi*
╎ 🤓 : *runtime: ${getRuntime()}*
╰╌╌╌╌╌╌╌╌╌╌╌╌╌⌯

🇪🇬 ⌜ Enc Menu ⌟ 
╎ 🤓 : /obf1 - Var [HardObf!]
╎ 🤓 : /obf2 - Var [ExtremeObf!]
╎ 🤓 : /obf3 - DeadCode [ExtremeObf!]
╎ 🤓 : /obf4 - EncCode [ExtremeObf!!]
╎ 🤓 : /obf5 - ABCD [HardObf!]
╎ 🤓 : /obf6 - Name [ExtremeObf!!]
╎ 🤓 : /obf7 - Name [ExtremeObf!!]
╎ 🤓 : /obf8 - Name [ExtremeObf!]
╎ 🤓 : /obf9 - Crass [HardObf!]
╰╌╌╌╌╌╌╌╌╌╌╌╌╌⌯
> Send your .js file after selecting the obfuscation type.`,
   reply_markup: {
      inline_keyboard: [
        [
            { text: '𝐂𝐑𝐄𝐀𝐓𝐎𝐑', url: 'wa.me/2347068599513' }
        ]
      ]
    },
    parse_mode: "Markdown"
  });
});


// Handler untuk perintah /info
bot.command('info', (ctx) => {
  const username = ctx.from.username || 'Unknown'; // Nama pengguna
  const firstName = ctx.from.first_name || 'Unknown'; // Nama depan pengguna
  const lastName = ctx.from.last_name || ''; // Nama belakang pengguna
  const userId = ctx.from.id; // ID pengguna

  // Kirimkan pesan info kepada pengguna
  ctx.reply(`
🇪🇬 ⌜𝐈𝐍𝐅𝐎 𝐔𝐒𝐄𝐑⌟
╎ Username: @${username}
╎ User ID: ${userId}
╰╌╌╌╌╌╌╌╌╌╌╌╌╌⌯
♱ ⌜𝐂𝐎𝐍𝐓𝐀𝐂𝐓 𝐃𝐄𝐕𝐄𝐋𝐎𝐏𝐄𝐑⌟
╎ Developer: Pak Toya
╎ Contact: https://t.me/o_tyn
╎ Contact: https://wa.me/2347068599513
╰╌╌╌╌╌╌╌╌╌╌╌╌╌⌯`);
});
//OBF CMD
bot.command('obf1', (ctx) => {
    const userId = ctx.from.id.toString();
   const firstName = ctx.from.first_name || 'Unknown'; // Nama depan pengguna
const lastName = ctx.from.last_name || ''; // Nama belakang 

    userSessions[userId] = { obfuscationType: 'obf1' };
    ctx.reply(`
Hi, ${firstName} ${lastName}
> I'm Toya
Please send your .js file for Obfuscation
(Rename All Variable Var)

🇪🇬 ⌜𝐒𝐓𝐀𝐓𝐔𝐒⌟
╎ 🤓 : Waiting Your Sent File.
╰╌╌╌╌╌╌╌╌╌╌╌╌╌⌯`);
});

// Command for obfuscation type obf2 (Hexadecimal Anti Dec)
bot.command('obf2', (ctx) => {
    const userId = ctx.from.id.toString();
const firstName = ctx.from.first_name || 'Unknown'; // Nama depan pengguna
const lastName = ctx.from.last_name || ''; // Nama belakang 
   

    userSessions[userId] = { obfuscationType: 'obf2' };
    ctx.reply(`
Hi, ${firstName} ${lastName}
> I'm Toya
Please send your .js file for Obfuscation
(Hexadecimal Anti Dec).

🇪🇬 ⌜𝐒𝐓𝐀𝐓𝐔𝐒⌟
╎ 🤓 : Waiting Your Sent File.
╰╌╌╌╌╌╌╌╌╌╌╌╌╌⌯`);
});

// Command for obfuscation type obf3 (Random Deadcode)
bot.command('obf3', (ctx) => {
    const userId = ctx.from.id.toString();
const firstName = ctx.from.first_name || 'Unknown'; // Nama depan pengguna
const lastName = ctx.from.last_name || ''; // Nama belakang 
   

    userSessions[userId] = { obfuscationType: 'obf3' };
    ctx.reply(`
Hi, ${firstName} ${lastName}
> I'm Toya
Please send your .js file for Obfuscation
(Random Deadcode).

🇪🇬 ⌜𝐒𝐓𝐀𝐓𝐔𝐒⌟
╎ 🤓 : Waiting Your Sent File.
╰╌╌╌╌╌╌╌╌╌╌╌╌╌⌯`);
});

// Command for obfuscation type obf4 (Return Obfuscation)
bot.command('obf4', (ctx) => {
    const userId = ctx.from.id.toString();
const firstName = ctx.from.first_name || 'Unknown'; // Nama depan pengguna
const lastName = ctx.from.last_name || ''; // Nama belakang 
   

    userSessions[userId] = { obfuscationType: 'obf4' };
    ctx.reply(`
Hi, ${firstName} ${lastName}
> I'm Toya
Please send your .js file for Obfuscation
(Random Enccode).


🇪🇬 ⌜𝐒𝐓𝐀𝐓𝐔𝐒⌟
╎ 🤓 : Waiting Your Sent File.
╰╌╌╌╌╌╌╌╌╌╌╌╌╌⌯`);
});

//mangled
bot.command('obf5', (ctx) => {
    const userId = ctx.from.id.toString();
const firstName = ctx.from.first_name || 'Unknown'; // Nama depan pengguna
const lastName = ctx.from.last_name || ''; // Nama belakang 
   

    userSessions[userId] = { obfuscationType: 'obf5' };
    ctx.reply(`
Hi, ${firstName} ${lastName}
> I'm Toya
Please send your .js file for
Mangled Obfuscation (Type 5)

🇪🇬 ⌜𝐒𝐓𝐀𝐓𝐔𝐒⌟
╎ 🤓 : Waiting Your Sent File.
╰╌╌╌╌╌╌╌╌╌╌╌╌╌⌯`);
});

bot.command('obf6', (ctx) => {
    const userId = ctx.from.id.toString();
const firstName = ctx.from.first_name || 'Unknown'; // Nama depan pengguna
const lastName = ctx.from.last_name || ''; // Nama belakang 
   

    userSessions[userId] = { obfuscationType: 'obf6' };
             ctx.reply(`
Hi, ${firstName} ${lastName}
> I'm Toya
Please send your .js file for 
Mangled Obfuscation (Type 6).

🇪🇬 ⌜𝐒𝐓𝐀𝐓𝐔𝐒⌟
╎ 🤓 : Waiting Your Sent File.
╰╌╌╌╌╌╌╌╌╌╌╌╌╌⌯`);
});

bot.command('obf7', (ctx) => {
    const userId = ctx.from.id.toString();
const firstName = ctx.from.first_name || 'Unknown'; // Nama depan pengguna
const lastName = ctx.from.last_name || ''; // Nama belakang 
   

    userSessions[userId] = { obfuscationType: 'obf7' };
 ctx.reply(`
Hi, ${firstName} ${lastName}
> I'm Toya
Please send your .js file for
Mangled Obfuscation (Type 7).

🇪🇬 ⌜𝐒𝐓𝐀𝐓𝐔𝐒⌟
╎ 🤓 : Waiting Your Sent File.
╰╌╌╌╌╌╌╌╌╌╌╌╌╌⌯`);
});

bot.command('obf8', (ctx) => {
    const userId = ctx.from.id.toString();
const firstName = ctx.from.first_name || 'Unknown'; // Nama depan pengguna
const lastName = ctx.from.last_name || ''; // Nama belakang 
   

    userSessions[userId] = { obfuscationType: 'obf8' };
    ctx.reply(`
Hi, ${firstName} ${lastName}
> I'm Toya
Please send your .js file for
Mangled Obfuscation (Type 8).

🇪🇬 ⌜𝐒𝐓𝐀𝐓𝐔𝐒⌟
╎ 🤓 : Waiting Your Sent File.
╰╌╌╌╌╌╌╌╌╌╌╌╌╌⌯`);
});

bot.command('obf9', (ctx) => {
    const userId = ctx.from.id.toString();
const firstName = ctx.from.first_name || 'Unknown'; // Nama depan pengguna
const lastName = ctx.from.last_name || ''; // Nama belakang 
   

    userSessions[userId] = { obfuscationType: 'obf9' };
ctx.reply(`
Hi, ${firstName} ${lastName}
> I'm Toya
Please send your .js file for
Mangled Obfuscation (Type 9).

🇪🇬 ⌜𝐒𝐓𝐀𝐓𝐔𝐒⌟
╎ 🤓 : Waiting Your Sent File.
╰╌╌╌╌╌╌╌╌╌╌╌╌╌⌯`);
});



function isOwner(userId) {
    return userId.toString() === OWNER_ID;
}

// Handle document uploads for premium users
bot.on('document', async (ctx) => {
    const userId = ctx.from.id.toString();

    const fileName = ctx.message.document.file_name;

    if (!fileName.endsWith('.js')) {
        return ctx.reply('❌ Please send a file with the .js extension.');
    }

    if (!userSessions[userId] || !userSessions[userId].obfuscationType) {
        return ctx.reply('❌ Please select an obfuscation type first using one of the commands.');
    }

    const obfuscationType = userSessions[userId].obfuscationType;

    //I LOVE YOU 

    await handleDocumentObfuscation(ctx, obfuscationType);
});

async function handleDocumentObfuscation(ctx, option) {
    const fileId = ctx.message.document.file_id;
    const firstName = ctx.from.first_name || 'Unknown'; 
    const lastName = ctx.from.last_name || ''; 
    const loadingMessage = await ctx.reply('Preparing obfuscation...');

    try {
        const fileLink = await ctx.telegram.getFileLink(fileId);
        const code = await downloadFile(fileLink);

        await ctx.telegram.editMessageText(ctx.chat.id, loadingMessage.message_id, undefined, 'Encrypting...');
        const obfuscatedCode = await obfuscateCode(code, option);

        await ctx.telegram.editMessageText(ctx.chat.id, loadingMessage.message_id, undefined, 'Sending file...');
        await ctx.replyWithDocument({ source: Buffer.from(obfuscatedCode), filename: 'EncToya.js' }, {
            caption: `
*Hi*, ${firstName} ${lastName}
> I'm *Toya* 
this is your file after Enc By Sir Toya

🇪🇬 ⌜𝐒𝐓𝐀𝐓𝐔𝐒⌟
╎ 🤓 : *Type: ${option}*
╎ 🤓 : *Enc complete!*
╰╌╌╌╌╌╌╌╌╌╌╌╌╌⌯`,
            parse_mode: 'Markdown'
        });

    } catch (error) {
        console.error('Error during obfuscation process:', error);
        await ctx.telegram.editMessageText(ctx.chat.id, loadingMessage.message_id, undefined, '❌ An error occurred during obfuscation.');
    }
}
 
 
 
async function downloadFile(fileLink) {
    try {
        const response = await axios.get(fileLink);
        return response.data;
    } catch (error) {
        console.error('Error downloading the file:', error);
        throw new Error('Failed to download the file');
    }
}


bot.launch();