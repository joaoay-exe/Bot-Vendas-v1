import { ActionRowBuilder, ButtonBuilder, EmbedBuilder } from "discord.js"

export async function PanelDefinitions({ interaction, client }) {
    const Embed = new EmbedBuilder()
        .setAuthor({ name: 'Painel de definições', iconURL: interaction.guild.iconURL() })
        .setThumbnail(interaction.guild.iconURL())
        .setDescription('- Olá, você está no painel de definições\nEscolha uma das opções abaixo.')
        .setColor('Aqua')
        .setFooter({ text: `© Todos direitos reservados `, iconURL: client.user.displayAvatarURL() })
        .setTimestamp();

    const PrimaryAction = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId('Button/ConfigPayment')
                .setLabel('Pagamentos')
                .setStyle(2)
                .setEmoji('1323447112255406191'),

            new ButtonBuilder()
                .setCustomId('Button/Perso')
                .setLabel('Personalização')
                .setStyle(2)
                .setEmoji('1178079212700188692'),

            new ButtonBuilder()
                .setCustomId("Button/Backhome")
                .setLabel('Voltar')
                .setEmoji(`1178068047202893869`)
                .setStyle(2)
        )
    return { content: '', embeds: [Embed], components: [PrimaryAction] }
}