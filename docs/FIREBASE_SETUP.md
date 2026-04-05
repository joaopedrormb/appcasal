# Configuração do Firebase — Nossa Casa

## 1. Criar o projeto no Firebase Console

1. Acesse [console.firebase.google.com](https://console.firebase.google.com)
2. Clique em **"Adicionar projeto"** → dê um nome (ex: `nossa-casa`) → crie
3. Google Analytics pode ser desativado

---

## 2. Ativar o Firestore

1. Menu lateral: **Build → Firestore Database**
2. Clique **"Criar banco de dados"**
3. Escolha **modo de produção**
4. Região: **`southamerica-east1` (São Paulo)**

---

## 3. Pegar as credenciais do app web

1. Menu lateral: **Visão geral do projeto → ícone `</>`** (adicionar app web)
2. Registre o app com qualquer apelido
3. Copie o objeto `firebaseConfig` gerado para `src/firebase/config.js`:

```js
export const firebaseConfig = {
  apiKey: 'AIzaSy...',
  authDomain: 'sua-casa.firebaseapp.com',
  projectId: 'sua-casa',
  storageBucket: 'sua-casa.appspot.com',
  messagingSenderId: '123456789',
  appId: '1:123456789:web:abc123'
}
```

---

## 4. Gerar a VAPID Key (notificações push)

1. **Project Settings → Cloud Messaging**
2. Role até **"Web Push certificates"**
3. Clique **"Generate key pair"**
4. Cole a chave no `config.js`:

```js
export const VAPID_KEY = 'BNxxxxxxxxxxxxxxxxxxxxxxx...'
```

---

## 5. Instalar dependências das Functions

```bash
cd functions
npm install
cd ..
```

---

## 6. Configurar o Firebase CLI e fazer deploy

```bash
# Instalar o CLI (se não tiver)
npm install -g firebase-tools

# Login
firebase login

# Associar ao projeto criado
firebase use --add

# Build do app
npm run build

# Deploy completo (hosting + functions + firestore rules)
firebase deploy
```

---

## Resumo dos valores em `src/firebase/config.js`

| Campo | Onde pegar |
|---|---|
| `apiKey`, `authDomain`, `projectId`, `storageBucket`, `messagingSenderId`, `appId` | Console Firebase → Configurações do projeto → App Web |
| `VAPID_KEY` | Console Firebase → Project Settings → Cloud Messaging → Web Push certificates |
| `HOUSEHOLD_ID` | Já definido como `'joao-e-tefinha'` — não precisa alterar |

---

## Estrutura de serviços utilizados

| Serviço | Uso |
|---|---|
| Firestore | Banco de dados principal (medicamentos, contas, tokens FCM) |
| Hosting | Hospedagem do app React |
| Cloud Functions | Notificações agendadas a cada hora (`pushHourly`) |
| Cloud Messaging (FCM) | Push notifications no navegador/celular |
