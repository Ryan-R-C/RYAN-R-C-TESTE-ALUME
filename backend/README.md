# API de Simulação de Financiamento Estudantil

Esta API permite que estudantes se registrem, façam login e simulem financiamentos estudantis.

## Instruções para iniciar o projeto

### Pré-requisitos

- Node.js (versão recomendada: 22.x)
- npm ou yarn
- Docker (opcional, para rodar banco de dados localmente)

### Scripts
- `dev`: Inicia o servidor de desenvolvimento.
- `build`: Gera a build de produção.
- `start`: Inicia o servidor a partir da build de produção.
- `docker-init`: Sobe os containers Docker definidos no docker-compose usando as variáveis do `.env`.

### Como configurar o arquivo .env

1. Copie o arquivo de exemplo `.env.example` para `.env` na raiz do projeto backend:
   ```bash
   cp .env.example .env
   ```
2. Edite o arquivo `.env` conforme necessário, ajustando as variáveis de ambiente para o seu ambiente local (como usuário, senha e porta do banco de dados, JWT_SECRET, etc).

### Como iniciar o projeto

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/pleno-fullstack-challenge.git
   cd pleno-fullstack-challenge/backend
   ```

2. Instale as dependências:
   ```bash
   npm install
   # ou
   yarn install
   ```

3. Configure as variáveis de ambiente:
   - Copie o arquivo `.env.example` para `.env` e ajuste conforme necessário.

4. (Opcional) Suba o banco de dados com Docker:
   ```bash
   npm run docker-init
   ```

5. Rode as migrations (se aplicável):
   ```bash
   npm run migrate
   # ou
   yarn migrate
   ```

6. Inicie o servidor:
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

O servidor estará disponível em `http://localhost:3000` (ou porta configurada).

## Bibliotecas utilizadas

- Express
- TypeORM / Prisma (ajustar conforme o projeto)
- dotenv
- cors
- bcrypt
- jsonwebtoken
- (adicione outras bibliotecas relevantes utilizadas no projeto)

## Coleções do Postman

Há um arquivo de coleções do Postman disponível na pasta `docs` para facilitar o teste das rotas da API. Basta importar o arquivo `.json` no Postman.

## Endpoints

### 1. Autenticação

#### **POST /api/register**
Cria um novo estudante.

**Request Body:**
```json
{
  "nome": "João",
  "sobrenome": "Silva",
  "email": "joao.silva@example.com",
  "senha": "senha123"
}
```

**Response:**
```json
{
  "id": 1,
  "nome": "João",
  "sobrenome": "Silva",
  "email": "joao.silva@example.com"
}
```



#### **POST /api/login**
Autentica um estudante e retorna um token JWT.

**Request Body:**
```json
{
  "email": "joao.silva@example.com",
  "senha": "senha123"
}
```

**Response:**
```json
{
  "token": "seu_token_jwt_aqui"
}
```



#### **POST /api/me**
Retorna os dados do estudante autenticado.

**Headers:**
```
Authorization: Bearer seu_token_jwt_aqui
```

**Response:**
```json
{
  "id": 1,
  "nome": "João",
  "sobrenome": "Silva",
  "email": "joao.silva@example.com"
}
```



### 2. Estudante

#### **GET /api/me**
Retorna os dados do estudante autenticado.

**Headers:**
```
Authorization: Bearer seu_token_jwt_aqui
```

**Response:**
```json
{
  "id": 1,
  "nome": "João",
  "sobrenome": "Silva",
  "email": "joao.silva@example.com"
}
```



#### **PUT /api/me**
Atualiza os dados do estudante autenticado.

**Headers:**
```
Authorization: Bearer seu_token_jwt_aqui
```

**Request Body:**
```json
{
  "nome": "João",
  "sobrenome": "Silva",
  "email": "joao.novo@example.com"
}
```

**Response:**
```json
{
  "id": 1,
  "nome": "João",
  "sobrenome": "Silva",
  "email": "joao.novo@example.com"
}
```



### 3. Simulações

#### **POST /api/simulations**
Cria uma nova simulação de financiamento.

**Headers:**
```
Authorization: Bearer seu_token_jwt_aqui
```

**Request Body:**
```json
{
  "valor_total": 50000,
  "quantidade_parcelas": 12,
  "juros_ao_mes": 0.02
}
```

**Response:**
```json
{
  "id": 1,
  "idEstudante": 1,
  "valor_total": 50000,
  "quantidade_parcelas": 12,
  "juros_ao_mes": 0.02,
  "valor_parcela_mensal": 4500.00,
  "data_criacao": "2023-10-01T00:00:00.000Z"
}
```

#### **GET /api/simulations**
Lista todas as simulações do estudante autenticado.

**Headers:**
```
Authorization: Bearer seu_token_jwt_aqui
```

**Response:**
```json
[
  {
    "id": 1,
    "idEstudante": 1,
    "valor_total": 50000,
    "quantidade_parcelas": 12,
    "juros_ao_mes": 0.02,
    "valor_parcela_mensal": 4500.00,
    "data_criacao": "2023-10-01T00:00:00.000Z"
  }
]
```

## Considerações Finais
Certifique-se de que o servidor esteja rodando e que o banco de dados esteja configurado corretamente.
