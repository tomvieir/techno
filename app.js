const vm = new Vue({
  el: "#app",
  data: {
    produtos: [],
    produto: false,
    carrinho: [],
    carrinhoTotal: 0
  },
  methods: {
    fetchProdutos() {
      fetch("./api/produtos.json")
        .then(r => r.json())
        .then(r => {
          this.produtos = r;
        })  
    },

    fetchProduto(id) {
      fetch(`./api/produtos/${id}/dados.json`)
        .then(r => r.json())
        .then(r => {
          this.produto = r;
        })  
    },

    fecharModal({target, currentTarget}) {
      if (target === currentTarget) 
        this.produto = false;
    },

    abrirModal(id) {
      this.fetchProduto(id);
    },

    adicionarItem() {
      this.produto.estoque--;
      const {id, nome, preco} = this.produto;
      this.carrinho.push({id, nome, preco});
    }, 

    removerItem(index) {
      this.carrinho.splice(index, 1);
    }

  },
  
  filters: {
    formatarPreco(preco) {
      return preco.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2
      });
    }
  },
  
  created() {    
    this.fetchProdutos();
  }
})