const vm = new Vue({
  el: "#app",
  data: {
    produtos: [],
    produto: false,
    carrinho: [],
    carrinhoAtivo: false,
  },

  methods: {
    fetchProdutos() {
      // função para buscar os produtos
      fetch("./api/produtos.json")
        .then((r) => r.json())
        .then((r) => {
          this.produtos = r;
        });
    },

    fetchProduto(id) {
      //chama o produto pelo id
      fetch(`./api/produtos/${id}/dados.json`)
        .then((r) => r.json())
        .then((r) => {
          this.produto = r;
        });
    },

    fecharModal({ target, currentTarget }) {
      //target é o elemento que foi clicado, currentTarget é o elemento que está sendo clicado
      if (target === currentTarget) this.produto = false;
    },

    clickForaCarrinho({ target, currentTarget }) {
      //target é o elemento que foi clicado, currentTarget é o elemento que está sendo clicado
      if (target === currentTarget) this.carrinhoAtivo = false;
    },

    abrirModal(id) {
      // abrir modal
      this.fetchProduto(id);
    },

    adicionarItem() {
      // adicionar item ao carrinho
      this.produto.estoque--;
      const { id, nome, preco } = this.produto;
      this.carrinho.push({ id, nome, preco });
    },

    removerItem(index) {
      //remove o item do carrinho
      this.carrinho.splice(index, 1);
    },

    checarLocalStorage() {
      // checa se o localStorage está vazio ou não e se não estiver, recupera os dados do localStorage
      if (window.localStorage.carrinho)
        this.carrinho = JSON.parse(window.localStorage.carrinho);
    },

    router() {
      const hash = document.location.hash;
      if (hash) {
        const id = hash.replace("#", "");
        this.fetchProduto(id);
      }
    },
  },

  watch: {
    carrinho() {
      //salva os dados do carrinho no localStorage
      window.localStorage.carrinho = JSON.stringify(this.carrinho);
    },

    produto() {
      // quando o produto é alterado muda o hash do url
      document.title = this.produto.nome || "Techno";
      const hash = this.produto.id || "";
      history.pushState(null, null, `#${hash}`);
    },
  },

  computed: {
    carrinhoTotal() {
      // calcula o total do carrinho

      let total = 0;
      if (this.carrinho.length) {
        this.carrinho.forEach((item) => {
          total += item.preco;
        });
      }

      return total;
    },
  },

  filters: {
    // filtro para formatar o preço
    formatarPreco(preco) {
      // formata o preço
      return preco.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
      });
    },
  },

  created() {
    // chama as funções que buscam os produtos e checa o localStorage
    this.fetchProdutos();
    this.checarLocalStorage();
    this.router();
  },
});
