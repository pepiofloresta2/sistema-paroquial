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

        setTimeout(() => {

            let opt = {
                margin: 0.5,
                filename: "relatorio-paroquial.pdf",
                image: {
                    type: "jpeg",
                    quality: 0.98
                },
                html2canvas: {
                    scale: 2,
                    logging: false,
                    useCORS: true
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

        }, 500); // meio segundo resolve quase sempre
    }
};