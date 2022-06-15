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
let caixa = document.querySelector('.caixa')
let canva = document.querySelector('canvas')

let contagem = 0

// aqui é a base de dados para usar na página
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

// Aqui eu coloquei os emojis no menu inicial
for (let [index, val] of produtos.produto.entries()) {
    var listItem = document.createElement('option')
    listItem.value = produtos.produto[index]
    listItem.innerHTML = produtos.emoji[index]
    menu.appendChild(listItem)
}

function checarResposta(event) {

    let alternative = event.target
    
    // Primeiro fiz um if para que ao selecionar o produto que vc vai adivinhar o preço, não mude a cor do fundo como se o usuário tivesse errado
    if (alternative.parentElement.parentElement.classList.contains("menu")) {

        // Aqui foi uma tentativa para personalizar os quiz de acordo com o produto escolhido. Não consegui mudar os preços, por isso não finalizei esta parte
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

        // Depois de selecionar o produto, aparecem as perguntas
        titulo.style.display = 'none'
        titulo2.style.display = 'block'
        titulo2.style.margin = '0'
        menu.style.display = 'none'
        produto.style.display = 'block'
        
    }

    // Caso acerte, aparecem os resultados
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
