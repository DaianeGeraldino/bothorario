# 🚌 Bot de Consulta de Horários de Ônibus

Um bot Discord para consultar horários de ônibus em tempo real usando a API oficial da CETURB-ES.

## ✨ Funcionalidades

- ✅ Consulta em tempo real dos horários de ônibus
- ✅ Mostra horários separados por terminal (ex: IFES, Terminal de Laranjeiras)
- ✅ Filtro automático por tipo de dia (Dias Úteis, Sábados, Domingos)
- ✅ Cálculo do tempo de espera em minutos
- ✅ Próximos 3 horários de cada terminal
- ✅ Tratamento de erros e mensagens amigáveis

## 🚀 Como usar

### Comando básico:
```
!horario <número_da_linha>
```

### Exemplos:
```
!horario 0830
!horario 510
!horario 800
```

### Resposta exemplo:
```
🚌 **Linha 0830 - CHÁCARA PARREIRAL / T LARANJEIRAS VIA PARQ. RESIDENCIAL LARANJEIRAS**
📅 DIAS ÚTEIS

📍 **IFES:**
⏰ **05:06** (em 15 min)
↳ Próximos: 05:22, 05:38

📍 **Terminal de Laranjeiras:**
⏰ **05:15** (em 24 min)
↳ Próximos: 05:30, 05:45
```

## ⚙️ Instalação

1. Instale as dependências:
```bash
npm install axios
```

2. Certifique-se de ter o arquivo de configuração em `../src/config/config.js` com:
```javascript
module.exports = {
    prefix: "!" 
};
```

## 🏗️ Estrutura do Projeto

```
/src
  /events
    ready.js          # Configuração do cliente Discord
  /config
    config.js         # Configurações do bot (prefixo, tokens)
```

## 🔧 Dependências

- `discord.js` - Biblioteca principal do Discord
- `axios` - Para fazer requisições HTTP à API da CETURB

## 📋 API Utilizada

- **Endpoint:** `https://api.onibus.ceturb.es.gov.br/api/BuscaHorarios/{linha}`
- **Formato:** JSON
- **Exemplo de resposta:**
```json
[
  {
    "Linha": "0830",
    "Hora_Saida": "04:50",
    "Terminal_Seq": 1,
    "TP_Horario": 1,
    "Descricao_Hora": "DIAS ÚTEIS",
    "Descricao_Linha": "CHÁCARA PARREIRAL / T LARANJEIRAS VIA PARQ. RESIDENCIAL LARANJEIRAS",
    "Desc_Terminal": "IFES",
    "Tipo_Orientacao": " ",
    "Dt_Inicio": "17/08/2025"
  }
]
```

## 🐛 Solução de Problemas

- **Linha não encontrada:** Verifique se o número da linha está correto
- **Erro de conexão:** A API pode estar temporariamente indisponível
- **Sem horários:** Pode não haver mais horários para o dia atual

## 📞 Suporte

Se encontrar problemas ou tiver sugestões, abra uma issue no repositório do projeto.

---

Desenvolvido para facilitar o acesso aos horários de ônibus do Espírito Santo 🚀
