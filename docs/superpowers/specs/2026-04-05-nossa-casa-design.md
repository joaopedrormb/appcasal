# Nossa Casa Design Spec

## Context

`Nossa Casa` sera reconstruido do zero em `C:\Users\User\Documents\appdocasal` como um PWA mobile-first em React 18 + Vite 5, usando Firebase 11, Zustand 4, `date-fns`, `lucide-react`, CSS Modules e `vite-plugin-pwa`. Os arquivos soltos atualmente no diretorio sao apenas exemplos e devem ser removidos se nao fizerem parte da arvore final definida em `CODEX_PROMPT.md`.

O objetivo e entregar a estrutura completa pedida pelo prompt, com a arvore oficial de arquivos, comportamento funcional coerente entre modulos e base pronta para receber as credenciais reais do Firebase sem retrabalho estrutural.

## Goals

- Reconstruir o projeto na arvore exata definida no prompt.
- Entregar infraestrutura PWA/Firebase completa e coerente.
- Separar responsabilidades entre app shell, estado global, acesso ao Firestore, componentes base e modulos de negocio.
- Implementar os modulos Home, Remedios, Financas e Academia com comportamento realtime e foco mobile-first.
- Preservar a regra de negocio aprovada para contas recorrentes: ao marcar uma conta recorrente como paga, o sistema mantem o registro quitado e cria automaticamente a proxima ocorrencia.

## Non-Goals

- Autenticacao de usuarios.
- Regras restritivas de seguranca no Firestore alem das permissivas pedidas pelo prompt.
- Painel administrativo separado.
- Sincronizacao com APIs externas.

## Repository Cleanup

Antes da implementacao, o diretorio sera limpo para conter somente:

- os arquivos obrigatorios listados no prompt
- os icones auxiliares do PWA em `public/icons/icon-192.png` e `public/icons/icon-512.png`
- documentacao de suporte criada durante o fluxo (`docs/superpowers/specs/...`)

Arquivos-exemplo atuais como `config.js`, `index.js`, `functions-index.js`, `sw.js`, `manifest.json`, `firebase-messaging-sw.js`, `treinos-seed.js`, `useFirestore.js` e equivalentes fora da arvore final devem ser removidos.

## Target File Structure

O projeto final deve conter, no minimo, a seguinte estrutura:

```text
package.json
vite.config.js
index.html
.gitignore
firebase.json
firestore.rules
public/
  firebase-messaging-sw.js
  icons/
    icon-192.png
    icon-512.png
functions/
  package.json
  index.js
src/
  main.jsx
  App.jsx
  App.module.css
  styles/
    global.css
  firebase/
    config.js
    index.js
  store/
    index.js
  hooks/
    useFirestore.js
  data/
    treinos-seed.js
  components/
    BottomNav/
    BottomSheet/
    Toast/
    Badge/
    EmptyState/
    FAB/
    NotifBanner/
  modules/
    Home/
    Remedios/
    Financas/
    Academia/
```

Cada componente e modulo tera um `.jsx` e um `.module.css`, sem CSS inline e sem `!important`.

## Architecture

O app sera dividido em quatro camadas:

1. **Infraestrutura**
   `vite.config.js`, `firebase.json`, `firestore.rules`, service worker do FCM, Cloud Functions e bootstrap do Firebase.
2. **Core do app**
   `src/main.jsx`, `src/App.jsx`, `src/App.module.css`, `src/styles/global.css`.
3. **Estado e dados**
   `src/store/index.js` para estado global de UI e espelhamento de colecoes; `src/hooks/useFirestore.js` como unico ponto de leitura e escrita no Firestore.
4. **UI reutilizavel e modulos**
   Componentes base reaproveitaveis e modulos de negocio (`Home`, `Remedios`, `Financas`, `Academia`).

### Boundary Rules

