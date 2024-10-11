# CineTicket DDD

## Regras de Negócio

### Cinema
- Deve poder criar um cinema sem tipos de cadeira ou salas cadastradas
- Deve poder editar nome e endereço
- Deve poder excluir um cinema caso haja apenas sessões finalizadas
- Deve poder adicionar tipos de cadeira ao catálogo de cadeiras
- Nome de tipo de cadeira deve ser único por cinema
- Deve poder editar nome e valor do tipo de cadeira
- Deve poder adicionar filmes do catálogo interno à programação de filmes do cinema
- Filme deve ser único por cinema
- Deve poder excluir um filme da programação se este estiver apenas em sessões finalizadas
- Deve poder extender ou diminuir o período de um filme da programação se ele cobrir todas as sessões em andamento (ou sessões já definidas?)
- Deve poder adicionar salas com todas os tipos de cadeiras sendo do catálogo de cadeiras do cinema
- Número da sala deve ser único por cinema
- Deve poder editar número e formato da sala

### Sala
- Deve conter pelo menos uma cadeira
- Todas as linhas da matriz da sala deve ter o mesmo número de colunas

### Sessão
- Deve poder criar sessão
- Não deve poder criar sessão na mesma sala e horários sobrepostos em um mesmo cinema
- Não deve poder editar sessão depois de criada
- Todas as linhas da matriz de cadeiras deve ter o mesmo número de colunas

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
