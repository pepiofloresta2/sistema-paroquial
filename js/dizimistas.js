listar(destino = "listaDizimistasCadastro") {

    API.enviar({
        acao: "listar_dizimistas"
    }).then(res => {

        let lista = res.lista || [];

        let html = `
        <table style="width:100%; border-collapse:collapse; font-size:12px;">
            <thead>
                <tr style="background:#eee;">
                    <th style="border:1px solid #000; padding:6px;">Código</th>
                    <th style="border:1px solid #000; padding:6px;">Nome</th>
                    <th style="border:1px solid #000; padding:6px;">Telefone</th>
                    <th style="border:1px solid #000; padding:6px;">Ações</th>
                </tr>
            </thead>
            <tbody>
        `;

        lista.forEach(item => {
            html += `
                <tr>
                    <td style="border:1px solid #000; padding:6px;">${item.codigo}</td>
                    <td style="border:1px solid #000; padding:6px;">${item.nome}</td>
                    <td style="border:1px solid #000; padding:6px;">${item.tel || "-"}</td>
                    <td style="border:1px solid #000; padding:6px; text-align:center;">
                        <button onclick="Dizimistas.editar('${item.codigo}','${item.nome}','${item.tel || ""}')">✏️</button>
                        <button onclick="Dizimistas.excluir('${item.codigo}')">🗑️</button>
                    </td>
                </tr>
            `;
        });

        html += `</tbody></table>`;

        let el = document.getElementById(destino);
        if (el) el.innerHTML = html;
    });
}