- Componentes base nao acessam Firestore diretamente.
- Modulos de negocio nao implementam chamadas Firebase ad hoc; consomem apenas `useAppStore` e os hooks de dominio de `useFirestore.js`.
- `App.jsx` coordena layout, abas persistentes, notificacoes foreground e bootstrap de permissao/token.
- `store/index.js` controla `householdId`, `activeTab`, colecoes espelhadas e `toast`.
- `useFirestore.js` centraliza `onSnapshot`, `addDoc`, `updateDoc`, `deleteDoc`, regras de ajuste e tratamento de erros.

## UI Foundation

### Global Design System

`src/styles/global.css` definira as variaveis pedidas no prompt e aplicara:

- import da fonte `Sora` via `index.html`
- `body` com `radial-gradient` roxo/ciano sobre `#0b1020`
- cards com `background: var(--card)`, borda `var(--line)` e `border-radius: var(--radius)`
- botao primario com gradiente roxo e sombra
- min-height de `44px` para elementos tocaveis
- transicoes `0.18s ease`
- area inferior reservada para bottom nav e safe area

### App Shell

`App.jsx` renderizara:

- `header` sticky com titulo `Nossa Casa`, subtitulo `Joao Pedro & Tefinha` e indicador de Firebase online
- `main` com quatro abas sempre montadas no DOM e alternadas por `display: none`
- `BottomNav` sticky no rodape
- `Toast` global
- `NotifBanner` quando permissoes de notificacao ainda nao foram concedidas

Na inicializacao:

- `onForegroundMessage` chamara `showToast`
- se `Notification.permission === 'granted'`, `registerFCMToken(householdId)` sera disparado

## Data Model

Todos os dados residirao sob `casas/{householdId}` com `householdId` padrao `joao-e-tefinha`.

### Collections

- `meds`
- `gastos`
- `contas`
- `metas`
- `treinos`
- `historico_treinos`
- `fcmTokens`

### Expected Shapes

#### meds

