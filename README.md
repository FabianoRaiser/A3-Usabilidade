# Sistema de Votação

Um sistema simples de votação desenvolvido com HTML, CSS e JavaScript para a disciplina de Usabilidade, Desenvolvimento Web, Mobile e Jogos.

## 📋 Pré-requisitos

- Navegador web moderno
- Servidor web local (pode usar Live Server do VS Code ou similar)
- Node.js instalado (versão 20.18.0 ou superior)
- PostgreSQL instalado (versão 16.1 ou superior)

## 🚀 Como rodar o projeto

1. Clone o repositório 

```bash
git clone https://github.com/FabianoRaiser/A3-Usabilidade.git
```

2. Navegue até a pasta do projeto

```bash
cd A3-Usabilidade
```

3. Configure o PostgreSQL:
   - Crie um banco de dados chamado `univota`
   - O sequelize criará as tabelas automaticamente
4. Configure as variáveis de ambiente:
   - Crie um arquivo `.env` na pasta `back-end/`
   - Adicione as seguintes variáveis:
   ```bash
   DB_USER=seu_usuario
   DB_PASSWORD=sua_senha
   DB_HOST=localhost
   DB_PORT=5432
   DB_DATABASE=univota
   PORT=3000
   ```

5. Instale as dependências e inicie o servidor Node.js:
   ```bash
   cd back-end
   npm install
   npm start
   ```

6. Abra o projeto:
   - Se estiver usando VS Code, instale a extensão "Live Server"
   - Clique com botão direito no arquivo `index.html`
   - Selecione "Open with Live Server"

   OU

   - Abra diretamente o arquivo `index.html` em seu navegador

## 📁 Estrutura do projeto

- `front-end/`: Contém o código HTML, CSS e JavaScript do projeto.
- `back-end/`: Contém o código Node.js e Express para a API.
  - Inclui modelos de dados, controllers para lógica de negócios e rotas da API

## 🔄 Fluxo da aplicação

1. Faça login na página inicial
2. Realize sua votação na página de votação
3. Conclua o processo de votação

Após a conclusão da votação, uma nova tela será liberada para apresentar os resultados finais, permitindo a visualização detalhada dos dados da eleição e suas estatísticas. (Não implementado)


## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

