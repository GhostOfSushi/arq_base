// Referências aos elementos do HTML
const visorSenha = document.getElementById("visorSenha");
const compSenha = document.getElementById("compSenha");
const chkMaiusculas = document.getElementById("chkMaiusculas");
const chkNumeros = document.getElementById("chkNumeros");
const chkSimbolos = document.getElementById("chkSimbolos");
const btnGerar = document.getElementById("btnGerar");
const indicadorForca = document.getElementById("indicadorForca");

// Conjuntos de caracteres
const MINUSCULAS = "abcdefghijklmnopqrstuvwxyz";
const MAIUSCULAS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const NUMEROS = "0123456789";
const SIMBOLOS = "!@#$%^&*()-_=+[]{};:,.<>?";

// Devolve um número aleatório seguro entre 0 e max - 1
function aleatorioSeguro(max) {
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    return array[0] % max;
}

// Gera a senha com base nas opções escolhidas
function gerarSenha() {
    let tamanho = parseInt(compSenha.value, 10);

    // Valida o tamanho (entre 6 e 24)
    if (isNaN(tamanho) || tamanho < 6) tamanho = 6;
    if (tamanho > 24) tamanho = 24;
    compSenha.value = tamanho;

    // Monta o conjunto de caracteres e garante pelo menos um de cada tipo escolhido
    let caracteres = MINUSCULAS;
    const obrigatorios = [MINUSCULAS[aleatorioSeguro(MINUSCULAS.length)]];

    if (chkMaiusculas.checked) {
        caracteres += MAIUSCULAS;
        obrigatorios.push(MAIUSCULAS[aleatorioSeguro(MAIUSCULAS.length)]);
    }
    if (chkNumeros.checked) {
        caracteres += NUMEROS;
        obrigatorios.push(NUMEROS[aleatorioSeguro(NUMEROS.length)]);
    }
    if (chkSimbolos.checked) {
        caracteres += SIMBOLOS;
        obrigatorios.push(SIMBOLOS[aleatorioSeguro(SIMBOLOS.length)]);
    }

    // Preenche o resto da senha com caracteres aleatórios
    const senha = [...obrigatorios];
    while (senha.length < tamanho) {
        senha.push(caracteres[aleatorioSeguro(caracteres.length)]);
    }

    // Embaralha (Fisher-Yates) para os obrigatórios não ficarem sempre no início
    for (let i = senha.length - 1; i > 0; i--) {
        const j = aleatorioSeguro(i + 1);
        [senha[i], senha[j]] = [senha[j], senha[i]];
    }

    return senha.join("");
}

// Avalia a força da senha
function avaliarForca(senha) {
    let pontos = 0;

    if (senha.length >= 8) pontos++;
    if (senha.length >= 12) pontos++;
    if (/[A-Z]/.test(senha) && /[a-z]/.test(senha)) pontos++;
    if (/[0-9]/.test(senha)) pontos++;
    if (/[^A-Za-z0-9]/.test(senha)) pontos++;

    if (pontos <= 2) return { texto: "Fraca", cor: "#e74c3c" };
    if (pontos <= 3) return { texto: "Média", cor: "#f39c12" };
    if (pontos === 4) return { texto: "Forte", cor: "#27ae60" };
    return { texto: "Muito Forte", cor: "#16a085" };
}

// Mostra a força no ecrã
function mostrarForca(senha) {
    const forca = avaliarForca(senha);
    indicadorForca.textContent = "Força: " + forca.texto;
    indicadorForca.style.color = forca.cor;
    indicadorForca.style.fontWeight = "bold";
}

// Evento do botão
btnGerar.addEventListener("click", function () {
    const senha = gerarSenha();
    visorSenha.textContent = senha;
    mostrarForca(senha);
});

// Copiar a senha ao clicar no visor
visorSenha.addEventListener("click", function () {
    const texto = visorSenha.textContent;
    if (texto === "Clique em Gerar") return;

    navigator.clipboard.writeText(texto).then(function () {
        visorSenha.textContent = "Copiado!";
        setTimeout(function () {
            visorSenha.textContent = texto;
        }, 1000);
    });
});