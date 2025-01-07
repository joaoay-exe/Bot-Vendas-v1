import { ActionRowBuilder, ButtonBuilder, EmbedBuilder } from "discord.js"
import { JsonDatabase } from "wio.db";
const db = new JsonDatabase({ databasePath: './Json/configuracao'});

export async function PanelConfigPayments({ interaction, client }) {
    const Embed = new EmbedBuilder()
        .setAuthor({ name: 'Gerenciamento', iconURL: client.user.displayAvatarURL() })
        .setColor('Aqua')
        .setThumbnail(interaction.guild.iconURL())
        .setDescription('- Bem-vindo ao painel de configurações de pagamentos, selecione uma das opções abaixo para continuar.')
        .setFooter({ text: '© Todos os direitos reservados ', iconURL: client.user.displayAvatarURL() })


    const Action = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId('Button/ConnectSystemVendas')
            .setStyle(`${db.get('SystemVendas.Vendas')? 4 : 3 }`)
            .setLabel('Sistema Vendas')
            .setEmoji(`${db.get('SystemVendas.Vendas')? '1309540397332037765' : '1309540352818155584'}`),
            
            new ButtonBuilder()
            .setCustomId('Button/FormasDePayment')
            .setStyle(2)
            .setLabel('Formas de pagamento')
            .setEmoji('1193427093158105129'),

            new ButtonBuilder()
                .setCustomId('Button/BackDefinitions')
                .setLabel('Voltar')
                .setEmoji(`1178068047202893869`)
                .setStyle(2)
        )
    return { embeds: [Embed], components: [Action] }
}