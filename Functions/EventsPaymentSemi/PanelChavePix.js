import { ModalBuilder, TextInputBuilder } from "discord.js";

export async function PanelChavePix({ interaction }) {
    const modal = new ModalBuilder()
        .setTitle('Definição de PIX')
        .setCustomId('MyModal')

    const text1 = new TextInputBuilder()
        .setCustomId('text1')
        .setLabel('Chave Pix')
        .setPlaceholder('81-99271543')
        .setRequired(true)
        .setStyle(1)

}