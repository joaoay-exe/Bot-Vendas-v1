import { ActionRowBuilder, ButtonBuilder, EmbedBuilder } from "discord.js";
import { JsonDatabase } from "wio.db";
const db = new JsonDatabase({ databasePath: './Json/configuracao' });

export async function FormasDePagamento({ client }) {
    const Embed = new EmbedBuilder()
        .setAuthor({ name: 'Gerenciamento de Pagamentos', iconURL: client.user.displayAvatarURL() })
        .setColor('Aqua')
        .addFields({ name: 'Mercado pago API', value: `${db.get('SystemVendas.ApiMP') == null ? `\`\`\`APP_USR-000000000000000-XXXXXXX-XXXXXXXXX\`\`\`` : `\`\`\`${configuracao.get(`pagamentos.MpAPI`)}\`\`\``}`, inline: true })
        .addFields({ name: 'Bancos Bloqueiados', value: `\`\`\`Não configurado\`\`\``, inline: true })

    const Action = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId('Button/DefinirChave')
                .setStyle(2)
                .setLabel('Definir Chave pix')
                .setEmoji('1193427093158105129'),

            new ButtonBuilder()
                .setCustomId('Button/DefinirAPIMP')
                .setStyle(2)
                .setLabel('Definir API MP')
                .setEmoji('1178086608004722689'),

            new ButtonBuilder()
                .setCustomId('Button/BackVoltarConfigPayments')
                .setStyle(2)
                .setLabel('Voltar')
                .setEmoji('1178068047202893869')
        )
    if (db.get('SystemVendas.Status') == true) {
        Embed.addFields({ name: `Chave pix`, value: `\`\`\`${db.get('SystemVendas.ChavePix')}\`\`\``, inline: true })
    }
    return { embeds: [Embed], components: [Action] }
}