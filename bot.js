const { Telegraf } = require('telegraf');
const fs = require('fs').promises;
const path = require('path');
const { TELEGRAM_BOT_TOKEN, REPO_LINK } = require('./config');
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);
const bot = new Telegraf(TELEGRAM_BOT_TOKEN);

const premFilePath = path.join(__dirname, './json/prem.json');

async function isPremiumUser(userId) {
  try {
    const data = await fs.readFile(premFilePath, 'utf8');
    const premiumUsers = JSON.parse(data);
    return premiumUsers.includes(userId);
  } catch (error) {
    console.error('Error reading premium users file:', error);
    return false;
  }
}

async function createUserFolder(userId) {
  const folderPath = path.join(__dirname, 'user_folders', userId.toString());
  await fs.mkdir(folderPath, { recursive: true });
  return folderPath;
}

async function cloneRepository(userFolderPath) {
  try {
    await execPromise(`git clone ${REPO_LINK} .`, { cwd: userFolderPath });
    console.log(`Repository cloned into ${userFolderPath}`);
  } catch (error) {
    console.error('Error cloning repository:', error);
    throw new Error('Failed to clone repository.');
  }
}

async function createSessionFolder(userFolderPath) {
  const sessionFolderPath = path.join(userFolderPath, 'session');
  await fs.mkdir(sessionFolderPath, { recursive: true });
  return sessionFolderPath;
}

async function createCredsFile(sessionFolderPath, content) {
  const credsFilePath = path.join(sessionFolderPath, 'creds.json');
  await fs.writeFile(credsFilePath, content);
  return credsFilePath;
}

async function runNpmStart(userFolderPath) {
  try {
    await execPromise('npm start', { cwd: userFolderPath });
    console.log(`npm start executed in ${userFolderPath}`);
  } catch (error) {
    console.error('Error running npm start:', error);
    throw new Error('Failed to execute npm start.');
  }
}

async function deleteSessionFolder(userFolderPath) {
  const sessionFolderPath = path.join(userFolderPath, 'session');
  try {
    await fs.rm(sessionFolderPath, { recursive: true, force: true });
    console.log(`Session folder deleted at ${sessionFolderPath}`);
    return true;
  } catch (error) {
    console.error('Error deleting session folder:', error);
    return false;
  }
}

function upTime() {
  const uptime = process.uptime();
  const hours = Math.floor(uptime / 3600);
  const minutes = Math.floor((uptime % 3600) / 60);
  const seconds = Math.floor(uptime % 60);
  return `${hours}h ${minutes}m ${seconds}s`;
}

let awaitingContent = {};

bot.on('text', async (ctx) => {
  try {
    const text = ctx.message.text.trim();
    const userId = ctx.from.id;

    if (awaitingContent[userId]) {
      const userFolderPath = path.join(__dirname, 'user_folders', userId.toString());
      const sessionFolderPath = path.join(userFolderPath, 'session');
      
      try {
        const credsFilePath = await createCredsFile(sessionFolderPath, text);
        awaitingContent[userId] = false;
        await ctx.reply(`✅ creds.json stored successfully.`);

        // Run npm start
        await ctx.reply("🔄 starting bot👀");
        await runNpmStart(userFolderPath);
        await ctx.reply("✅ npm start executed successfully.");
      } catch (error) {
        console.error('Error storing content or running npm start:', error);
        awaitingContent[userId] = false;
        await ctx.reply("⚠️ Failed to store content or run npm start. Please try again.");
      }
      return;
    }

    switch (true) {
      case text === '/start':
        const startMessage = `
┏━『 ★SUPREME LORDS★ 』━┓
Dev     : 𝚃𝙰𝙸𝚁𝙰 𝙼𝙰𝙺𝙸𝙽𝙾
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
    Available Commands:
    ◈  /addsession
    ◈  /delsession
    ◈  /status
    ◈  /eval <code here>
    ◈  /uptime
    ◈  /ping
▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄`;

        await ctx.replyWithPhoto({ source: './images/shadow.jpg' }, { caption: startMessage });
        break;

      case text === '/uptime':
        const runtime = upTime();
        await ctx.reply(`⏱ Bot Uptime: ${runtime}`);
        break;

      case text === '/ping':
        const ping = `${Math.floor(Math.random() * 50) + 50}ms`;
        await ctx.reply(`🏓 Pong! Your ping is ${ping}`);
        break;

      case text === '/status':
        const isPremium = await isPremiumUser(userId);
        await ctx.reply(isPremium ? "✅ You are a premium user!" : "❌ You are not a premium user. Contact the owner.");
        break;

      case text === '/addsession':
  const isPremiumForAdd = await isPremiumUser(userId);
  if (!isPremiumForAdd) {
    await ctx.reply("❌ This command is only available for premium users. Contact the owner.");
    break;
  }

  const userFolderPath = await createUserFolder(userId);

  try {
    await ctx.reply("🔄 Setting up files...");
    await cloneRepository(userFolderPath);
    await ctx.reply("✅ DONE");

    const sessionFolderPath = await createSessionFolder(userFolderPath);
    awaitingContent[userId] = true;
    await ctx.reply(`📂 Session directory created. Please send your creds.json file:`);
  } catch (error) {
    console.error('Error during /addsession:', error);
    await ctx.reply("⚠️ Failed to setup files. Please try again.");
  }
  break;

case text === '/delsession':
  const isPremiumForDel = await isPremiumUser(userId);
  if (!isPremiumForDel) {
    await ctx.reply("❌ This command is only available for premium users. Contact the owner.");
    break;
  }

  const userFolder = path.join(__dirname, 'user_folders', userId.toString());
  const deleted = await deleteSessionFolder(userFolder);
  if (deleted) {
    await ctx.reply("🗑 Session folder deleted successfully.");
  } else {
    await ctx.reply("⚠️ Failed to delete session folder. It may not exist.");
  }
  break;

      default:
        await ctx.reply("🚫 Unknown command. Use /start to see available commands.");
        break;
    }
  } catch (error) {
    console.error('Error in message handler:', error);
    awaitingContent[ctx.from.id] = false;
    await ctx.reply("⚠️ An unexpected error occurred. Please try again later.");
  }
});

bot.launch().then(() => console.log('Bot is running...')).catch((err) => console.error('Error starting bot:', err));

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

process.on('uncaughtException', (error) => console.error('Uncaught Exception:', error));
process.on('unhandledRejection', (reason) => console.error('Unhandled Rejection:', reason));

console.log('Bot script loaded and ready to run.');