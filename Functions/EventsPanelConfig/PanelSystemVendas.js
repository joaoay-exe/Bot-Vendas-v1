import { ActionRowBuilder, ButtonBuilder, EmbedBuilder } from "discord.js";

export async function PanelSystemVendas({ interaction }) {
    const MainEmbed = new EmbedBuilder()
        .setAuthor({ name: 'Manage', iconURL: interaction.guild.iconURL() })
        .setColor('Aqua')
        .setThumbnail(interaction.guild.iconURL())
        .setDescription(`- Olá, você está no painel de gerenciamento e criação de produtos, selecione uma das opções abaixo.`)
        .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL() })
        .setTimestamp();

    const MainRow = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId('Button/CreateProduct')
                .setStyle(2)
                .setLabel('Criar')
                .setEmoji('1178067873894236311'),

            new ButtonBuilder()
                .setCustomId("Button/ManageProduct")
                .setLabel('Gerenciar')
                .setEmoji(`1178067945855910078`)
                .setStyle(2),

            new ButtonBuilder()
                .setCustomId("Button/Backhome")
                .setLabel('Voltar')
                .setEmoji(`1178068047202893869`)
                .setStyle(2)

        )
    return { content: '', embeds: [MainEmbed], components: [MainRow] }
}
