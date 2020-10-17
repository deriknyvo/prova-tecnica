const form = document.getElementById('form');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const [ano, mes, dia] = event.target.elements[2].value.split('-');
    const hoje = new Date();
    const dataNascimento = new Date(ano, mes, dia, 0, 0, 0);
    const tempoParaTeste = 1000 * 60 * 60 * 24 * 365 * 18;
    const span = document.getElementById('menor');

    if (hoje.getTime() - dataNascimento.getTime() >= tempoParaTeste) {
        span.style.display = 'none';
    } else {
        span.style.display = 'block';
    }
});