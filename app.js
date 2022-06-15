// Aqui eu seleciono vários conteúdos do HTML

let result = document.querySelector('.result')
let resposta = document.querySelector('.answer')
let opcoes = document.querySelector('.opcoes')
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

let contagem = 0

// aqui é a base de dados para usar na página
var produtos = [
    {
        name: 'Banana',
        especificacao: 'Um kg de',
        emoji: '🍌',
        precos: [1.2, 2.2, 2.3, 2.4, 2.5, 2.6, 2.9, 3.4]
    },
    {
        name: 'Ovo',
        especificacao: 'Uma duzia de',
        emoji: '🥚',
        precos: [1.2, 2.2, 2.3, 2.4, 2.5, 2.6, 2.9, 3.4]
    },
    {
        name: 'Alface',
        especificacao: 'Um kg de',
        emoji: '🥬',
        precos: [1.2, 2.2, 2.3, 2.4, 2.5, 2.6, 2.9, 3.4]
    },
    {
        name: 'Hambúrguer',
        especificacao: 'Um simples',
        emoji: '🍔',
        precos: [1.2, 2.2, 2.3, 2.4, 2.5, 2.6, 2.9, 3.4]
    },
]

// Aqui eu coloquei os emojis no menu inicial
for (let i = 0; i < produtos.length; i++) {

    let listItem = document.createElement('option')
    listItem.value = produtos[i].name
    listItem.innerHTML = produtos[i].emoji
    menu.appendChild(listItem)
    }

for (let i = 2012; i < 2022;  i++) {
    var ano = document.createElement('option')
    ano.value = i
    ano.innerHTML = i
    anos.appendChild(ano)
}

start.addEventListener('click', escolher)

function escolher () {
    let value = menu.options[menu.selectedIndex].value;
    let index = produtos.map(e => e.name).indexOf(value);   

    caixa.textContent = produtos[index].emoji
    especificacao.textContent = produtos[index].especificacao
    

    // Depois de selecionar o produto, aparecem as perguntas
    titulo.style.display = 'none'
    titulo2.style.display = 'block'
    titulo2.style.margin = '0'
    home.style.display = 'none'
    produto.style.display = 'block'
        

}

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
            document.body.style.backgroundColor = '#E1000E'
        }

    }

    resposta.style.display = 'block'


}

// Aqui é pra checar a resposta
let alternativas = document.querySelectorAll('li')

for ( let alternativa of alternativas ) {
    alternativa.addEventListener('click', checarResposta)       
                 
}

// Aqui a página volta para o início
button.onclick = function() {
    document.location.reload();
}

// dados do gráfico
    const labels = [
'2012',
'2014',
'2016',
'2018',
'2020', 
'2022'
];


// dados do gráfico
var data = {
labels: labels,
datasets: [{
    label: produtos.produto[0],
    backgroundColor: 'white',
    borderColor: 'white',
    data: [produtos.preco_2012[0], produtos.preco_2014[0], produtos.preco_2016[0], produtos.preco_2018[0], produtos.preco_2020[0], produtos.preco_2022[0]] 
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
