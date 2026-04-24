const PDF = {

    gerar() {

        if (!window.__RELATORIO_PRONTO__) {
            alert("Gere o relatório primeiro.");
            return;
        }

        let area = document.getElementById("doc");

        if (!area) {
            alert("Relatório não encontrado.");
            return;
        }

        let clone = area.cloneNode(true);

        // melhora renderização do PDF
        clone.style.background = "#ffffff";
        clone.style.padding = "20px";
        clone.style.maxWidth = "900px";
        clone.style.margin = "0 auto";

        // evita quebra por overflow
        clone.querySelectorAll("table").forEach(tabela => {
            tabela.style.width = "100%";
            tabela.style.borderCollapse = "collapse";
        });

        html2pdf()
            .from(clone)
            .set({
                margin: 5,
                filename: "relatorio_paroquial.pdf",
                image: {
                    type: "jpeg",
                    quality: 0.98
                },
                html2canvas: {
                    scale: 3,
                    useCORS: true
                },
                jsPDF: {
                    unit: "mm",
                    format: "a4",
                    orientation: "portrait"
                }
            })
            .save();
    }

};