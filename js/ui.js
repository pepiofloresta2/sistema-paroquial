const UI = {

    buscarDizimista() {

        let codigo = document.getElementById("codigo").value.trim();

        if (!codigo) return;

        fetch(CONFIG.API_URL + "?acao=buscar_dizimista&codigo=" + codigo)
            .then(res => res.json())
            .then(d => {
                document.getElementById("nomeLanc").value = d.nome || "";
            });
    },

    lancar() {
        Lancamentos.adicionar();
    },

    relatorio() {
        Relatorio.gerar();
    },

    imprimir() {

        if (!window.__RELATORIO_PRONTO__) {
            alert("Gere o relatório primeiro");
            return;
        }

        let conteudo = document.getElementById("doc");

        if (!conteudo) {
            alert("Relatório não encontrado");
            return;
        }

        let janela = window.open("", "_blank");

        janela.document.open();
        janela.document.body.innerHTML = conteudo.outerHTML;
        janela.document.close();

        setTimeout(() => {
            janela.print();
        }, 500);
    }

};