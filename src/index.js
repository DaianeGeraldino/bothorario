const client = require("../src/events/ready.js");
const Discord = require("discord.js");
const config = require("../src/config/config.js");

client.on("guildCreate", guild => {
    console.log(`O bot entrou no servidor: ${guild.name} (id: ${guild.id}), População ${guild.memberCount} membros!`);
    client.user.setActivity(`Estou em ${client.guilds.cache.size} servidores`);
});

client.on("guildDelete", guild => {
    console.log(`O bot foi removido do servidor: ${guild.name} (id: ${guild.id})`);
    client.user.setActivity(`Estou em ${client.guilds.cache.size} servidores`);
});