function validarNumero(valor) {
    if (!valor) return null;
    valor = valor.toString().replace(',', '.');
    if (!/^\d*\.?\d+$/.test(valor) || parseFloat(valor) <= 0) {
        return null;
    }
    return parseFloat(valor);
}

function exibirResultado(texto) {
    const divResultados = document.getElementById('resultados');
    divResultados.innerHTML += '<p>' + texto + '</p>';
}

function calcularCombustivel() {
    const resultadosDiv = document.getElementById('resultados');
    resultadosDiv.innerHTML = '';
    
    let nome;
    do {
        nome = prompt('Qual o seu nome?');
        if (!nome || nome.trim() === '' || /^[0-9]+$/.test(nome)) {
            alert('Nome inválido. Por favor, digite um nome válido.');
        }
    } while (!nome || nome.trim() === '' || /^[0-9]+$/.test(nome));

    exibirResultado(`<strong>Olá, ${nome}!</strong>`);

    let distCasaTrab;
    do {
        const inputDist = prompt('Qual a distância percorrida de sua casa até seu trabalho (em km)?');
        distCasaTrab = validarNumero(inputDist);
        if (distCasaTrab === null) {
            alert('Distância inválida. Digite um número positivo (use ponto ou vírgula para decimais).');
        }
    } while (distCasaTrab === null);

    let consumoMedVeiculo;
    do {
        const inputConsumo = prompt('Qual o consumo médio do seu veículo (em Km/L)?');
        consumoMedVeiculo = validarNumero(inputConsumo);
        if (consumoMedVeiculo === null) {
            alert('Consumo inválido. Digite um número positivo (use ponto ou vírgula para decimais).');
        }
    } while (consumoMedVeiculo === null);

    const consumoNecessario = distCasaTrab / consumoMedVeiculo;
    exibirResultado(`<strong>Consumo necessário: ${consumoNecessario.toFixed(2)} litros</strong>`);

    let quantPostos;
    do {
        const inputPostos = prompt('Quantos postos você pesquisou? (máximo 10)');
        if (!/^[1-9]$|^10$/.test(inputPostos)) {
            alert('Quantidade inválida. Digite um número inteiro entre 1 e 10.');
            quantPostos = null;
        } else {
            quantPostos = parseInt(inputPostos);
        }
    } while (quantPostos === null || quantPostos < 1 || quantPostos > 10);

    let totalValores = 0;
    let menorValorPesquisado = Infinity;

    for (let i = 1; i <= quantPostos; i++) {
        let valorPostoAtual;
        do {
            const inputValor = prompt(`Digite o valor encontrado (em R$) no posto ${i}:`);
            valorPostoAtual = validarNumero(inputValor);
            if (valorPostoAtual === null) {
                alert('Valor inválido. Digite um número positivo (use ponto ou vírgula para decimais).');
            }
        } while (valorPostoAtual === null);

        totalValores += valorPostoAtual;
        if (valorPostoAtual < menorValorPesquisado) {
            menorValorPesquisado = valorPostoAtual;
        }
    }

    const media = totalValores / quantPostos;
    exibirResultado(`<strong>Menor valor pesquisado: R$ ${menorValorPesquisado.toFixed(2)}</strong>`);
    exibirResultado(`<strong>Média dos preços pesquisados: R$ ${media.toFixed(2)}</strong>`);

const gastoDiario = 2 * (consumoNecessario * menorValorPesquisado);
exibirResultado(`<strong>Gasto diário (ida e volta): R$ ${gastoDiario.toFixed(2)}</strong>`);

// Atualização do botão
const botao = document.getElementById('startButton');

// 1. Remove todos os eventos existentes
botao.replaceWith(botao.cloneNode(true));
const novoBotao = document.getElementById('startButton');

// 2. Aplica o estilo de concluído
novoBotao.innerHTML = '<span class="button-content">Concluído <i class="fas fa-check"></i></span>';
novoBotao.className = 'action-button concluido';

// 3. Adiciona o evento de reset
novoBotao.onclick = function() {
    // Efeito visual suave
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
        // Restaura a tela inicial
        document.getElementById('resultados').innerHTML = '';
        this.innerHTML = 'Iniciar Cálculo';
        this.className = 'action-button';
        this.style.transform = '';
        this.onclick = calcularCombustivel;
    }, 200);
};
};
document.getElementById('startButton').addEventListener('click', calcularCombustivel);