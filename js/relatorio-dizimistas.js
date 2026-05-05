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

// ✅ CORREÇÃO AQUI
if (!item.categoria || item.categoria.toLowerCase().trim() !== "dízimo") return;

let valor = parseFloat(item.valor||0);
total+=valor;

linhas+=`
<tr>
<td style="border:1px solid #000; padding:6px;">${item.codigo||""}</td>
<td style="border:1px solid #000; padding:6px;">${item.nome||""}</td>
<td style="border:1px solid #000; padding:6px;">${item.data||""}</td>
<td style="border:1px solid #000; padding:6px;">${item.forma||""}</td>
<td style="border:1px solid #000; padding:6px; text-align:right;">R$ ${valor.toFixed(2)}</td>
</tr>`;
});

document.getElementById("res").innerHTML = `
<div id="doc" style="font-family:Arial;">

<h2 style="text-align:center;">RELATÓRIO DE DÍZIMO</h2>
<h4 style="text-align:center;">${mes}/${ano}</h4>

<table style="width:100%; border-collapse:collapse; font-size:12px;">
<thead>
<tr style="background:#eee;">
<th style="border:1px solid #000;">CÓDIGO</th>
<th style="border:1px solid #000;">NOME</th>
<th style="border:1px solid #000;">DATA</th>
<th style="border:1px solid #000;">FORMA</th>
<th style="border:1px solid #000;">VALOR</th>
</tr>
</thead>

<tbody>
${linhas}
</tbody>

<tfoot>
<tr>
<td colspan="4" style="border:1px solid #000;"><strong>TOTAL</strong></td>
<td style="border:1px solid #000; text-align:right;">
<strong>R$ ${total.toFixed(2)}</strong>
</td>
</tr>
</tfoot>
</table>

</div>
`;

window.__RELATORIO_PRONTO__ = true;

});
}
};