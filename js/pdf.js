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

        html2pdf()
            .from(area)
            .save("relatorio-paroquial.pdf");
    }

};