# CineTicket DDD

## Regras de Negócio

### Cinema
- Deve poder criar um cinema sem tipos de cadeira ou salas cadastrados
- Deve poder editar nome e endereço
- Deve poder adicionar tipos de cadeira
- Nome de tipo de cadeira deve ser único por cinema
- Deve poder editar nome do tipo de cadeira
- O que acontece ao alterar valor de um tipo de cadeira?
- Deve poder excluir um cinema caso não haja sessões ativas
- Deve poder adicionar filmes da base de dados ao catálogo de filmes do cinema
- Não deve poder adicionar filmes fora do período de exibição ao catálogo
- Deve poder excluir um filme do catálogo se este não estiver sido adicionado a alguma sessão
- Deve poder adicionar salas
- Número da sala deve ser único por cinema
- Deve poder editar número da sala
- Deve poder editar formato da sala caso não haja sessão ativa

### Sala
- Deve conter pelo menos uma cadeira
- Todas as linhas da matriz da sala deve ter o mesmo número de colunas

### Cadeira
- Não deve poder ter cadeiras com tipos iguais e valores diferentes na mesma sala *


### Filme
- Deve poder cadastrar um filme
- Não deve poder cadastrar filmes iguais
- Não deve poder cadastrar filme sem poster
- Deve poder extender ou diminuir o período de exibição, sendo, esse último, apenas possível se não houver sessão ativa no período que ficou de fora

### Sessão
- Deve poder criar uma sessão em uma sala de um mesmo cinema que não está no horário de outra sessão
- Não deve poder editar sessão depois de criada

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
