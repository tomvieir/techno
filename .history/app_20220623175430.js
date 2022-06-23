const vm = new Vue({
  el: "#app",
  data: {
    produtos: [],
    produto: false,
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

    fecharModal(event) {
      this.produto = false;
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