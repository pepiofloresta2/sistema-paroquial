// js/relatorio-dizimistas.js

const RelatorioDizimistas = {

    gerar() {

        let mesInput = document.getElementById("mesFiltro").value;

        if (!mesInput) {
            alert("Selecione o mês");
            return;
        }

        let [ano, mes] = mesInput.split("-");

        API.enviar({
            acao: "relatorio_dizimo",
            mes,
            ano
        }).then(res => {
            console.log("RELATORIO DIZIMO:", res);
            let lista = res.lista || [];

            if (lista.length === 0) {
                document.getElementById("res").innerHTML =
                    "<p>Sem dados de dízimo neste mês.</p>";
                return;
            }

            let total = 0;
            let linhas = "";

            lista.forEach(item => {

                let valor = parseFloat(item.valor || 0);
                total += valor;

                linhas += `
                    <tr class="hover:bg-slate-50">
                        <td class="p-3">${item.codigo || ""}</td>
                        <td class="p-3">${item.nome || ""}</td>
                        <td class="p-3 text-right">R$ ${valor.toFixed(2)}</td>
                    </tr>
                `;
            });

            let html = `
                <div class="bg-white rounded-2xl shadow p-6">

                    <h3 class="text-xl font-bold text-center mb-4">
                        Relatório de Dízimo - ${mes}/${ano}
                    </h3>

                    <table class="w-full border-collapse text-sm md:text-base">

                        <thead>
                            <tr class="border-b bg-slate-100">
                                <th class="text-left p-3 w-24">Código</th>
                                <th class="text-left p-3">Nome</th>
                                <th class="text-right p-3 w-40">Valor</th>
                            </tr>
                        </thead>

                        <tbody class="divide-y">
                            ${linhas}
                        </tbody>

                    </table>

                    <div class="mt-6 flex justify-end">
                        <div class="text-lg font-bold">
                            Total: R$ ${total.toFixed(2)}
                        </div>
                    </div>

                </div>
            `;

            document.getElementById("res").innerHTML = html;
        });
    }

};