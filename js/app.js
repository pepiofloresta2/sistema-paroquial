window.onload = () => {

    // controla se existe relatório pronto para PDF/impressão
    window.__RELATORIO_PRONTO__ = false;

    // limpa nome automático ao iniciar
    let nomeCampo = document.getElementById("nomeLanc");
    if (nomeCampo) {
        nomeCampo.value = "";
    }

    // limpa resultado anterior
    let resultado = document.getElementById("res");
    if (resultado) {
        resultado.innerHTML = "";
    }

};