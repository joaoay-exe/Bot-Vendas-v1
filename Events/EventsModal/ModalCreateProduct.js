import { JsonDatabase } from "wio.db";
import { ActionRowBuilder, ButtonBuilder } from "discord.js";
const db = new JsonDatabase({ databasePath: './Json/configuracao' });
const produto = new JsonDatabase({ databasePath: './Json/produtos' })

export default {
    name: 'interactionCreate',
    async run(interaction, client) {
        if (interaction.isModalSubmit()) {
            const { customId } = interaction

            if (customId == 'Modal/Product/Create') {
                if (!db.get('SystemVendas.Vendas')) return interaction.reply({ ephemeral: true, content: 'O sistema de vendas está desativado, Tente novamente.' });
                if (db.get('SystemVendas.Vendas')) {
                    let Name = interaction.fields.getTextInputValue('Text/Name')
                    let Desc = interaction.fields.getTextInputValue('Text/Desc')
                    let Entrega = interaction.fields.getTextInputValue('Text/EntregaAuto')
                    let Icon = interaction.fields.getTextInputValue('Text/Icon')
                    let Banner = interaction.fields.getTextInputValue('Text/Banner')

                    if (Desc == '') {
                        Desc = 'Não definido'
                    }
                    Name = Name.replace('.', '');

                    await interaction.update({ content: '🔄 Aguarde...', components: [], embeds: [] });

                    const Button = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId("Button/BackSystemVendas")
                                .setLabel('Voltar')
                                .setEmoji(`1178068047202893869`)
                                .setStyle(2)
                        );

                    if (produto.get(`${Name}`) !== null) return interaction.editReply({ ephemeral: true, content: 'Já existe um produto cadastrado com esse nome, tente novamente.', components: [Button] });

                    produto.set(`${Name}`, {
                        Config: {
                            Nome: Name,
                            Desc: Desc,
                            Entrega: Entrega,
                            icon: Icon,
                            banner: Banner
                        },
                        Selects: [],
                        Cupom: []
                    })
                    const Action = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId('Button/BackSystemVendas')
                                .setStyle(2)
                                .setLabel('Voltar')
                                .setEmoji('1178068047202893869')
                        )
                    interaction.editReply({ ephemeral: true, content: 'Produto criado com sucesso, Volte ao painel para gerenciá-lo.', components: [Action] })
                }
            }
        }
    }
}