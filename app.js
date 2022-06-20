let dados_ipca ={"V":{"2000":5.97,"2001":7.67,"2002":12.53,"2003":9.3,"2004":7.6,"2005":5.69,"2006":3.14,"2007":4.46,"2008":5.9,"2009":4.31,"2010":5.91,"2011":6.5,"2012":5.84,"2013":5.91,"2014":6.41,"2015":10.67,"2016":6.29,"2017":2.95,"2018":3.75,"2019":4.31,"2020":4.52,"2021":10.06}}

// Aqui eu guardo os dados para o gráfico
let inflacao = Object.values(dados_ipca["V"])
let anos_ipca = Object.keys(dados_ipca["V"])


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
let fonte = document.querySelector('.dados p')

// aqui é a base de dados para usar na página
var produtos = [
    {
        name: 'Banana nanica',
        especificacao: 'um kg de',
        emoji: '🍌',
        precos: [1.25, 1.3, 1.5, 1.25, 1.25, 1.5, 1.5, 2, 2.33, 2.5, 3.06]
    },
    {
        name: 'Maçã Fuji',
        especificacao: 'um kg de',
        emoji: '🍎',
        precos: [2.97, 4.16, 4.47, 4.06, 5.9, 3.78, 4.78, 4.98, 4.33, 3.38, 6.01]
    },
    {
        name: 'Limão Tahiti extra',
        especificacao: 'um kg de',
        emoji: '🍋',
        precos: [0.6, 1.6, 1.25, 1.5, 3, 1.25, 3.25, 1.5, 2.5, 1.5, 1.4]
    },
    {
        name: 'Gasolina',
        especificacao: 'um litro de',
        emoji: '⛽',
        precos: [2.75, 2.76, 2.95, 3.0, 3.64, 4, 4.15, 4.33, 4.56, 4.51, 6.62]
    }
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
for (let i = 2012; i <= 2022; i++) {

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

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

// ao escolher o ano e o produto
start.addEventListener('click', escolher)

function escolher() {
    // verifica-se qual produto foi escolhido
    let value = menu.options[menu.selectedIndex].value;
    // com o produto escolhido, busca-se o index dele, de modo a permitir buscas seguintes
    let index_produto = produtos.map(e => e.name).indexOf(value);
    // também é analisado o ano escolhido
    let index_preco = anos.options[anos.selectedIndex].value
    // a partir do produto escolhido, acrescenta-se o emoji, as especificações
    caixa.textContent = produtos[index_produto].emoji
    especificacao.textContent = 'Em' + anos.options[anos.selectedIndex].innerHTML + ', ' + produtos[index_produto].especificacao

    // também é observado o valor correto a ser descoberto
    let correto = produtos[index_produto].precos[index_preco]

    // vamos criar uma array para depois preencher as opções de resposta
    let opcoes_menu = []

    // eliminamos a opcao correta da base para não ter erro de repeti-la
    let possibilidades = [...produtos[index_produto].precos]
    delete possibilidades[index_preco]
    // depois, acrescentamos todas as outras opções no programa em um set, de modo que não haja repetição dos dados

    var max = possibilidades.reduce(function (a, b) {
        return Math.max(a, b);
    }, -Infinity);

    var min = possibilidades.reduce(function (a, b) {
        return Math.min(a, b);
    }, 1);


    for (let i = 0; i < 8; i++) {
        let valor_escolhido = (getRandomArbitrary(min, max)).toFixed(2);
        if (!opcoes_menu.includes(valor_escolhido)) {
            opcoes_menu.push(valor_escolhido);
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
        op_itens.appendChild(opcoes_add)
    }

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
    dado_antigo.innerHTML = '<b>' + anos.options[anos.selectedIndex].innerHTML + ':</b> R$ ' + correto
    fonte.before(dado_antigo)

    let dado_atual = document.createElement('p')
    dado_atual.innerHTML = '<b> 2022 :</b> R$ ' + produtos[index_produto].precos.slice(-1)[0]
    fonte.before(dado_atual)

    let variacao = document.createElement('p')
    let variacao_valor = Math.round((produtos[index_produto].precos.slice(-1)[0] * 100 / correto) - 100)
    if (variacao_valor > 0) {
        variacao.innerHTML = '<b>' + 'Cresceu' + ':</b> ' + variacao_valor + '%'
        fonte.before(variacao)
    }
    else {
        variacao.innerHTML = '<b>' + 'Caiu' + ':</b> ' + variacao_valor + '%'
        fonte.before(variacao)
    }


    // dados do gráfico 1
    var data = {
        labels: labels_ano,
        datasets: [
            {
                label: produtos[0].name,
                backgroundColor: '#373634',
                borderColor: '#373634',
                data: produtos[0].precos
            },
            {
                label: produtos[1].name,
                backgroundColor: '#666461',
                borderColor: '#666461',
                data: produtos[1].precos
            },
            {
                label: produtos[2].name,
                backgroundColor: '#9E9B96',
                borderColor: '#9E9B96',
                data: produtos[2].precos
            },
            {
                label: produtos[3].name,
                backgroundColor: '#E8E4DC',
                borderColor: '#E8E4DC',
                data: produtos[3].precos
            }
        ]
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
// dados do gráfico 2
var data = {
    labels: anos_ipca,
    datasets: [
        {
            label: "Inflação em 12 meses",
            backgroundColor: '#373634',
            borderColor: '#373634',
            data: inflacao
        }]
};

// configuracao dos gráficos
const config = {
    type: 'bar',
    data: data,
    options: {
        scales: {
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'Variação',
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
    document.getElementById('myChart2'),
    config
);


op_itens.addEventListener('click', checarResposta)

let contagem = 0

function checarResposta(event) {

    let value = menu.options[menu.selectedIndex].value;
    // com o produto escolhido, busca-se o index dele, de modo a permitir buscas seguintes
    let index_produto = produtos.map(e => e.name).indexOf(value);
    // também é analisado o ano escolhido
    let index_preco = anos.options[anos.selectedIndex].value
    // a partir do produto escolhido, acrescenta-se o emoji, as especificações
    caixa.textContent = produtos[index_produto].emoji

    // também é observado o valor correto a ser descoberto
    let correto = produtos[index_produto].precos[index_preco]

    let alternative = event.target

    // Caso acerte, aparecem os resultados
    if (alternative.tagName === 'LI')
        if (alternative.innerHTML == 'R$ ' + correto) {
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
                document.body.style.backgroundColor = '#F06C74'
            }
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
button.onclick = function () {
    document.location.reload();
}

