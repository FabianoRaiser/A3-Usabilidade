// Adiciona autofocus no input do RA quando a página carrega
window.addEventListener('load', () => {
    const raInput = document.getElementById('raInput');
    raInput.focus();
});

async function verificarRA(event) {
    event.preventDefault();
    const raInput = document.getElementById('raInput').value;
    const mensagemElement = document.getElementById('mensagem');

    try {
        const response = await fetch('http://localhost:3001/eleitores/verificar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ra: raInput })
        });
        
        const usuario = await response.json();

        if (response.ok) {
            if (usuario.votou) {
                mensagemElement.textContent = "Acesso negado! Este RA já votou.";
                mensagemElement.style.color = "goldenrod";
            } else {
                mensagemElement.textContent = "Acesso liberado! Redirecionando...";
                mensagemElement.style.color = "lightgreen";
                
                setTimeout(() => {
                    try {
                        window.location.replace('./pages/votacao.html');
                    } catch (e) {
                        window.location.href = './pages/votacao.html';
                    }
                }, 800);
            }
        } else {
            mensagemElement.textContent = "RA não encontrado!";
            mensagemElement.style.color = "red";
        }
    } catch (error) {
        mensagemElement.textContent = "Erro ao verificar RA. Tente novamente.";
        mensagemElement.style.color = "red";
        console.error('Erro:', error);
    }
}

// Adiciona validação para aceitar apenas números e limitar o tamanho
const raInput = document.getElementById('raInput');
raInput.addEventListener('input', (event) => {
    // Remove qualquer caractere que não seja número
    event.target.value = event.target.value.replace(/\D/g, '');
    
    // Limita o tamanho para 9 dígitos (tamanho padrão de um RA)
    if (event.target.value.length > 9) {
        event.target.value = event.target.value.slice(0, 9);
    }
});
