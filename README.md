# :test_tube: Teste Prático FullStack Pleno — Alume

Este repositório contém o desafio técnico para a vaga de **Desenvolvedor(a) FullStack Pleno**, com foco em **Node.js + TypeScript** no backend e **React** no frontend, utilizando boas práticas de arquitetura e segurança. A proposta é simular funcionalidades que façam parte de um sistema de **financiamentos estudantis para estudantes de medicina**.

---

## :brain: Contexto

Nossa startup trabalha conectando **estudantes de medicina** a **financiamentos estudantis personalizados**. Este teste simula parte de um módulo interno que permite que estudantes se cadastrem e simulem financiamentos.

O desafio é composto por duas partes:
1. **Backend**: Desenvolvimento de uma **RESTful API** com autenticação JWT
2. **Frontend**: Criação de um dashboard para consumir e interagir com a API

---

## Parte 1: Backend

### :package: Requisitos Técnicos
- **Node.js com TypeScript**
- ORM (Ex: Prisma, TypeORM ou Sequelize)
- Banco de dados relacional com docker-compose (preferencialmente PostgreSQL ou MySQL)
- Autenticação via **JWT** com expiração de 5 minutos
- Arquitetura modular e boas práticas (controllers, services, middlewares, etc.)
- Validação de dados (com libs como `zod`, `joi` ou similares)
- Tratamento de erros

### :standing_person: Entidades

#### Estudantes
- `id`: primary key
- `nome`: obrigatório
- `sobrenome`: obrigatório
- `email`: obrigatório e único
- `senha`: obrigatória (criptografada)

#### Simulações de Financiamento
- `id`: primary key
- `id_estudante`: obrigatório
- `valor_total`: obrigatório
- `quantidade_parcelas`: obrigatório
- `juros_ao_mes`: obrigatório
- `valor_parcela_mensal`: calculado
- `data_criacao`: timestamp

### :closed_lock_with_key: Autenticação
- JWT com expiração de **5 minutos**.

### Rotas Obrigatórias

#### Estudantes
- `POST /api/register` — Criação de novo estudante
- `POST /api/login` — Autenticação
- `POST /api/me` — Retorna dados do estudante autenticado (sem senha)
- `PUT /api/me` — Atualiza dados do estudante autenticado

#### Simulações de Financiamento (Requer autenticação)
- `POST /api/simulations` — Cria uma nova simulação (retorna valor estimado da parcela com base nos dados informados)
- `GET /api/simulations` — Lista todas as simulações realizadas pelo estudante

### :brain: Regras de Negócio
- Um estudante só pode visualizar, editar ou excluir suas próprias simulações.
- O campo `valor_parcela_mensal` da simulação deve ser calculado com base na fórmula de juros compostos abaixo.

### :abacus: Fórmula de cálculo da parcela
Para simular o valor mensal do financiamento, use a fórmula da **parcela fixa (Price)**:

PMT = PV * (i / (1 - (1 + i)^-n))

Onde:
- `PMT` = parcela mensal
- `PV` = valor total do financiamento
- `i` = juros ao mês (ex: 0.02 para 2%)
- `n` = número de parcelas

---

## Parte 2: Frontend

### :computer: Requisitos Técnicos
- **React** com TypeScript
- **Gerenciamento de estado**: Context API, Redux ou similar
- **Estilização**: Styled-components, Tailwind CSS, ou outra biblioteca de sua preferência
- **Formulários**: React Hook Form, Formik ou similar
- **Validação**: Zod, Yup ou similar
- Tratamento de erros e feedback visual ao usuário
- Design responsivo

### :art: Telas Obrigatórias

#### Autenticação
- Tela de **Login**
- Tela de **Cadastro de Estudante**

#### Dashboard (área logada)
- **Dashboard Principal** com resumo das simulações
- **Perfil do Estudante** para visualização e edição dos dados
- **Nova Simulação** de financiamento
- **Histórico de Simulações**

### :sparkles: Funcionalidades Obrigatórias

1. **Sistema de Autenticação**
   - Login e cadastro
   - Proteção de rotas (redirect para login se não autenticado)
   - Expiração do token e refresh token ou relogin
   - Logout

2. **Dashboard Principal**
   - Exibir resumo das simulações recentes (últimas 5)
   - Card com totalizadores (quantidade de simulações, valor médio das parcelas) -> quase
   - Gráfico simples mostrando a evolução das simulações por valor

3. **Simulador de Financiamento**
   - Formulário interativo para criação de novas simulações
   - Campos para informar valor total, quantidade de parcelas e taxa de juros
   - Cálculo e exibição do valor da parcela mensal em tempo real
   - Botão para salvar a simulação

4. **Histórico de Simulações**
   - Tabela com todas as simulações do estudante
   - Filtros por data, valor ou quantidade de parcelas
   - Paginação para navegação entre resultados

5. **Perfil do Estudante**
   - Visualização dos dados cadastrais
   - Formulário para edição dos dados pessoais

### :star: Diferenciais (opcionais)
- Gráficos interativos usando bibliotecas como Chart.js ou Recharts
- Tema claro/escuro 
- Implementação de testes com React Testing Library ou similar
- Animações e transições para melhor UX

---

## :mailbox_with_mail: Entrega
- Suba o projeto em um repositório público no seu GitHub
- Separe o backend e frontend em pastas distintas no mesmo repositório
- Inclua instruções detalhadas para rodar ambas as partes do projeto
- Use `.env.example` para variáveis sensíveis
- Adicione screenshots ou um GIF/vídeo demonstrativo no README

---

## :white_check_mark: Dicas

### Backend
- Use `bcrypt` ou `argon2` para criptografar senhas
- Use `jsonwebtoken` para JWT
- Organize o projeto em camadas (controllers, services, etc)
- Utilize boas práticas de REST e clean code

### Frontend
- Utilize componentização para reaproveitamento de código
- Implemente tratamento de estado de loading e erro
- Crie interfaces/tipos para os dados
- Construa um sistema de rotas organizado
- Crie um interceptor para lidar com tokens e erros HTTP

---

Você pode enviar o link para o seu repositório para developers@alume.com. Caso tenha dúvidas sobre algum aspecto do teste você pode enviá-las para o mesmo e-mail.

Boa sorte e bom código! :rocket:
