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

        let elemento = area.cloneNode(true);

        elemento.style.background = "#ffffff";
        elemento.style.padding = "20px";
        elemento.style.width = "100%";
        elemento.style.display = "block";
        elemento.style.visibility = "visible";

        document.body.appendChild(elemento);

        const opt = {
            margin: 10,
            filename: "relatorio-paroquial.pdf",
            image: {
                type: "jpeg",
                quality: 1
            },
            html2canvas: {
                scale: 3,
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
            .from(elemento)
            .save()
            .then(() => {
                document.body.removeChild(elemento);
            });
    }

};