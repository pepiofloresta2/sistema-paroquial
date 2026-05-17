const FinanceiroTemplate = {

    montar({
        referencia,
        linhas,
        entradas,
        saidas,
        saldo
    }) {

        return `

<div
id="doc"
style="
width:180mm;
max-width:100%;
margin:auto;
background:white;
padding:8mm;
font-family:Arial;
font-size:11px;
color:#000;
overflow-x:auto;
"
>

<div
style="
border:1px solid #000;
padding:10px;
display:flex;
justify-content:space-between;
align-items:center;
"
>

    <img
        src="assets/logo.png"
        style="height:60px"
    >

    <div style="text-align:center">

        <h2 style="margin:0">
            COMUNIDADE SÃO PIO
        </h2>

        <div style="margin-top:5px">
            MOVIMENTO FINANCEIRO
        </div>

        <div style="margin-top:5px;font-size:12px">
            REFERÊNCIA:
            <b style="text-transform:uppercase">
                ${referencia}
            </b>
        </div>

    </div>

    <img
        src="assets/diocese.png"
        style="height:60px"
    >

</div>


<div>

<table
style="
width:100%;
border-collapse:collapse;
margin-top:8px;
table-layout:fixed;
word-break:break-word;
"
>

<tr style="background:#e5e7eb">

    <th style="border:1px solid #000;padding:5px">Nº</th>
    <th style="border:1px solid #000;padding:5px">DATA</th>
    <th style="border:1px solid #000;padding:5px">HISTÓRICO</th>
    <th style="border:1px solid #000;padding:5px">RESPONSÁVEL</th>
    <th style="border:1px solid #000;padding:5px">ENTRADAS</th>
    <th style="border:1px solid #000;padding:5px">SAÍDAS</th>

</tr>

${linhas}

<tr>
    <td colspan="4"
        style="border:1px solid #000;padding:8px;font-weight:bold">
        SUBTOTAL
    </td>

    <td
        style="
        border:1px solid #000;
        padding:8px;
        text-align:right;
        color:green;
        font-weight:bold;
        "
    >
        R$ ${entradas.toFixed(2)}
    </td>

    <td
        style="
        border:1px solid #000;
        padding:8px;
        text-align:right;
        color:red;
        font-weight:bold;
        "
    >
        R$ ${saidas.toFixed(2)}
    </td>
</tr>

<tr>
    <td colspan="4"
        style="
        border:1px solid #000;
        padding:10px;
        font-size:14px;
        font-weight:bold;
        "
    >
        SALDO FINAL
    </td>

    <td colspan="2"
        style="
        border:1px solid #000;
        padding:10px;
        text-align:right;
        color:#2563eb;
        font-size:16px;
        font-weight:bold;
        "
    >
        R$ ${saldo.toFixed(2)}
    </td>
</tr>

</table>

</div>


<div
style="
margin-top:60px;
display:flex;
justify-content:space-between;
"
>

    <div style="text-align:center;width:250px">

        ___________________________

        <div style="margin-top:8px">
            Tesouraria
        </div>

    </div>

    <div style="text-align:center;width:250px">

        ___________________________

        <div style="margin-top:8px">
            Coordenação
        </div>

    </div>

</div>

</div>
`;
    }
};