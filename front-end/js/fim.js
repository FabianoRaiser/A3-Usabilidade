// Adiciona um contador regressivo e redireciona após 10 segundos
window.addEventListener('load', () => {
    const contadorElement = document.getElementById('contador');
    let segundos = 10;

    // Atualiza o contador a cada segundo
    const interval = setInterval(() => {
        segundos--;
        if (contadorElement) {
            contadorElement.textContent = `Redirecionando em ${segundos} segundos...`;
        }

        // Quando chegar a 0, redireciona para a página inicial
        if (segundos === 0) {
            clearInterval(interval);
            window.location.href = '../index.html';
        }
    }, 1000);
});
