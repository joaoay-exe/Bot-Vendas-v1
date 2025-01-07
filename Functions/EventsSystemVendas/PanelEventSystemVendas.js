import { ActionRowBuilder, ModalBuilder, TextInputBuilder } from "discord.js"

export default async function PanelEventSystemVendas({ interaction }) {
    const modal = new ModalBuilder()
        .setCustomId('Modal/Product/Create')
        .setTitle('Criação')

    const Name = new TextInputBuilder()
        .setCustomId('Text/Name')
        .setLabel('Nome')
        .setPlaceholder('Insira o nome do produto')
        .setStyle(1)
        .setRequired(true);

    const Desc = new TextInputBuilder()
        .setCustomId('Text/Desc')
        .setLabel(`Descrição`)
        .setPlaceholder(`Insira uma descrição para seu produto`)
        .setStyle(2)
        .setRequired(true)
        .setMaxLength(1024);

    const Entrega = new TextInputBuilder()
        .setCustomId('Text/EntregaAuto')
        .setLabel(`Entrega Automática`)
        .setPlaceholder(`Digite "sim" ou "não"`)
        .setStyle(1)
        .setMaxLength(3)
        .setRequired(true);

    const Icon = new TextInputBuilder()
        .setCustomId('Text/Icon')
        .setLabel(`Icone (OPCIONAL)`)
        .setPlaceholder(`Insira uma URL de uma imagem ou gif`)
        .setStyle(1)
        .setRequired(false);

    const banner = new TextInputBuilder()
        .setCustomId('Text/Banner')
        .setLabel(`Banner (OPCIONAL)`)
        .setPlaceholder(`Insira uma URL de uma imagem ou gif`)
        .setStyle(1)
        .setRequired(false);

    const Action1 = new ActionRowBuilder().addComponents(Name);
    const Action2 = new ActionRowBuilder().addComponents(Desc);
    const Action3 = new ActionRowBuilder().addComponents(Entrega);
    const Action4 = new ActionRowBuilder().addComponents(Icon);
    const Action5 = new ActionRowBuilder().addComponents(banner);

    modal.addComponents(Action1, Action2, Action3, Action4, Action5);
    await interaction.showModal(modal);
}