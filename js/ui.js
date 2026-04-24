const UI = {

    buscarDizimista() {

        let codigo = document.getElementById("codigo").value.trim();

        if (!codigo) {
            document.getElementById("nomeLanc").value = "";
            return;
        }

        Dizimistas.buscarPorCodigo(codigo);
    },

    lancar() {
        Lancamentos.adicionar();
    },

    relatorio() {
        Relatorio.gerar();
    },

    imprimir() {

        if (!window.__RELATORIO_PRONTO__) {
            alert("Gere o relatório primeiro.");
            return;
        }

        let area = document.getElementById("doc");

        if (!area) {
            alert("Relatório não encontrado.");
            return;
        }

        let janela = window.open("", "", "width=900,height=700");

        janela.document.write(`
            <html>
                <head>
                    <title>Impressão</title>
                    <style>
                        body {
                            font-family: Arial;
                            padding: 20px;
                        }

                        table {
                            width: 100%;
                            border-collapse: collapse;
                        }

                        th, td {
                            border: 1px solid #000;
                            padding: 6px;
                            text-align: left;
                        }

                        th {
                            background: #f0f0f0;
                        }

                        h3, h4 {
                            text-align: center;
                        }
                    </style>
                </head>
                <body>
                    ${area.outerHTML}
                </body>
            </html>
        `);

        janela.document.close();

        setTimeout(() => {
            janela.focus();
            janela.print();
        }, 500);
    }

};