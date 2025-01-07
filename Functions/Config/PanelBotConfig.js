import { ActionRowBuilder, ButtonBuilder, EmbedBuilder } from "discord.js";
const startTime = Date.now();

export async function PanelBotConfig({ interaction, client }) {
    const MainEmbed = new EmbedBuilder()
        .setAuthor({ name: interaction.client.user.username, iconURL: interaction.guild.iconURL() })
        .setThumbnail(interaction.guild.iconURL())
        .setColor('Aqua')
        .setDescription(`- O que o senhor(a) deseja configurar?`)
        .addFields({ name: `Versão`, value: `1.0.0`, inline: true })
        .addFields({ name: `Ping`, value: `\`${await interaction.client.ws.ping} MS\``, inline: true })
        .addFields({ name: `Uptime`, value: `<t:${Math.ceil(startTime / 1000)}:R>`, inline: true })
        .setFooter({ text: `© ${interaction.guild.name} - Todos os direitos reservados`, iconURL: interaction.guild.iconURL() })
        .setTimestamp()

    const MainRow = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId('Button/SystemVendas')
                .setLabel('Sistema de vendas')
                .setStyle(2)
                .setEmoji('1178064350066528266'),

            new ButtonBuilder()
                .setCustomId('Button/Definitions')
                .setLabel('Definições')
                .setStyle(2)
                .setEmoji('1178066377014255828')
        )
    return { embeds: [MainEmbed], components: [MainRow] }
}