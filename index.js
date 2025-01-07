import { Collection, Client, Partials, GatewayIntentBits } from 'discord.js'
import Events from './Handler/Events.js'
import Commands from './Handler/Commands.js'
import config from './config.json' assert { type: 'json' }

const client = new Client({
    intents: Object.keys(GatewayIntentBits),
    partials: Object.keys(Partials)
});

export default client

Events.run(client);
Commands.run(client);
client.SlashCommands = new Collection();

client.login(config.token);
