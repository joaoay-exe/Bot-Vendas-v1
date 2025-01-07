import { Events, InteractionType, } from "discord.js";

export default {
    name: Events.InteractionCreate,
    async run(interaction, client) {
        if (interaction.type === InteractionType.ApplicationCommand) {

            const cmd = client.SlashCommands.get(interaction.commandName);

            if (!cmd) return interaction.reply(`Desculpe amigo, Mais algo deu erro..`);

            interaction["member"] = interaction.guild.members.cache.get(interaction.user.id);

            try {
                cmd.run(client, interaction);
            } catch (err) {
                console.log(err);
            }
        }

    }
}