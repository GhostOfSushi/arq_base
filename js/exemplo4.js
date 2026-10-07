// ===== Seleção dos elementos =====
const campoProduto = document.getElementById("campoProduto");
const btnAdicionar = document.getElementById("btnAdicionar");
const listaElementos = document.getElementById("listaElementos");
const resumoCarrinho = document.getElementById("resumoCarrinho");
const btnLimpar = document.getElementById("btnLimpar");

// ===== Estado da aplicação =====
// Cada item: { id, nome, comprado }
let itens = [];

// ===== Persistência (localStorage) =====
function salvar() {
    localStorage.setItem("listaMercado", JSON.stringify(itens));
}

function carregar() {
    const dados = localStorage.getItem("listaMercado");
    itens = dados ? JSON.parse(dados) : [];
}

// ===== Renderização =====
function renderizarLista() {
    listaElementos.innerHTML = "";

    itens.forEach((item) => {
        const li = document.createElement("li");
        if (item.comprado) li.classList.add("comprado");

        // Checkbox para marcar como comprado
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = item.comprado;
        checkbox.addEventListener("change", () => alternarComprado(item.id));

        // Nome do produto
        const span = document.createElement("span");
        span.textContent = item.nome;

        // Botão remover
        const btnRemover = document.createElement("button");
        btnRemover.textContent = "✖";
        btnRemover.classList.add("btn-remover");
        btnRemover.title = "Remover item";
        btnRemover.addEventListener("click", () => removerItem(item.id));

        li.append(checkbox, span, btnRemover);
        listaElementos.appendChild(li);
    });

    atualizarResumo();
}

function atualizarResumo() {
    const total = itens.length;
    const comprados = itens.filter((i) => i.comprado).length;
    const pendentes = total - comprados;

    if (total === 0) {
        resumoCarrinho.textContent = "Sua lista está vazia. Adicione um item!";
        return;
    }

    resumoCarrinho.textContent =
        `Total: ${total} | Comprados: ${comprados} | Pendentes: ${pendentes}`;
}

// ===== Ações =====
function adicionarItem() {
    const nome = campoProduto.value.trim();

    if (nome === "") {
        alert("Digite o nome de um produto!");
        campoProduto.focus();
        return;
    }

    // Evita duplicados (ignora maiúsculas/minúsculas)
    const jaExiste = itens.some(
        (i) => i.nome.toLowerCase() === nome.toLowerCase()
    );
    if (jaExiste) {
        alert("Esse produto já está na lista!");
        campoProduto.select();
        return;
    }

    itens.push({
        id: Date.now(),
        nome: nome,
        comprado: false,
    });

    campoProduto.value = "";
    campoProduto.focus();

    salvar();
    renderizarLista();
}

function alternarComprado(id) {
    const item = itens.find((i) => i.id === id);
    if (item) {
        item.comprado = !item.comprado;
        salvar();
        renderizarLista();
    }
}

function removerItem(id) {
    itens = itens.filter((i) => i.id !== id);
    salvar();
    renderizarLista();
}

function limparTudo() {
    if (itens.length === 0) return;

    if (confirm("Deseja realmente apagar toda a lista?")) {
        itens = [];
        salvar();
        renderizarLista();
    }
}

// ===== Eventos =====
btnAdicionar.addEventListener("click", adicionarItem);

campoProduto.addEventListener("keydown", (evento) => {
    if (evento.key === "Enter") adicionarItem();
});

btnLimpar.addEventListener("click", limparTudo);

// ===== Inicialização =====
carregar();
renderizarLista();