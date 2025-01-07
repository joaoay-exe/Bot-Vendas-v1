import { PanelBotConfig } from "../../Functions/Config/PanelBotConfig.js";
import { PanelSystemVendas } from "../../Functions/EventsPanelConfig/PanelSystemVendas.js";
import { PanelDefinitions } from "../../Functions/EventsPanelConfig/PanelDefinitions.js";
import PanelEventsSystemVendas from "../../Functions/EventsSystemVendas/PanelEventSystemVendas.js";
import { PanelConfigPayments } from "../../Functions/EventsSystemPayments/PanelConfigPayments.js";
import { JsonDatabase } from "wio.db";
import { FormasDePagamento } from "../../Functions/EventsPaymentSemi/FormasDePagamento.js";
import { PanelChavePix } from "../../Functions/EventsPaymentSemi/PanelChavePix.js";
import { ActionRowBuilder, ButtonBuilder, StringSelectMenuBuilder } from "discord.js";
const db = new JsonDatabase({ databasePath: './Json/configuracao' });
const produtos = new JsonDatabase({ databasePath: './Json/produtos' });

export default {
    name: 'interactionCreate',
    async run(interaction, client) {
        if (interaction.isButton()) {
            const { customId } = interaction

            if (customId == 'Button/SystemVendas') {
                const joao = await PanelSystemVendas({ interaction, client });
                interaction.update({ ephemeral: true, content: joao.content, embeds: joao.embeds, components: joao.components })
            }
            if (customId == 'Button/Definitions') {
                const joao = await PanelDefinitions({ interaction, client });
                interaction.update({ content: joao.content, embeds: joao.embeds, components: joao.components });
            }
            if (customId == 'Button/Backhome') {
                const joao = await PanelBotConfig({ interaction, client });
                interaction.update({ ephemeral: true, conten: '', embeds: joao.embeds, components: joao.components });
            }
            if (customId == 'Button/CreateProduct') {
                PanelEventsSystemVendas({ interaction });
            }
            if (customId == 'Button/BackSystemVendas') {
                const joao = await PanelSystemVendas({ interaction });
                interaction.update({ content: '', embeds: joao.embeds, components: joao.components });
            }
            if (customId == 'Button/ConfigPayment') {
                const joao = await PanelConfigPayments({ interaction, client });
                interaction.update({ content: '', embeds: joao.embeds, components: joao.components });
            }
            if (customId == 'Button/BackDefinitions') {
                const joao = await PanelDefinitions({ interaction, client });
                interaction.update({ content: '', embeds: joao.embeds, components: joao.components });
            }
            if (customId == 'Button/ConnectSystemVendas') {
                const joao = db.get('SystemVendas.Vendas');
                db.set(`SystemVendas.Vendas`, !joao);
                const joao_function = await PanelConfigPayments({ interaction, client });

                await interaction.update({ ephemeral: true, content: '', embeds: joao_function.embeds, components: joao_function.components });
                await interaction.followUp({ ephemeral: true, content: `Sistema vendas ${joao ? 'desligado' : 'ligado'}` });
            }
            if (customId == 'Button/FormasDePayment') {
                const joao = await FormasDePagamento({ interaction, client });
                interaction.update({ embeds: joao.embeds, components: joao.components });
            }
            if (customId == 'Button/BackVoltarConfigPayments') {
                const joao = await PanelConfigPayments({ interaction, client });
                interaction.update({ embeds: joao.embeds, components: joao.components });
            }
            if (customId == 'Button/DefinirChave') {
                PanelChavePix({ interaction });
            }
            if (customId == 'Button/ManageProduct') {
                const database = produtos.fetchAll();
                const Placheholder = 'Clique para gerenciar';
                const Menus = [];
                let opcoes = 0;
                let currentSelectMenuBuilder;

                for (const produto of database) {
                    let SizeDesc;
                    let desc = produto?.data.Config.Desc;
                    const name = produto?.data?.Config?.Nome;

                    if (desc === undefined || desc.length === 0) {
                        desc = 'Não definido';
                    } else {
                        SizeDesc = desc.slice(0, 70);
                    }

                    const productName = name || 'Não definido';

                    const OptionSelect = {
                        label: productName,
                        description: SizeDesc,
                        value: produto.ID,
                        emoji: '1178163524443316285'
                    };


                    if (opcoes % 25 === 0) {
                        if (currentSelectMenuBuilder) {
                            Menus.push(currentSelectMenuBuilder);
                        }
                        currentSelectMenuBuilder = new StringSelectMenuBuilder()
                            .setCustomId('Select/Gerenciamento de produto')
                            .setPlaceholder(`[${Math.floor(opcoes / 25) + 1}] ${Placheholder}`);
                    }
                    currentSelectMenuBuilder.addOptions(OptionSelect);
                    opcoes++;
                }

                if (currentSelectMenuBuilder) {
                    Menus.push(currentSelectMenuBuilder);
                }

                const rows = Menus.map((selectMenuBuilder) => {
                    return new ActionRowBuilder().addComponents(selectMenuBuilder);
                });
                const actionRow = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId('Button/BackSystemVendas')
                            .setStyle(2)
                            .setLabel('Voltar')
                            .setEmoji('1178068047202893869')
                    );

                // Responder ao usuário
                interaction.update({
                    embeds: [],
                    components: [...rows, actionRow],
                    content: `Olá, ${interaction.user}, qual produto deseja gerenciar?`
                });
            }
        }
    }
}