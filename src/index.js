const client = require("../src/events/ready.js");
const config = require("../src/config/config.js");
const axios = require('axios');

client.on("guildCreate", guild => {
    console.log(`O bot entrou no servidor: ${guild.name} (id: ${guild.id}), População ${guild.memberCount} membros!`);
    client.user.setActivity(`Estou em ${client.guilds.cache.size} servidores`);
});

client.on("guildDelete", guild => {
    console.log(`O bot foi removido do servidor: ${guild.name} (id: ${guild.id})`);
    client.user.setActivity(`Estou em ${client.guilds.cache.size} servidores`);
});

client.on("messageCreate", async message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    if (!message.content.startsWith(config.prefix)) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const comando = args.shift().toLowerCase();

    if (comando === "ping") {
        const m = await message.channel.send("Ping?");
        m.edit(`Pong! A Latência é ${m.createdTimestamp - message.createdTimestamp}ms. A Latencia da API é ${Math.round(client.ws.ping)}ms`);
    }

        if (comando === "horario") {
        if (args.length === 0) {
            return message.reply("❌ Por favor, informe o número da linha. Exemplo: `!horario 0830`");
        }

        const numeroLinha = args[0];
        
        try {
            const response = await axios.get(`https://api.onibus.ceturb.es.gov.br/api/BuscaHorarios/${numeroLinha}`);
            const horarios = response.data;

            if (!horarios || horarios.length === 0) {
                return message.reply(`❌ Linha ${numeroLinha} não encontrada ou sem horários disponíveis.`);
            }

            const infoLinha = horarios[0];
            const nomeLinha = infoLinha.Descricao_Linha;

            const agora = new Date();
            const diaSemana = agora.getDay();
            const horaAtual = agora.getHours().toString().padStart(2, '0');
            const minutoAtual = agora.getMinutes().toString().padStart(2, '0');
            const tempoAtual = `${horaAtual}:${minutoAtual}`;

            let tipoHorarioFiltro;
            if (diaSemana === 0) {
                tipoHorarioFiltro = "DOMINGOS";
            } else if (diaSemana === 6) {
                tipoHorarioFiltro = "SÁBADOS";
            } else {
                tipoHorarioFiltro = "DIAS ÚTEIS";
            }

            const horariosPorTerminal = {};
            
            horarios.forEach(horario => {
                if (horario.Descricao_Hora === tipoHorarioFiltro) {
                    const terminal = horario.Desc_Terminal;
                    if (!horariosPorTerminal[terminal]) {
                        horariosPorTerminal[terminal] = [];
                    }
                    horariosPorTerminal[terminal].push(horario.Hora_Saida);
                }
            });

            const terminaisComHorarios = Object.keys(horariosPorTerminal);
            if (terminaisComHorarios.length === 0) {
                return message.reply(`❌ Não há horários para ${tipoHorarioFiltro.toLowerCase()} na linha ${numeroLinha}`);
            }

            let resposta = `🚌 **Linha ${numeroLinha} - ${nomeLinha}**\n`;
            resposta += `📅 ${tipoHorarioFiltro}\n\n`;

            terminaisComHorarios.forEach(terminal => {
                const horariosTerminal = horariosPorTerminal[terminal]
                    .filter(horario => horario > tempoAtual)
                    .sort((a, b) => a.localeCompare(b))
                    .slice(0, 3);

                if (horariosTerminal.length > 0) {
                    resposta += `📍 **${terminal}:**\n`;
                    
                    const [proxHora, proxMinuto] = horariosTerminal[0].split(':').map(Number);
                    const agoraMinutos = agora.getHours() * 60 + agora.getMinutes();
                    const proxMinutos = proxHora * 60 + proxMinuto;
                    const minutosRestantes = proxMinutos - agoraMinutos;

                    resposta += `⏰ **${horariosTerminal[0]}** (em ${minutosRestantes} min)\n`;
                    
                    if (horariosTerminal.length > 1) {
                        resposta += `↳ Próximos: ${horariosTerminal.slice(1).join(', ')}\n`;
                    }
                    resposta += '\n';
                }
            });

            message.reply(resposta);

        } catch (error) {
            console.error("Erro ao consultar API:", error);
            
            if (error.response && error.response.status === 404) {
                message.reply(`❌ Linha ${numeroLinha} não encontrada. Verifique o número e tente novamente.`);
            } else {
                message.reply("❌ Erro ao consultar horários. Tente novamente mais tarde.");
            }
        }
    }
});