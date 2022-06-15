// Aqui eu seleciono vários conteúdos do HTML

let result = document.querySelector('.result')
let resposta = document.querySelector('.answer')
let opcoes = document.querySelector('.opcoes')
let op_itens = document.querySelector('.opcoes ol')
let titulo = document.querySelector('.titulo1')
let titulo2 = document.querySelector('.titulo2')
let especificacao = document.querySelector('.especificacao')
let produto = document.querySelector('.produto')
let dados = document.querySelector('.dados')
let button = document.querySelector('.proximo')
let menu = document.getElementById('menu')
let anos = document.getElementById('anos')
let start = document.querySelector('.start')
let home = document.querySelector('.home')
let caixa = document.querySelector('.caixa')
let canva = document.querySelector('canvas')


// aqui é a base de dados para usar na página
var produtos = [
    {
        name: 'Banana',
        especificacao: 'Um kg de',
        emoji: '🍌',
        precos: [1.2, 2.2, 2.3, 2.4, 2.5, 2.6, 2.9, 3.4, 3.5, 3., 4]
    },
    {
        name: 'Ovo',
        especificacao: 'Uma duzia de',
        emoji: '🥚',
        precos: [1.2, 4.2, 4.3, 4.4, 4.5, 2.6, 4.9, 4.4, 4.5, 4.6, 4]
    },
    {
        name: 'Alface',
        especificacao: 'Um kg de',
        emoji: '🥬',
        precos: [1.2, 2.5, 2.6, 2, 2.9, 2.8, 2.9, 3.1, 3.3, 3.5, 4]
    },
    {
        name: 'Hambúrguer',
        especificacao: 'Um simples',
        emoji: '🍔',
        precos: [10.2, 20.2, 20.3, 20.4, 20.5, 20.6, 20.9, 30.4, 30.5, 30, 40]
    },
]

// Aqui eu coloquei os emojis no menu inicial
for (let i = 0; i < produtos.length; i++) {

    let listItem = document.createElement('option')
    listItem.value = produtos[i].name
    listItem.innerHTML = produtos[i].emoji
    menu.appendChild(listItem)
    }
    
let labels_ano = []

// Aqui eu coloquei os anos possíveis
for (let i = 2012; i < 2022;  i++) {

    labels_ano.push(i) 
    var ano = document.createElement('option')
    ano.value = i - 2012
    ano.innerHTML = i
    anos.appendChild(ano)
}


// ao escolher o ano e o produto
start.addEventListener('click', escolher)

function escolher () {
    // verifica-se qual produto foi escolhido
    let value = menu.options[menu.selectedIndex].value;
    // com o produto escolhido, busca-se o index dele, de modo a permitir buscas seguintes
    let index_produto = produtos.map(e => e.name).indexOf(value);   
    // também é analisado o ano escolhido
    let index_preco = anos.options[anos.selectedIndex].value
    // a partir do produto escolhido, acrescenta-se o emoji, as especificações
    caixa.textContent = produtos[index_produto].emoji
    especificacao.textContent = produtos[index_produto].especificacao

    // também é observado o valor correto a ser descoberto
    let correto = produtos[index_produto].precos[index_preco]

    // em seguida, esse valor é adicionado às opções (infelizmente, na primeira posição sempre)
    let op_correta = document.createElement('li')
    op_correta.className = "correct"
    op_correta.innerHTML = 'R$ ' + correto
    op_itens.appendChild(op_correta)

    // depois de coletada a opção coreta, eliminamos ela da base
    let possibilidades = [...produtos[index_produto].precos]
    delete possibilidades[index_preco]

    // depois, acrescentamos todas as outras opções no programa (minha ideia é colocar sempre 6 opções de forma randômica, mas fica pra depois)
    
    let num_escolhidos = new Set()
    
    for (let i = 0; i < 7; i++) {
        num_escolhidos.add(Math.floor(Math.random() * possibilidades.length) + 1)
        let lastValue = [...num_escolhidos].pop()
        valor_errado = possibilidades[lastValue]
        if (valor_errado != undefined) {
            op_errada = document.createElement('li')
            op_errada.innerHTML = 'R$ ' + valor_errado
            op_itens.appendChild(op_errada)
        }
    }

    // Depois de selecionar o produto, aparecem as perguntas/
    titulo.style.display = 'none'
    titulo2.style.display = 'block'
    titulo2.style.margin = '0'
    home.style.display = 'none'
    produto.style.display = 'block'

    // aqui, colocamos os dados que vão aparecer no resultado
    let dado_antigo = document.createElement('p')
    dado_antigo.innerHTML = '<b>' + anos.options[anos.selectedIndex].innerHTML +  ':</b> R$ ' + correto 
    dados.appendChild(dado_antigo)

    let dado_atual = document.createElement('p')
    dado_atual.innerHTML =  '<b> 2022 :</b> R$ ' +  produtos[index_produto].precos.slice(-1)[0] 
    dados.appendChild(dado_atual)

    let variacao = document.createElement('p')
    variacao.innerHTML = '<b>' + 'variação' +  ':</b> ' + Math.round(produtos[index_produto].precos.slice(-1)[0] * 100 / correto)
    dados.appendChild(variacao)


    // dados do gráfico
    var data = {
    labels: labels_ano,
    datasets: [{
        label: value,
        backgroundColor: 'white',
        borderColor: 'white',
        data: produtos[index_produto].precos
    }]   
    };
    
    // configuracao dos gráficos
    const config = {
    type: 'line',
    data: data,
    options: {
        scales: {
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'Preço',
                    color: 'black'
                        },
                grid: {
                    color: 'black'
                },
                ticks: {
                    color: 'black'
                }
            },
            x: {
                grid: {
                    color: 'black'
                },
                ticks: {
                    color: 'black'
                }
            }
        }   
    } 
    };
    
    // plota gráfico
    const myChart = new Chart(
    document.getElementById('myChart'),
    config
    );
    
    }

op_itens.addEventListener('click', checarResposta)

let contagem = 0

function checarResposta(event) {

    let alternative = event.target

    // Caso acerte, aparecem os resultados
    if (alternative.classList.contains("correct") ) {
        result.textContent = 'ACERTOU'
        document.body.style.backgroundColor = '#3CCC53'
        opcoes.style.display = 'none'
        especificacao.style.display = 'none'
        dados.style.display = 'block'
        titulo2.style.height = '8rem'
        resposta.style.height = '5rem'
        button.style.display = 'block'
        canva.style.margin = '1rem'

        // Caso erre, muda a cor e aparece uma msg para tentar novamente
    } else {
        contagem = ++contagem
        alternative.classList.add('inactive')  
        if (contagem == 1) {
            result.textContent = 'Errou. Tente novamente'
            document.body.style.backgroundColor = '#F06C74'}
        if (contagem == 2) {
            result.textContent = 'Ainda não. Vamos de novo?'
            document.body.style.backgroundColor = '#FF5252'
        }
        if (contagem == 3) {
            result.textContent = 'ERROU :('
            document.body.style.backgroundColor = '#FF0000'
            opcoes.style.display = 'none'
            especificacao.style.display = 'none'
            dados.style.display = 'block'
            titulo2.style.height = '8rem'
            resposta.style.height = '5rem'
            button.style.display = 'block'
            canva.style.margin = '1rem'
        }

    }

    resposta.style.display = 'block'


}

// Aqui a página volta para o início
button.onclick = function() {
    document.location.reload();
}

