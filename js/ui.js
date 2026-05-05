const UI = {

    imprimir() {

        let element = document.getElementById("doc");

        if (!element) {
            alert("Gere um relatório primeiro");
            return;
        }

        html2pdf().set({
            margin: 5,
            filename: "relatorio.pdf",
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        }).from(element).save();
    }

};