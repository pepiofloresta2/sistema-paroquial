// js/ui.js

const UI = {

    buscarDizimista() {

        let codigo = document.getElementById("codigo").value.trim();

        if (!codigo) return;

        API.enviar({
            acao: "buscar_dizimista",
            codigo
        }).then(res => {
            document.getElementById("nomeLanc").value = res.nome || "";
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

        window.print();
    }

};