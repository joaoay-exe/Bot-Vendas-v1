import fs from 'fs';
import path from 'path';

export default {
    async run(client) {
        const raiz = './Commands';
        const pastas = fs.readdirSync(raiz);
        const commands = [];

        for (const pasta of pastas) {
            const arquivos = fs.readdirSync(path.join(raiz, pasta));
            for (const arquivo of arquivos) {
                if (arquivo.endsWith('.js')) {
                    const caminhoArquivo = path.join(process.cwd(), raiz, pasta, arquivo);
                    const caminhoURL = `file://${caminhoArquivo}`;

                    const cmdModule = await import(caminhoURL);

                    const cmd = cmdModule.default || cmdModule;

                    client.SlashCommands.set(cmd.name, cmd);
                    commands.push(cmd);
                }
            }
        }

        client.on("ready", async () => {
            await client.application.commands.set(commands);
        }
        )
    }
}