```js
{
  name: string,
  dosage: string,
  person: 'Joao Pedro' | 'Tefinha' | 'Ambos',
  frequency: string,
  qty: number,
  alertQty: number,
  dailyUse: number,
  times: string,
  notes: string,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

#### gastos

```js
{
  descricao: string,
  valor: number,
  categoria: 'Alimentacao' | 'Saude' | 'Transporte' | 'Casa' | 'Lazer' | 'Outros',
  data: string,
  pessoa: 'Joao Pedro' | 'Tefinha' | 'Casal',
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

#### contas

```js
{
  nome: string,
  valor: number,
  vencimento: string,
  recorrente: boolean,
  observacao: string,
  paga: boolean,
  pagaEm: string | null,
  origemRecorrenteId: string | null,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

#### metas

```js
{
  nome: string,
  valorAlvo: number,
  valorAtual: number,
  prazo: string,
  descricao: string,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

#### treinos

```js
{
  nome: string,
  pessoa: 'Joao Pedro' | 'Tefinha',
  diaSemana: 'seg' | 'ter' | 'qua' | 'qui' | 'sex' | 'sab' | 'dom',
  tags: string[],
  exercicios: [
    {
      nome: string,
      series: number,
      reps: string,
      carga: number,
      obs: string
    }
  ],
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

#### historico_treinos

```js
{
  treinoId: string,
  nome: string,
  pessoa: 'Joao Pedro' | 'Tefinha',
  exercicios: number,
  realizadoEm: string,
  createdAt: Timestamp
}
```

#### fcmTokens

```js
{
  token: string,
  householdId: string,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

## State Management

`src/store/index.js` usara Zustand com persistencia apenas para `householdId` e `activeTab`.

Estado esperado:

```js
{
  householdId: 'joao-e-tefinha',
  activeTab: 'home',
  setActiveTab,
  meds: [],
  setMeds,
  gastos: [],
  setGastos,
  contas: [],
  setContas,
  metas: [],
  setMetas,
  treinos: [],
  setTreinos,
  historico: [],
  setHistorico,
  toast: null,
  showToast,
  clearToast
}
```

## Firestore Integration

`src/firebase/index.js` sera responsavel por:

- `initializeApp(firebaseConfig)`
- `getFirestore(app)`
- habilitar `enableIndexedDbPersistence` com `catch` para browsers sem suporte
- inicializar `getMessaging(app)` com `try/catch`
- exportar `db`, `messaging`, `registerFCMToken` e `onForegroundMessage`

`registerFCMToken(householdId)` deve:

1. pedir permissao se necessario
2. registrar `public/firebase-messaging-sw.js`
3. obter token com `getToken`
4. salvar em `casas/{householdId}/fcmTokens/{token.slice(-20)}`

## Domain Hooks

`src/hooks/useFirestore.js` concentrara os hooks:

- `useMeds()`
- `useGastos()`
- `useContas()`
- `useMetas()`
- `useTreinos()`

Todos devem:

- assinar `onSnapshot`
- ordenar conforme o prompt
- alimentar o store
- expor mutacoes com `try/catch`
- emitir toast de erro em falha

### Business Rules

#### Remedios

- `adjustQty(id, delta)` soma/subtrai estoque sem permitir inconsistencias obvias
- status do remedio sera derivado por estoque, alerta e dias restantes
- preview de dias restantes no formulario sera calculado em tempo real

#### Gastos

- lista e resumo mensal sao realtime
- limite visual de 20 itens recentes na lista principal
- exclusao exige confirmacao

#### Contas

- status visual deriva de `paga`, `vencimento` e diferenca em dias
- filtros: todas, pendentes, pagas
- conta recorrente marcada como paga permanece no historico
- ao marcar uma conta recorrente como paga, cria-se automaticamente a proxima ocorrencia com novo vencimento baseado no atual
- `origemRecorrenteId` podera relacionar a proxima instancia a cadeia recorrente original

#### Metas

- `depositar(id, valor)` incrementa `valorAtual`
- progresso >= 100% muda badge e destaque visual

#### Treinos

- seed inicial via `allTreinos`
- `marcarRealizado(treino)` cria registro em `historico_treinos`
- historico e streaks sao derivados do historico de realizacoes
- inputs de carga usam debounce de 800 ms antes do `updateDoc`

## Module Design

### Home

- saudacao dinamica por horario
- nome principal alternado por paridade do dia
- cards de resumo para remedios, contas, academia Joao e academia Tefinha
- secao "Hoje na academia" com treino do dia por pessoa e CTA para registrar realizacao

### Remedios

- metricas inline: total, atencao, criticos, compartilhados
- alertas acima da lista
- filtros por pessoa, status e busca textual
- `MedCard` compacto com badges, linha de metricas, barra de progresso, nota opcional e acoes
- `MedForm` em `BottomSheet` com validacao, preview e exclusao com confirmacao

### Financas

`Financas.jsx` controlara tabs internas por chips.

#### GastosTab

- resumo do mes atual com total gasto
- distribuicao por categoria com percentuais e barras
- lista dos ultimos 20 gastos com badge de pessoa, valor e data formatada
- exclusao por acao explicita
- formulario em `BottomSheet`

#### ContasTab

- filtro rapido por status
- card com valor, vencimento e badge derivado
- botao para marcar paga/reabrir
- exclusao com confirmacao
- formulario com suporte a recorrencia

#### MetasTab

- cards com progresso, prazo, percentual e status
- mini `BottomSheet` para deposito
- formulario completo para criar/editar meta

### Academia

`Academia.jsx` controlara tabs `Treinos` e `Historico`.

#### Treinos

- filtros por pessoa
- `EmptyState` para importar seeds quando nao houver treinos
- `TreinoCard` em acordeao com tags coloridas, lista de exercicios e update debounced de carga
- `TreinoForm` em `BottomSheet` com lista dinamica de exercicios

#### Historico

- resumo semanal por pessoa com 7 bolinhas por dia
- calculo de streak baseado em dias distintos com treino
- lista dos ultimos 30 registros

## Shared Components

### BottomNav

- quatro abas: Home, Remedios, Financas, Academia
- icones de `lucide-react`
- indicacao visual da aba ativa

### BottomSheet

- overlay com blur
- animacao por `transform`
- fecha ao clicar fora
- trava scroll do `body` enquanto aberto

### Toast

- controla mensagens `success`, `error`, `info`
- auto-dismiss em 3 segundos

### Badge

- status `ok`, `warn`, `danger`, `info`

### EmptyState

- mensagem centralizada com CTA opcional

### FAB

- botao circular fixo acima do bottom nav

### NotifBanner

- visivel apenas quando `Notification.permission === 'default'` e nao dismissado
- `Ativar` pede permissao e registra token
- `Agora nao` grava `notif_dismissed`

## Cloud Function Design

`functions/index.js` exportara `pushHourly` com `onSchedule('0 * * * *', ...)` em `southamerica-east1` e timezone `America/Sao_Paulo`.

Fluxo:

1. listar todas as casas
2. buscar `fcmTokens`
3. para cada casa, verificar:
   - remedios com horario exato igual ao horario atual
   - remedios com estoque baixo as `08:00`
   - contas vencidas ou vencendo em ate 3 dias as `08:00`
4. agrupar mensagens
5. enviar via `sendEachForMulticast` com payload Android e APNS

## Security and Validation

- textos externos serao renderizados como texto simples em React, sem `dangerouslySetInnerHTML`
- exclusoes sempre confirmadas
- campos obrigatorios validados antes de salvar
- foco no primeiro erro de formulario
- erros do Firestore mostrados por toast

## Formatting and Localization

- moeda via `Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })`
- datas via `date-fns` com `ptBR`
- uso de `format`, `formatDistanceToNow`, `isToday`, `isYesterday`

## Loading and Offline

- dados assinados por snapshot exibem skeleton ate a primeira carga
- Firestore usa persistencia offline via IndexedDB quando suportado
- PWA tera manifesto e workbox configurados conforme prompt

## Delivery Strategy

A implementacao seguira a ordem exigida:

1. infraestrutura
2. componentes base
3. Home
4. Remedios
5. Financas
6. Academia

Internamente, cada etapa sera quebrada em subpassos menores para reduzir risco de integracao, mas a estrutura final nascera completa desde o inicio.

## Verification Strategy

Antes de considerar a entrega concluida, validar:

- estrutura final de arquivos
- build do Vite
- imports/resolucoes sem referencias quebradas
- fluxo basico de bootstrap do app
- integracao entre store e hooks
- manifests e service workers presentes
- regras criticas de negocio:
  - alertas e status de remedios
  - gastos realtime
  - contas recorrentes criando proxima ocorrencia
  - metas com deposito
  - importacao e registro de treinos

## Risks and Mitigations

- **Risco:** adaptar arquivos-exemplo gerar inconsistencias estruturais.
  **Mitigacao:** remover exemplos e reconstruir a arvore final oficial.
- **Risco:** acoplamento entre UI e Firestore.
  **Mitigacao:** centralizar snapshots e mutacoes em `useFirestore.js`.
- **Risco:** recorrencia de contas perder historico.
  **Mitigacao:** manter conta paga e criar nova ocorrencia separada.
- **Risco:** PWA quebrar por falta de icones.
  **Mitigacao:** criar `public/icons/icon-192.png` e `public/icons/icon-512.png`.

## Acceptance Criteria

O design sera considerado satisfeito quando:

- a arvore oficial do prompt existir no projeto
- os arquivos-exemplo antigos tiverem sido removidos
- o app subir com shell completo e abas persistentes
- os quatro modulos funcionarem com os comportamentos descritos
- a base Firebase/PWA estiver pronta para configuracao real
- as contas recorrentes mantiverem historico e gerarem a proxima ocorrencia automaticamente
