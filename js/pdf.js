// js/pdf.js

const PDF = {

    gerar() {

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

        janela.document.write(`
            <html>
                <head>
                    <title>PDF</title>
                    <style>
                        body {
                            font-family: Arial;
                            padding: 30px;
                        }

                        table {
                            width: 100%;
                            border-collapse: collapse;
                        }

                        th, td {
                            border: 1px solid #ccc;
                            padding: 8px;
                            text-align: left;
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
            janela.print();
            janela.close();
        }, 1000);
    }

};