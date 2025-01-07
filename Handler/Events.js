import fs from 'fs';
import path from 'path';

export default {
  async run(client) {
    const raiz = './Events';
    const pastas = fs.readdirSync(raiz).filter((pasta) => fs.statSync(path.join(raiz, pasta)).isDirectory());

    for (const pasta of pastas) {
      const arquivos = fs.readdirSync(path.join(raiz, pasta));
      for (const arquivo of arquivos) {

        if (arquivo.endsWith('.js')) {
          const caminhoArquivo = path.join(process.cwd(), raiz, pasta, arquivo);
          const caminho = await import(`file://${caminhoArquivo}`);
          const evt = caminho.default || caminho;

          if (evt.once) {
            client.once(evt.name, (...args) => evt.run(...args, client));
          } else {
            client.on(evt.name, (...args) => evt.run(...args, client));
          }
        }
      }
    }
  }
}
