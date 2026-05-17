const Backup = {

    exportar() {

        Promise.all([

            API.enviar({
                acao: "listar_dizimistas"
            }),

            API.enviar({
                acao: "buscar_relatorio"
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