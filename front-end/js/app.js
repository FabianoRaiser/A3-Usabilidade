const chapaDigitada1 = document.getElementById('chapaDigitada1');
const chapaDigitada2 = document.getElementById('chapaDigitada2');

// Adiciona autofocus no primeiro input quando a página carrega
window.addEventListener('load', () => {
    chapaDigitada1.focus();
});

// Adiciona evento para mudar o foco para o segundo input
chapaDigitada1.addEventListener('input', (event) => {
    if (event.target.value.length === 1) {
        chapaDigitada2.focus();
    }
});

const chapaTexto = document.querySelector('.votacao-texto');

const corrigeBtn = document.querySelector('.votacao-botao.corrige');
const brancoBtn = document.querySelector('.votacao-botao.branco');
const confirmaBtn = document.querySelector('.votacao-botao.confirma');

// Função para verificar o número da chapa
function verificarChapa() {
    const valor1 = chapaDigitada1.value;
    const valor2 = chapaDigitada2.value;
    const imagemVotacao = document.querySelector('.votacao-img img');
    
    // Exemplo: chapa 42 mostra "Chapa do Douglas Adams"
    if (valor1 === '4' && valor2 === '2') {
        chapaTexto.textContent = 'Chapa do Douglas Adams';
        imagemVotacao.style.display = 'block';
        imagemVotacao.src = './assets/chapa42.jpg';
    } 
    // Você pode adicionar mais chapas aqui com mais condições if
    else {
        chapaTexto.textContent = 'Chapa não encontrada, voto Nulo';
        imagemVotacao.style.display = 'none';
    }
}

// Event listeners para os inputs
chapaDigitada1.addEventListener('input', verificarChapa);
chapaDigitada2.addEventListener('input', verificarChapa);

// Botão CONFIRMA
confirmaBtn.addEventListener('click', (event) => {
    event.preventDefault();
    window.location.href = './fim.html';
});

// Botão BRANCO
brancoBtn.addEventListener('click', (event) => {
    event.preventDefault();
    chapaDigitada1.value = '0';
    chapaDigitada2.value = '0';
    chapaTexto.textContent = 'Voto em Branco';
    const imagemVotacao = document.querySelector('.votacao-img img');
    imagemVotacao.style.display = 'block';
    imagemVotacao.src = './assets/branco.jpg';
});

// Botão CORRIGE
corrigeBtn.addEventListener('click', (event) => {
    event.preventDefault();
    chapaDigitada1.value = '';
    chapaDigitada2.value = '';
    chapaTexto.textContent = '';
    const imagemVotacao = document.querySelector('.votacao-img img');
    imagemVotacao.style.display = 'none';
});
