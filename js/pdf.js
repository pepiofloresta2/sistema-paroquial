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

        html2pdf()
            .from(area)
            .save("relatorio-paroquial.pdf");
    }

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