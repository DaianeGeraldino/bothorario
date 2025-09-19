const Discord = require("discord.js");
const config = require("../config/config.js");

const intents = [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.MessageContent,
    Discord.GatewayIntentBits.GuildMembers,
];

const client = new Discord.Client({ 
    intents: intents 
});

client.on("ready", () => {
    console.log(`Bot foi iniciado, com ${client.users.cache.size} usuários, em ${client.channels.cache.size} canais e em ${client.guilds.cache.size} servidores`);
});

client.login(config.token);

module.exports = client;