// exemplo1.js

document.addEventListener('DOMContentLoaded', function () {
    const btnGerar = document.getElementById('btnGerar');
    const numBase = document.getElementById('numBase');
    const numLimite = document.getElementById('numLimite');
    const saidaTabuada = document.getElementById('saidaTabuada');
    const resumoPares = document.getElementById('resumoPares');

    btnGerar.addEventListener('click', gerarTabuada);

    function gerarTabuada() {
        const base = parseInt(numBase.value);
        const limite = parseInt(numLimite.value);

        // Validações
        if (isNaN(base) || isNaN(limite)) {
            saidaTabuada.innerHTML = '<p style="color: red;">Por favor, introduza valores válidos.</p>';
            return;
        }

        if (limite < 1 || limite > 50) {
            saidaTabuada.innerHTML = '<p style="color: red;">O limite deve estar entre 1 e 50.</p>';
            return;
        }

        // Gerar tabuada
        let html = '<table style="width: 100%; border-collapse: collapse; margin-top: 10px;">';
        html += '<tr style="background-color: #f0f0f0;"><th style="border: 1px solid #ccc; padding: 8px;">Operação</th><th style="border: 1px solid #ccc; padding: 8px;">Resultado</th></tr>';

        let pares = [];

        for (let i = 1; i <= limite; i++) {
            const resultado = base * i;
            const ehPar = resultado % 2 === 0;

            html += `<tr style="background-color: ${i % 2 === 0 ? '#fafafa' : 'white'};">`;
            html += `<td style="border: 1px solid #ccc; padding: 8px; text-align: center;"><strong>${base} × ${i}</strong></td>`;
            html += `<td style="border: 1px solid #ccc; padding: 8px; text-align: center;">${resultado}</td>`;
            html += '</tr>';

            // Armazenar pares
            if (ehPar) {
                pares.push({ operacao: `${base} × ${i}`, resultado: resultado });
            }
        }
        html += '</table>';
        saidaTabuada.innerHTML = html;

        // Mostrar resumo dos pares
        mostrarResumoPares(pares);
    }

    function mostrarResumoPares(pares) {
        if (pares.length === 0) {
            resumoPares.innerHTML = '<p>Nenhum resultado par encontrado.</p>';
            return;
        }

        let resumoHtml = '<h4>Resultados Pares:</h4>';
        resumoHtml += '<ul>';

        pares.forEach(par => {
            resumoHtml += `<li>${par.operacao} = <strong>${par.resultado}</strong></li>`;
        });

        resumoHtml += '</ul>';
        resumoHtml += `<p><strong>Total de pares: ${pares.length}</strong></p>`;

        resumoPares.innerHTML = resumoHtml;
    }
});