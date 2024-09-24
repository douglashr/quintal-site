const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const app = express();
const PORT = 3000;

// Configuração do Multer para armazenar imagens no diretório "uploads"
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage }).fields([
    { name: 'imagemBackground', maxCount: 1 },
    { name: 'imagemLogo', maxCount: 1 },
    { name: 'quintalImagemBackground', maxCount: 1 },
    { name: 'linhaImagemBackground', maxCount: 1 }
]);

// Middleware para servir arquivos estáticos (HTML, CSS, etc.)
app.use(express.static(__dirname));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rota para servir o arquivo home.json
app.get('/administracao/home.json', (req, res) => {
    res.sendFile(path.join(__dirname, 'administracao', 'home.json'));
});

// Rota para salvar as alterações do home.json e atualizar o CSS
app.post('/salvar-banner', (req, res) => {
    upload(req, res, function (err) {
        if (err) {
            console.error('Erro ao processar os uploads:', err);
            return res.status(500).send('Erro no upload dos arquivos.');
        }

        console.log('Arquivos recebidos:', req.files);

        const imagensRecebidas = {
            imagemBackground: req.files['imagemBackground'] ? req.files['imagemBackground'][0].filename : '',
            imagemLogo: req.files['imagemLogo'] ? req.files['imagemLogo'][0].filename : '',
            quintalImagemBackground: req.files['quintalImagemBackground'] ? req.files['quintalImagemBackground'][0].filename : '',
            linhaImagemBackground: req.files['linhaImagemBackground'] ? req.files['linhaImagemBackground'][0].filename : ''
        };

        console.log('Imagens recebidas:', imagensRecebidas);

        // Atualizando o JSON
        let bannerJson;
        try {
            bannerJson = JSON.parse(req.body.bannerJson);
        } catch (err) {
            console.error('Erro ao fazer parse do bannerJson:', err);
            return res.status(400).send('Erro ao processar o JSON do banner.');
        }

        // Caminho para o arquivo home.json
        const homeJsonPath = path.join(__dirname, 'administracao', 'home.json');
        fs.writeFile(homeJsonPath, JSON.stringify(bannerJson, null, 2), (err) => {
            if (err) {
                console.error('Erro ao salvar o home.json:', err);
                return res.status(500).send('Erro ao salvar o home.json.');
            }
            console.log('home.json salvo com sucesso.');

            // Atualizar o CSS
            const cssFilePath = path.join(__dirname, 'assets', 'css', 'main.css');
            fs.readFile(cssFilePath, 'utf8', (err, cssContent) => {
                if (err) {
                    console.error('Erro ao ler o arquivo CSS:', err);
                    return res.status(500).send('Erro ao ler o arquivo CSS.');
                }

                let updatedCss = cssContent;

                // Atualiza o background do #intro
                if (imagensRecebidas.imagemBackground) {
                    updatedCss = updatedCss.replace(
                        /(#intro\s*\{[^}]*background:\s*url\("images\/overlay3\.png"\),\s*url\("\.\.\/\.\.\/images\/)[^"]+("\);)/,
                        `$1${imagensRecebidas.imagemBackground}$2`
                    );
                    console.log('CSS atualizado para #intro com:', imagensRecebidas.imagemBackground);
                }

                // Atualiza o logo no CSS
                if (imagensRecebidas.imagemLogo) {
                    updatedCss = updatedCss.replace(
                        /(#logo img\s*src=\s*["'][^"']*["'])/,
                        `#logo img { src: "../uploads/${imagensRecebidas.imagemLogo}" }`
                    );
                    console.log('CSS atualizado para o logo com:', imagensRecebidas.imagemLogo);
                }

                // Atualiza o background do #one (A Quintal da Leste)
                if (imagensRecebidas.quintalImagemBackground) {
                    updatedCss = updatedCss.replace(
                        /(#one\s*\{[^}]*background:\s*url\("images\/overlay\.png"\),\s*url\("\.\.\/\.\.\/images\/)[^"]+("\);)/,
                        `$1${imagensRecebidas.quintalImagemBackground}$2`
                    );
                    console.log('CSS atualizado para #one com:', imagensRecebidas.quintalImagemBackground);
                }

                // Atualiza o background do #two (Linha Pedagógica)
                if (imagensRecebidas.linhaImagemBackground) {
                    updatedCss = updatedCss.replace(
                        /(#two\s*\{[^}]*background:\s*url\("images\/overlay\.png"\),\s*url\("\.\.\/\.\.\/images\/)[^"]+("\);)/,
                        `$1${imagensRecebidas.linhaImagemBackground}$2`
                    );
                    console.log('CSS atualizado para #two com:', imagensRecebidas.linhaImagemBackground);
                }

                // Escrever o CSS atualizado
                fs.writeFile(cssFilePath, updatedCss, 'utf8', (err) => {
                    if (err) {
                        console.error('Erro ao salvar o arquivo CSS:', err);
                        return res.status(500).send('Erro ao salvar o arquivo CSS.');
                    }
                    console.log('CSS atualizado e salvo com sucesso.');
                    res.status(200).send('Alterações salvas com sucesso.');
                });
            });
        });
    });
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
