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
        name: 'Banana nanica',
        especificacao: 'Um kg de',
        emoji: '🍌',
        precos: [1.25, 1.3, 1.5, 1.25, 1.25, 1.5, 1.5, 2, 2.33, 2.5, 3.06]
    },
    {
        name: 'Maçã Fuji',
        especificacao: 'Um kg de',
        emoji: '🍎',
        precos: [2.97, 4.16, 4.47, 4.06, 5.9, 3.78, 4.78, 4.98, 4.33, 3.38, 6.01 ]
    },
    {
        name: 'Limão Tahiti extra',
        especificacao: 'Um kg de',
        emoji: '🍋',
        precos: [0.6, 1.6, 1.25, 1.5, 3, 1.25, 3.25, 1.5, 2.5, 1.5, 1.4]
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

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
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

    // vamos criar uma array para depois preencher as opções de resposta
    let opcoes_menu = []

    // eliminamos a opcao correta da base para não ter erro de repeti-la
    let possibilidades = [...produtos[index_produto].precos]
    delete possibilidades[index_preco]

    // depois, acrescentamos todas as outras opções no programa em um set, de modo que não haja repetição dos dados
    
    for (let i = 0; i < 8; i++) {
        let index_escolhido = (Math.floor(Math.random() * possibilidades.length) + 1)
        let valor_escolhido = possibilidades[index_escolhido]
        console.log(index_escolhido, valor_escolhido)
        if (valor_escolhido != undefined) {
            opcoes_menu.push(valor_escolhido)
            delete possibilidades[index_escolhido]
        }
        else {
            i-- 
        }
    }
    // em seguida, acrescentamos a resposta certa na array
    opcoes_menu.push(correto)
    
    shuffle(opcoes_menu)

    for (let item of opcoes_menu) {
        let opcoes_add = document.createElement('li')
        opcoes_add.innerHTML = 'R$ ' + item
        console.log(opcoes_add)
        op_itens.appendChild(opcoes_add)}

    // Depois de selecionar o produto, aparecem as perguntas/
    resposta.style.display = 'block'
    result.textContent = 'Escolha um valor'
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
    let variacao_valor =  Math.round((produtos[index_produto].precos.slice(-1)[0] * 100 / correto) - 100)
    if (variacao_valor > 0) {
        variacao.innerHTML = '<b>' + 'Cresceu' +  ':</b> ' + variacao_valor + '%'
        dados.appendChild(variacao)
    }
    else {
        variacao.innerHTML = '<b>' + 'Caiu' +  ':</b> ' + variacao_valor + '%'
        dados.appendChild(variacao)
    }


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


}

// Aqui a página volta para o início
button.onclick = function() {
    document.location.reload();
}

