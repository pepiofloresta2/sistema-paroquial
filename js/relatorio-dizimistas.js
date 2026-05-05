const RelatorioDizimistas = {

gerar(){

let mesInput = document.getElementById("mesFiltro").value;
if(!mesInput) return alert("Selecione o mês");

let [ano, mes] = mesInput.split("-");

API.enviar({
    acao:"buscar_relatorio",
    mes, ano
}).then(res=>{

let linhas="";
let total=0;

(res.lista||[]).forEach(item=>{

if(item.categoria!=="Dízimo") return;

let valor = parseFloat(item.valor||0);
total+=valor;

linhas+=`
<tr>
<td style="border:1px solid #000">${item.codigo}</td>
<td style="border:1px solid #000">${item.nome}</td>
<td style="border:1px solid #000">${item.data}</td>
<td style="border:1px solid #000">${item.forma}</td>
<td style="border:1px solid #000;text-align:right">R$ ${valor.toFixed(2)}</td>
</tr>`;
});

document.getElementById("res").innerHTML = `
<div id="doc" style="padding:10mm;width:190mm;margin:auto;border:1px solid #000">

<h3 style="text-align:center">RELATÓRIO DE DÍZIMO</h3>

<table style="width:100%;border-collapse:collapse;margin-top:10px">

<tr style="background:#eee">
<th style="border:1px solid #000">CÓDIGO</th>
<th style="border:1px solid #000">NOME</th>
<th style="border:1px solid #000">DATA</th>
<th style="border:1px solid #000">FORMA</th>
<th style="border:1px solid #000">VALOR</th>
</tr>

${linhas}

<tr>
<td colspan="4" style="border:1px solid #000"><b>TOTAL</b></td>
<td style="border:1px solid #000;text-align:right"><b>R$ ${total.toFixed(2)}</b></td>
</tr>

</table>

</div>
`;

window.__RELATORIO_PRONTO__ = true;

});
}
};