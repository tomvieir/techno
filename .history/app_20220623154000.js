const vm = new Vue({
  el: "#app",
  data: {
    produtos: []
  },
  methods: {
    fetchProdutos() {
      fetch("./api/produtos.json")
        .then(r => r.json())
        .then(r => {
          this.produtos = r;
        })

        
    }
  },
  
  filters: {
    formatarPreco(preco) {
      return preco.toLocaleString("pt-BR", {
        style: "currency",
        
    }
  },
  
  created() {    
    this.fetchProdutos();
  }
})