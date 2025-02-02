const { Telegraf } = require('telegraf');
const fs = require('fs');
const path = require('path');
const { TELEGRAM_BOT_TOKEN, REPO_LINK } = require('./config');
const { exec } = require('child_process');

const bot = new Telegraf(TELEGRAM_BOT_TOKEN);

const premFilePath = path.join(__dirname, './JSON/prem.json');
const tokensFilePath = path.join(__dirname, './JSON/tokens.json');

// Function to get premium users from the prem.json file
function getPremiumUsers() {
  try {
    return JSON.parse(fs.readFileSync(premFilePath, 'utf8'));
  } catch {
    return [];
  }
}

// Function to check if a user is a premium user
function isPremiumUser(userId) {
  return getPremiumUsers().includes(userId);
}

// Function to create a user folder if it doesn't exist
function createUserFolder(userId) {
  const folderPath = path.join(__dirname, 'user_folders', userId.toString());
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
    console.log(`Created user folder: ${folderPath}`);
  } else {
    console.log(`User folder already exists: ${folderPath}`);
  }
  return folderPath;
}

// Function to check if a user's folder is empty
function isUserFolderEmpty(userFolderPath) {
  return fs.readdirSync(userFolderPath).length === 0;
}

// Function to calculate the bot's uptime
function upTime() {
  const uptime = process.uptime();
  const hours = Math.floor(uptime / 3600);
  const minutes = Math.floor((uptime % 3600) / 60);
  const seconds = Math.floor(uptime % 60);
  return `${hours}h ${minutes}m ${seconds}s`;
}

// Function to run "npm start" in the user's folder and capture output
function runNpmStartInDir(userFolderPath, ctx) {
  return new Promise((resolve, reject) => {
    const process = exec('yarn start', { cwd: userFolderPath });

    let output = ''; // To store the output

    // Capture stdout
    process.stdout.on('data', (data) => {
      output += data;
      ctx.reply(`Output: ${data}`); // Send real-time output to the user
    });

    // Capture stderr
    process.stderr.on('data', (data) => {
      output += data;
      ctx.reply(`Error: ${data}`); // Send real-time errors to the user
    });

    // Handle process completion
    process.on('close', (code) => {
      if (code === 0) {
        resolve('Application started successfully.');
      } else {
        reject(`Process exited with code ${code}. Output: ${output}`);
      }
    });
  });
}

// Function to clone the repository into the user's folder
function cloneRepository(userFolderPath) {
  return new Promise((resolve, reject) => {
    exec(`git clone ${REPO_LINK} .`, { cwd: userFolderPath }, (error) => {
      if (error) {
        console.error(`Error cloning repository: ${error.message}`);
        reject('Error cloning repository. Please try again.');
      } else {
        console.log(`Repository cloned successfully into: ${userFolderPath}`);
        resolve('Repository cloned successfully.');
      }
    });
  });
}

// Bot command handlers
bot.on('text', async (ctx) => {
  try {
    const text = ctx.message.text.trim();
    const userId = ctx.from.id;
    const username = ctx.from.username || ctx.from.first_name || "User";
    const userFolderPath = createUserFolder(userId);
    const isPremium = isPremiumUser(userId);
    const ping = `${Math.floor(Math.random() * 50) + 50}ms`;
    const runtime = upTime();

    switch (true) {
      case text === '/start':
        const menu = `
 𝐃𝐄𝐌𝐎𝐍 𝐗 𝐌𝐀𝐃𝐀𝐑𝐀
┏━━━━━━━━━━━━━━
┃ ⎚ 𝙷𝙴𝙻𝙻𝙾 :  ${username}
┃ ⎚ 𝙿𝙸𝙽𝙶 : ${ping}
┃ ⎚ 𝚁𝚄𝙽𝚃𝙸𝙼𝙴 : ${runtime}
┃ ⎚ 𝙾𝚆𝙽𝙴𝚁 𝙽𝚄𝙼 : +2347041039367
┃ ⎚ 𝙾𝚆𝙽𝙴𝚁 𝙽𝙰𝙼𝙴 : 𝕯𝖊𝖛𝖎𝖑 𝖘𝖎𝖆𝖒
┗━━━━━━━━━━━━━━

𝗢𝗪𝗡𝗘𝗥 𝗖𝗠𝗗
┏━━━━━━━━━━━━━━
┃ 〆 /start
┃ 〆 /connect
┃ 〆 /status
┃ 〆 /ping
┃ 〆 /buyprem
┃ 〆 /redeem <token> 
┗━━━━━━━━━━━━━━
Developed by 𝕭𝖑𝖚𝖊𝖉𝖊𝖒𝖔𝖓`;

        await ctx.replyWithPhoto({ source: './images/test.jpg' }, { caption: menu });

        if (isPremium) {
          if (isUserFolderEmpty(userFolderPath)) {
            await ctx.reply("🔄 Cloning repository into your directory...");
            try {
              await cloneRepository(userFolderPath);
              await ctx.reply("✅ Repository cloned successfully. You can now start the app.");
            } catch (error) {
              await ctx.reply(`⚠️ Error: ${error}`);
            }
          } else {
            await ctx.reply("⚠️ Your directory already contains files. Installation skipped.");
          }
        } else {
          await ctx.reply("❌ You are not a premium user. Contact the owner.");
        }
        break;

      case text === '/status':
        await ctx.reply(isPremium ? "✅ You are a premium user!" : "❌ You are not a premium user. Contact the owner.");
        break;

      case text === '/connect':
        if (!isPremium) {
          await ctx.reply("❌ You are not a premium user. Contact the owner.");
          return;
        }

        await ctx.reply('🔄 Running the application...');

        try {
          const result = await runNpmStartInDir(userFolderPath, ctx);
          await ctx.reply(result);
        } catch (error) {
          await ctx.reply(`⚠️ Error: ${error}`);
        }
        break;

      case text.startsWith('/redeem '):
        const token = text.split(' ')[1];
        if (!token) {
          await ctx.reply("❌ Please provide a valid token. Usage: `/redeem <token>`");
          return;
        }

        try {
          let tokens = JSON.parse(fs.readFileSync(tokensFilePath, 'utf8'));
          if (!tokens.includes(token)) {
            await ctx.reply("❌ Invalid token. Check and try again.");
            return;
          }

          tokens = tokens.filter(t => t !== token);
          fs.writeFileSync(tokensFilePath, JSON.stringify(tokens, null, 2));

          let premiumUsers = getPremiumUsers();
          if (!premiumUsers.includes(userId)) {
            premiumUsers.push(userId);
            fs.writeFileSync(premFilePath, JSON.stringify(premiumUsers, null, 2));
          }

          await ctx.reply("✅ Token redeemed! You are now a premium user.");
        } catch (error) {
          await ctx.reply("⚠️ Error redeeming token. Please try again later.");
        }
        break;

      case text === '/ping':
        await ctx.reply(`🏓 Pong! Your ping is ${ping}`);
        break;

      case text === '/buyprem':
        await ctx.reply("📩 MESSAGE THE OWNER", {
          reply_markup: {
            inline_keyboard: [
              [{ text: "💬 Contact Owner", url: "https://wa.me/2347041039367" }]
            ]
          }
        });
        break;

      default:
        await ctx.reply("❌ Unknown command. Use /start to see available commands.");
        break;
    }
  } catch (error) {
    await ctx.reply("⚠️ An unexpected error occurred. Please try again later.");
  }
});

// Start the bot
bot.launch()
  .then(() => console.log('Bot is running...'))
  .catch((err) => console.error('Error starting bot:', err));

// Handle graceful shutdown
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));