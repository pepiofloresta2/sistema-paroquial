imprimir(){

    let area = document.getElementById("doc");

    let w = window.open("");

    w.document.write(`
        <html>
        <head>
        <style>
        body{font-family:Arial}
        table{width:100%;border-collapse:collapse}
        td,th{border:1px solid #000;padding:5px}
        </style>
        </head>
        <body>${area.outerHTML}</body>
        </html>
    `);

    w.document.close();
    w.print();
}