const Relatorio = {

gerar(){

let mesInput =
    document.getElementById("mesFiltro").value;

if(!mesInput){
    return alert("Selecione o mês");
}

let [ano, mes] = mesInput.split("-");

let referencia =
    new Date(ano, mes - 1)
    .toLocaleDateString(
        "pt-BR",
        {
            month:"long",
            year:"numeric"
        }
    );

API.enviar({
    acao:"buscar_relatorio",
    mes,
    ano
}).then(res=>{

let linhasEntradas = "";
let linhasSaidas = "";

let entradas = 0;
let saidas = 0;
let totalDizimoDinheiro = 0;
let totalDizimoPix = 0;
let totalDoacao = 0;
let totalColeta = 0;

let contador = 1;

// 🔵 PROCESSA LANÇAMENTOS
(res.lista || []).forEach(item=>{

    let valor =
        parseFloat(item.valor || 0);

    // 🔵 DÍZIMO CONSOLIDADO
    if(item.categoria === "Dízimo"){

        let forma =
            String(item.forma || "")
            .toUpperCase();

        if(forma === "PIX"){
            totalDizimoPix += valor;
        } else {
            totalDizimoDinheiro += valor;
        }

        return;
    }

    // 🔵 ENTRADAS
    if(item.tipo === "Entrada"){

    if(item.categoria === "Doação"){
        totalDoacao += valor;
    }

    if(item.categoria === "Coleta Missa"){
        totalColeta += valor;
    }

    return;
}

    // 🔴 SAÍDAS
    if(item.tipo === "Saída"){

        saidas += valor;

        linhasSaidas += `
        <tr>

            <td style="border:1px solid #000;padding:3px;text-align:center">
                ${contador++}
            </td>

            <td style="border:1px solid #000;padding:3px">
                ${item.data || ""}
            </td>

            <td style="border:1px solid #000;padding:3px">
                ${item.descricao || ""}
            </td>

            <td style="border:1px solid #000;padding:3px">
                ${item.fornecedor || "-"}
            </td>

            <td style="border:1px solid #000"></td>

            <td style="border:1px solid #000;padding:3px;text-align:right;color:red">
                R$ ${valor.toFixed(2)}
            </td>

        </tr>
        `;
    }

});

// 🔵 DATA FINAL DO MÊS
let ultimoDia = new Date(
    ano,
    mes,
    0
).toLocaleDateString("pt-BR");


// 🔵 DÍZIMO EM DINHEIRO
if(totalDizimoDinheiro > 0){

    entradas += totalDizimoDinheiro;

    linhas += `
    <tr style="background:#f8fafc">

        <td style="border:1px solid #000;padding:3px;text-align:center">
            ${contador++}
        </td>

        <td style="border:1px solid #000;padding:3px">
            ${ultimoDia}
        </td>

        <td style="border:1px solid #000;padding:3px">
            <b>DÍZIMO</b>
        </td>

        <td style="border:1px solid #000;padding:3px">
            Comunidade
        </td>

        <td style="border:1px solid #000;padding:3px;text-align:right">
            <b>R$ ${totalDizimoDinheiro.toFixed(2)}</b>
        </td>

        <td style="border:1px solid #000"></td>

    </tr>
    `;
}


// 🔵 DÍZIMO PIX
if(totalDizimoPix > 0){

    entradas += totalDizimoPix;

    linhas += `
    <tr style="background:#f8fafc">

        <td style="border:1px solid #000;padding:3px;text-align:center">
            ${contador++}
        </td>

        <td style="border:1px solid #000;padding:3px">
            ${ultimoDia}
        </td>

        <td style="border:1px solid #000;padding:3px">
            <b>DÍZIMO (PIX)</b>
        </td>

        <td style="border:1px solid #000;padding:3px">
            Comunidade
        </td>

        <td style="border:1px solid #000;padding:3px;text-align:right">
            <b>R$ ${totalDizimoPix.toFixed(2)}</b>
        </td>

        <td style="border:1px solid #000"></td>

    </tr>
    `;
}

// RESUMO ENTRADAS

if(totalDizimoDinheiro > 0){

    entradas += totalDizimoDinheiro;

    linhasEntradas += `
    <tr>
        <td colspan="4"
            style="border:1px solid #000;padding:3px">
            DÍZIMO
        </td>

        <td style="
            border:1px solid #000;
            padding:3px;
            text-align:right;
            font-weight:bold;
        ">
            R$ ${totalDizimoDinheiro.toFixed(2)}
        </td>

        <td style="border:1px solid #000">
            RECIBO _____
        </td>
    </tr>
    `;
}

if(totalDizimoPix > 0){

    entradas += totalDizimoPix;

    linhasEntradas += `
    <tr>
        <td colspan="4"
            style="border:1px solid #000;padding:3px">
            DÍZIMO PIX
        </td>

        <td style="
            border:1px solid #000;
            padding:3px;
            text-align:right;
            font-weight:bold;
        ">
            R$ ${totalDizimoPix.toFixed(2)}
        </td>

        <td style="border:1px solid #000">
            RECIBO _____
        </td>
    </tr>
    `;
}

if(totalDoacao > 0){

    entradas += totalDoacao;

    linhasEntradas += `
    <tr>
        <td colspan="4"
            style="border:1px solid #000;padding:3px">
            DOAÇÃO
        </td>

        <td style="
            border:1px solid #000;
            padding:3px;
            text-align:right;
            font-weight:bold;
        ">
            R$ ${totalDoacao.toFixed(2)}
        </td>

        <td style="border:1px solid #000">
            RECIBO _____
        </td>
    </tr>
    `;
}

if(totalColeta > 0){

    entradas += totalColeta;

    linhasEntradas += `
    <tr>
        <td colspan="4"
            style="border:1px solid #000;padding:3px">
            COLETA MISSA
        </td>

        <td style="
            border:1px solid #000;
            padding:3px;
            text-align:right;
            font-weight:bold;
        ">
            R$ ${totalColeta.toFixed(2)}
        </td>

        <td style="border:1px solid #000">
            RECIBO _____
        </td>
    </tr>
    `;
}

// 🔵 LINHAS VAZIAS ESTILO LIVRO CAIXA
for(let i=0;i<15;i++){

    linhas += `
    <tr>

        <td style="border:1px solid #000;height:24px"></td>
        <td style="border:1px solid #000"></td>
        <td style="border:1px solid #000"></td>
        <td style="border:1px solid #000"></td>
        <td style="border:1px solid #000"></td>
        <td style="border:1px solid #000"></td>

    </tr>
    `;
}

let linhas =
    linhasEntradas +

    `
    <tr>
        <td colspan="6"
            style="
                height:20px;
                background:#fff;
            ">
        </td>
    </tr>
    ` +

    linhasSaidas;

let saldo = entradas - saidas;

// 🔵 HTML FINAL
document.getElementById("res").innerHTML =
    FinanceiroTemplate.montar({

        referencia,
        linhas,
        entradas,
        saidas,
        saldo
    });

window.__RELATORIO_PRONTO__ = true;

}); // fecha API.enviar().then()

} // fecha gerar()

};