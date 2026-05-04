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

        let area = document.getElementById("doc");

        if (!area) {
            alert("Relatório não encontrado");
            return;
        }

        let janela = window.open("", "_blank");

        janela.document.open();
        janela.document.write(`
            <html>
                <head>
                    <title>Impressão</title>
                </head>
                <body>
                    ${area.outerHTML}
                </body>
            </html>
        `);
        janela.document.close();

        setTimeout(() => {
            janela.print();
        }, 500);
    }

};