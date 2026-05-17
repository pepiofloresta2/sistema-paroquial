const Backup = {

    exportar() {

        const hoje = new Date();

        const mes =
            String(
                hoje.getMonth() + 1
            ).padStart(2, "0");

        const ano =
            hoje.getFullYear();

        Promise.all([

            API.enviar({
                acao:
                    "listar_dizimistas"
            }),

            API.enviar({
                acao:
                    "buscar_relatorio",
                mes,
                ano
            })

        ])
        .then(([dizimistas, financeiro]) => {

            const dados = {

                sistema:
                    "Sistema Paroquial",

                data:
                    new Date()
                    .toLocaleString(
                        "pt-BR"
                    ),

                dizimistas:
                    dizimistas.lista || [],

                financeiro:
                    financeiro.lista || []
            };

            const blob =
                new Blob(
                    [
                        JSON.stringify(
                            dados,
                            null,
                            2
                        )
                    ],
                    {
                        type:
                            "application/json"
                    }
                );

            const link =
                document.createElement(
                    "a"
                );

            link.href =
                URL.createObjectURL(
                    blob
                );

            link.download =
                "backup-paroquial.json";

            link.click();

            URL.revokeObjectURL(
                link.href
            );

            alert(
                "Backup exportado com sucesso."
            );
        })
        .catch(err => {

            console.error(err);

            alert(
                "Erro ao gerar backup."
            );
        });
    }

};