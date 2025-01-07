import { ApplicationCommandType } from "discord.js";
import { PanelBotConfig } from "../../Functions/Config/PanelBotConfig.js";

export default {
    name: 'botconfig',
    description: '[🔧] Settings panel',
    category: 'Admin/Owner',
    type: ApplicationCommandType.ChatInput,
    async run(client, interaction){
        if(interaction.user.id != interaction.guild.ownerId) {
            return interaction.reply({ ephemeral: true, content: '❌ Você não possui permissão para utilizar esse comando' });
        }
        const joao = await PanelBotConfig({ interaction, client });
        interaction.reply({ ephemeral: true, embeds: joao.embeds, components: joao.components });
    }
}