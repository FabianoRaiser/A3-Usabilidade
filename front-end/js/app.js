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
async function verificarChapa() {
    const valor1 = chapaDigitada1.value;
    const valor2 = chapaDigitada2.value;
    const imagemVotacao = document.querySelector('.votacao-img img');
    
    const chapa = `${valor1}${valor2}`;
    
    // Se não tiver dois dígitos, limpa a tela e retorna
    if (chapa.length !== 2) {
        imagemVotacao.style.display = 'none';
        chapaTexto.textContent = '';
        return;
    }
        
    try {
        const response = await fetch(`http://localhost:3001/chapas/${chapa}`);
        
        // Tratamento para voto em branco (00)
        if (chapa === '00') {
            chapaTexto.textContent = 'Voto em Branco';
            return;
        }

        // Tratamento para chapa válida
        if (response.ok) {
            const chapaInfo = await response.json();
            imagemVotacao.src = chapaInfo.img;
            imagemVotacao.style.opacity = '1';
            imagemVotacao.style.display = 'block';
            chapaTexto.textContent = chapaInfo.nome;
            return;
        }

        // Tratamento para voto nulo (chapa não encontrada)
        if (response.status === 404) {
            chapaTexto.textContent = 'Chapa não encontrada, voto Nulo';
            return;
        }

        // Outros erros
        imagemVotacao.style.display = 'none';
        chapaTexto.textContent = 'Erro ao buscar chapa';
        
    } catch (error) {
        // Apenas erros de rede ou outros erros críticos
        if (error.name !== 'AbortError') {
            imagemVotacao.style.display = 'none';
            chapaTexto.textContent = 'Erro ao buscar chapa';
        }
    }
}

// Event listeners para os inputs
chapaDigitada1.addEventListener('input', verificarChapa);
chapaDigitada2.addEventListener('input', verificarChapa);

// Botão CONFIRMA
confirmaBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    
    const valor1 = chapaDigitada1.value;
    const valor2 = chapaDigitada2.value;
    const numeroChapa = `${valor1}${valor2}`;
    
    try {
        let tipoVoto = 'normal';
        let chapaId = null;

        // Verifica se é voto em branco
        if (numeroChapa === '00') {
            tipoVoto = 'branco';
        } else {
            // Verifica se a chapa existe
            const response = await fetch(`http://localhost:3001/chapas/${numeroChapa}`);
            if (response.ok) {
                const chapa = await response.json();
                chapaId = chapa.id;
            } else {
                tipoVoto = 'nulo';
            }
        }

        // Envia o voto
        await fetch('http://localhost:3001/votos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chapaId,
                tipoVoto
            })
        });

        window.location.href = './fim.html';
    } catch (error) {
        console.error('Erro ao registrar voto:', error);
    }
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
