# CineTicket DDD

## Regras de Negócio

### Cinema
- Deve poder criar um cinema sem tipos de cadeira ou salas cadastrados
- Deve poder editar nome e endereço
- Deve poder adicionar tipos de cadeira
- Nome de tipo de cadeira deve ser único por cinema
- Deve poder editar nome e valor do tipo de cadeira
- Deve poder excluir um cinema caso haja apenas sessões finalizadas
- Deve poder adicionar filmes da base de dados ao catálogo de filmes do cinema
- Não deve poder adicionar filmes iguais ao catálogo do cinema
- Deve poder excluir um filme do catálogo se este estiver apenas em sessões finalizadas
- Deve poder extender ou diminuir o período em cartaz se ele cobrir todas as sessões em andamento
- Deve poder adicionar salas
- Número da sala deve ser único por cinema
- Deve poder editar número e formato da sala
- Todas as cadeiras devem estar no catálogo do cinema

### Sala
- Deve conter pelo menos uma cadeira
- Todas as linhas da matriz da sala deve ter o mesmo número de colunas

### Sessão
- Deve poder criar sessão
- Não deve poder criar sessão no mesmo horário em um mesmo cinema
- Não deve poder editar sessão depois de criada

### Filme
- Deve conter poster

### Cadeira da Sessão
- Deve ficar bloqueada quando uma pessoa seleciona
- Deve desbloquear se a compra for encerrada

### Usuário
- Deve poder criar usuário com email e CPF únicos

### Celular
- Deve poder criar celular com número ou DDD diferentes

### Carrinho
- Deve poder criar carrinho com no mínimo 1 item de carrinho
- Deve poder adicionar ou remover item de carrinho

### Item de Carrinho


### Cartão
- Deve poder criar cartão
- Deve poder editar quaisquer dados do cartão

### Pedido
- Deve poder criar pedido
- Não deve poder editar pedido
- Não deve poder excluir pedido
