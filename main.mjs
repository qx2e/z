import Discord from 'discord.js';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import { keepAlive } from './keep_alive.mjs'; 
dotenv.config();
keepAlive();
const cookies = process.env.COOKIES;
const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.MessageContent,
  ],
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);

  (async () => {
    try {
      await client.application.commands.create({ 
        name: 'start', 
        description: 'Start the server' 
      });
      console.log('Successfully registered the /start command');
    } catch (error) {
      console.error('Error registering commands:', error);
    }
  })();
});


client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'start') {

      await interaction.deferReply();
    try {
      const response = await fetch('https://magmanode.com/power?id=342072&action=start', {
        headers: {
          accept: '*/*',
          'accept-language': 'en-US,en;q=0.9',
          'cache-control': 'no-cache',
          pragma: 'no-cache',
          priority: 'u=1, i',
          'sec-ch-ua':
            '"Not)A;Brand";v="99", "Google Chrome";v="127", "Chromium";v="127"',
          'sec-ch-ua-arch': '""',
          'sec-ch-ua-bitness': '"64"',
          'sec-ch-ua-full-version': '"127.0.6533.73"',
          'sec-ch-ua-full-version-list':
            '"Not)A;Brand";v="99.0.0.0", "Google Chrome";v="127.0.6533.73", "Chromium";v="127.0.6533.73"',
          'sec-ch-ua-mobile': '?1',
          'sec-ch-ua-model': '"Nexus 5"',
          'sec-ch-ua-platform': '"Android"',
          'sec-ch-ua-platform-version': '"6.0"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'x-requested-with': 'XMLHttpRequest',
          Cookie: cookies,
          'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36', 
        },
        referrer: 'https://magmanode.com/server?id=342072',
        referrerPolicy: 'strict-origin-when-cross-origin',
        body: null,
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
        redirect: 'follow',
      });


      if (response.ok) {
        await interaction.editReply('Starting the server...');
      } else {
        await interaction.editReply('Server start failed :(');
      }

    } catch (error) {
      console.error('An error occurred:', error);
      await interaction.editReply('An error occurred while trying to start the server.');
    }
  }
});


client.login(process.env.DISCORD_TOKEN); 