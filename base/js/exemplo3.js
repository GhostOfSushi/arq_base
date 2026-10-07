// Referências aos elementos
const textoPost = document.getElementById("textoPost");
const barraProgresso = document.getElementById("barraProgresso");
const infoCarateres = document.getElementById("infoCarateres");
const infoPalavras = document.getElementById("infoPalavras");
const btnPublicar = document.getElementById("btnPublicar");
const feedPreview = document.getElementById("feedPreview");

const LIMITE = 140;

// Atualiza contador, barra, palavras e estado do botão
function atualizarInterface() {
    const texto = textoPost.value;
    const numCarateres = texto.length;
    const textoLimpo = texto.trim();
    const numPalavras = textoLimpo === "" ? 0 : textoLimpo.split(/\s+/).length;

    // Contadores
    infoCarateres.textContent = `${numCarateres} / ${LIMITE} carateres`;
    infoPalavras.textContent = `${numPalavras} ${numPalavras === 1 ? "palavra" : "palavras"}`;

    // Barra de progresso
    const percentagem = Math.min((numCarateres / LIMITE) * 100, 100);
    barraProgresso.style.width = percentagem + "%";

    // Cor da barra conforme o preenchimento
    if (percentagem < 70) {
        barraProgresso.style.backgroundColor = "#4caf50"; // verde
    } else if (percentagem < 90) {
        barraProgresso.style.backgroundColor = "#ff9800"; // laranja
    } else {
        barraProgresso.style.backgroundColor = "#f44336"; // vermelho
    }

    // Cor do contador quando atinge o limite
    infoCarateres.style.color = numCarateres >= LIMITE ? "#f44336" : "";

    // Botão só ativo se houver texto
    btnPublicar.disabled = textoLimpo === "";
}

// Publica a mensagem no feed
function publicar() {
    const texto = textoPost.value.trim();
    if (texto === "") return;

    const post = document.createElement("div");
    post.className = "post";

    const conteudo = document.createElement("p");
    conteudo.textContent = texto; // textContent evita injeção de HTML

    const data = document.createElement("small");
    data.textContent = "Publicado em " + new Date().toLocaleString("pt-PT");

    post.appendChild(conteudo);
    post.appendChild(data);

    // Mensagem mais recente no topo
    feedPreview.prepend(post);

    // Limpar o formulário
    textoPost.value = "";
    atualizarInterface();
    textoPost.focus();
}

// Eventos
textoPost.addEventListener("input", atualizarInterface);
btnPublicar.addEventListener("click", publicar);

// Estado inicial
textoPost.maxLength = LIMITE;
atualizarInterface();