let result = document.querySelector('.result')
let resposta = document.querySelector('.answer')
let opcoes = document.querySelector('.opcoes')
let titulo = document.querySelector('.titulo1')
let titulo2 = document.querySelector('.titulo2')
let especificacao = document.querySelector('.especificacao')
let produto = document.querySelector('.produto')
let dados = document.querySelector('.dados')
let button = document.querySelector('.proximo')
let menu = document.querySelector('.menu')
let emoji = document.querySelector('.caixa')
let canva = document.querySelector('canvas')

let contagem = 0

function checarResposta(event) {

    let alternative = event.target

    if (alternative.parentElement.parentElement.classList.contains("menu")) {
        if (alternative.classList.contains("banana")) {
            especificacao.textContent = produtos.especificacao[0]
            emoji.textContent = produtos.emoji[0]
        }
        if (alternative.classList.contains("ovo")) {
            especificacao.textContent = produtos.especificacao[1]
            emoji.textContent = produtos.emoji[1]
        }
        if (alternative.classList.contains("alface")) {
            especificacao.textContent = produtos.especificacao[2]
            emoji.textContent = produtos.emoji[2]
        }
        if (alternative.classList.contains("hamburguer")) {
            especificacao.textContent = produtos.especificacao[3]
            emoji.textContent = produtos.emoji[3]
        }
        titulo.style.display = 'none'
        titulo2.style.display = 'block'
        titulo2.style.margin = '0'
        menu.style.display = 'none'
        produto.style.display = 'block'
        
    }

    else {
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
}

var produtos = {
    produto: ['Banana', 'Ovo', 'Alface', 'Hambúrguer'], 
    especificacao: ['Um kg de', 'Uma duzia de', 'Um kg de', 'Um simples'],
    emoji: ['🍌', '🥚', '🥬', '🍔' ],
    preco_2012: [2.2, 2.1, 1.3, 14],
    preco_2014: [2.4, 2.2, 1.5, 15.6],
    preco_2016: [2.6, 2.3, 1.7, 17.2],
    preco_2018: [2.8, 2.4, 1.6, 17.9],
    preco_2020: [3.1, 2.6, 1.9, 21],
    preco_2022: [3.4, 3.3, 2.5, 23]
}

let itens = document.querySelectorAll('.menu ol li')

for (let i = 0; i < itens.length; i++) {
    itens[i].innerHTML = produtos.emoji[i]
}

let alternativas = document.querySelectorAll('li')

for ( let alternativa of alternativas ) {
    alternativa.addEventListener('click', checarResposta)       
                 
}
button.onclick = function() {
    delete produtos[0];
    document.location.reload();
}

    const labels = [
'2012',
'2014',
'2016',
'2018',
'2020', 
'2022'
];



var data = {
labels: labels,
datasets: [{
    label: produtos.produto[0],
    backgroundColor: 'white',
    borderColor: 'white',
    data: [produtos.preco_2012[0], produtos.preco_2014[0], produtos.preco_2016[0], produtos.preco_2018[0], produtos.preco_2020[0], produtos.preco_2022[0]] 
}]   
};

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

const myChart = new Chart(
document.getElementById('myChart'),
config
);