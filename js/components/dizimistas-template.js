const DizimistasTemplate = {

    montar({
        referencia,
        linhas,
        total
    }) {

        return `

<div
id="doc"
style="
font-family:Arial;
background:white;
padding:20px;
max-width:100%;
overflow-x:auto;
"
>

    <h2 style="text-align:center;">
        RELATÓRIO DE DÍZIMO
    </h2>

    <h4 style="text-align:center;">
        ${referencia}
    </h4>

    <div style="overflow-x:auto;">

        <table
            style="
            width:100%;
            min-width:700px;
            border-collapse:collapse;
            font-size:12px;
            "
        >

            <thead>

                <tr style="background:#eee;">

                    <th style="border:1px solid #000;padding:6px;">
                        CÓDIGO
                    </th>

                    <th style="border:1px solid #000;padding:6px;">
                        NOME
                    </th>

                    <th style="border:1px solid #000;padding:6px;">
                        DATA
                    </th>

                    <th style="border:1px solid #000;padding:6px;">
                        FORMA
                    </th>

                    <th style="border:1px solid #000;padding:6px;">
                        VALOR
                    </th>

                </tr>

            </thead>

            <tbody>

                ${linhas}

            </tbody>

            <tfoot>

                <tr>

                    <td
                        colspan="4"
                        style="
                        border:1px solid #000;
                        padding:8px;
                        font-weight:bold;
                        "
                    >
                        TOTAL
                    </td>

                    <td
                        style="
                        border:1px solid #000;
                        padding:8px;
                        text-align:right;
                        font-weight:bold;
                        color:green;
                        "
                    >
                        R$ ${total.toFixed(2)}
                    </td>

                </tr>

            </tfoot>

        </table>

    </div>

</div>
`;
    }
};