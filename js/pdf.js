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

        const opt = {
            margin: 10,
            filename: "relatorio-paroquial.pdf",
            image: {
                type: "jpeg",
                quality: 0.98
            },
            html2canvas: {
                scale: 2,
                useCORS: true,
                logging: false
            },
            jsPDF: {
                unit: "mm",
                format: "a4",
                orientation: "portrait"
            }
        };

        html2pdf()
            .set(opt)
            .from(area)
            .save();
    }

};