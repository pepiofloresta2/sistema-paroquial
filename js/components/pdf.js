const PDF = {

    imprimir() {

        const element =
            document.getElementById(
                "doc"
            );

        if (!element) {

            alert(
                "Gere um relatório primeiro"
            );

            return;
        }

        html2pdf()
            .set({

                margin: [3, 3, 3, 3],

                filename:
                    "relatorio.pdf",

                image: {
                    type: "jpeg",
                    quality: 1
                },

                html2canvas: {
                    scale: 2,
                    useCORS: true,
                    scrollY: 0
                },

                jsPDF: {
                    unit: "mm",
                    format: "a4",
                    orientation:
                        "portrait"
                }

            })
            .from(element)
            .save();
    }

};