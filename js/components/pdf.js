PDF.imprimir = function () {

    let element =
        document.getElementById("doc");

    if (!element) {
        alert("Gere um relatório primeiro");
        return;
    }

    html2pdf()
        .set({
            margin: [5, 5, 5, 5],

            filename: "relatorio.pdf",

            image: {
                type: "jpeg",
                quality: 0.98
            },

            html2canvas: {
                scale: 2,
                useCORS: true
            },

            jsPDF: {
                unit: "mm",
                format: "a4",
                orientation: "portrait"
            },

            pagebreak: {
                mode: ["css", "legacy"]
            }
        })
        .from(element)
        .save();
};