# CineTicket DDD

## Regras de Negócio

### Cinema
- Deve poder criar um cinema com no mínimo 1 sala
- Deve poder editar quaisquer dados do cinema
- Deve poder excluir um cinema caso não haja sessões ativas
- Deve poder selecionar filmes da base de dados
- Não deve poder seleciona filmes fora do período de exibição

### Sala
- Deve poder criar uma sala com no mínimo 1 cadeira
- Não deve poder criar sala com mesmo número no mesmo cinema
- Deve poder editar quaisquer dados da sala
- Não deve poder remover cadeira se houver sessão com a cadeira selecionada

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
