const { TelegramClient } = require('telegram');
const { StringSession } = require('telegram/sessions');
const input = require('input');
require('dotenv').config();

const apiId = parseInt(process.env.API_ID); 
const apiHash = process.env.API_HASH;

if (!apiId || !apiHash) {
    console.error("❌ API_ID ou API_HASH não estão definidos no .env");
    process.exit(1);
}

(async () => {
    const stringSession = new StringSession(''); // Sessão vazia para gerar nova
    console.log(stringSession);
    const client = new TelegramClient(stringSession, apiId, apiHash, {
        connectionRetries: 5,
    });

    await client.start({
        phoneNumber: async () => await input.text('📲 Digite seu número com DDI: '),
        password: async () => await input.text('🔐 Senha 2FA (se tiver): '),
        phoneCode: async () => await input.text('💬 Código do Telegram: '),
        onError: (err) => console.error('❌ Erro durante login:', err),
    });

    console.log('\n✅ Login realizado com sucesso!');
        console.log(stringSession);
    console.log('\n🔑 StringSession gerada:\n');
    console.log('TELEGRAM_SESSION="' + client.session.save() + '"');

    process.exit(0);


})();