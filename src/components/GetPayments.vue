<template>
    
    <div class="main p-3">
        <div class="head border-radius-1 py-2 mb-5">
            <div class="container-fluid my-5">
                <div class="row align-items-center">
                    <div class="col ">
                        <img src="https://www.alpix.dev/assets/logo_w.svg" alt="Logo da Alpix">
                    </div>
                    <div class="col text-center">
                    
                    </div>
                    <div class="col text-right">
                        <p class="mb-2"><b>ALPIX</b></p>
                        <p>CNPJ: 35.810.898/0001-48</p>
                        <p>ENDEREÇO: AV. PAULISTA, 171, ANDAR 4<br>SÃO PAULO/SP - CEP: 01311-904</p>
                    </div>
                </div>
            </div>        
        </div>
    </div>
    <div>
      <div class="container-fluid">
        <h3 class="mb-5 font-weight-bold" style="color:#000">Seus Pagamentos</h3>
        <div class="row mb-4 justify-content-between">
          <div class="col-5">
            <!-- Caixa para a soma dos valores pagos -->
            <div class="row">
              <div class="col-auto">
                <div class="card p-4">
                  <small>Pendente</small> 
                  <b class="h3">{{ sumPending }}</b>
                </div>
                
              </div>
              <div class="col-auto">
                <div class="card p-4">
                  <small>Pago</small> 
                  <b class="h3 font-weight-bold" style="color:green">{{ sumPaid }}</b>
                </div>    
              </div>
            </div>
            
            
          </div>
          <div class="col-4">
            <div class="row">
              <div class="col-md-6">
                <!-- Seletor de mês -->
                <label for="month">Mês:</label>
                <select id="month" class="form-control" v-model="selectedMonth" @change="filterData">
                  <option v-for="(month, index) in months" :value="index + 1">{{ month }}</option>
                </select>
              </div>
              <div class="col-md-6">
                <!-- Seletor de ano -->
                <label for="year">Ano:</label>
                <select id="year" class="form-control" v-model="selectedYear" @change="filterData">
                  <option v-for="year in availableYears" :value="year">{{ year }}</option>
                </select>
                
              </div>
            </div>
          </div>
          
        </div>
        <!-- Lista de lançamentos -->
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Descrição</th>
              <th scope="col">Parcela</th>
              <th scope="col">Cliente</th>
              <th scope="col">Valor</th>
              
            </tr>
          </thead>
          <tbody>
            <tr v-for="launch in filteredLaunches" :key="launch.row_number" :class="launch['Pago'] != 'FALSO' ? 'table-success' : ''">
              <td>
                {{ launch['Descrição'] }}
              </td>
              <td>
                {{ launch['Parcelamento'] }}
              </td>
              <td>
                {{ launch['Cliente'] }}
              </td>
              <td>
                {{ launch['Valor'].toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}) }}
              </td>              
            </tr>  
            <tr v-if="filteredLaunches.length == 0">
              <td colspan="4" class="text-center" style="font-weight:normal"><div class="py-3">Nenhum pagamento localizado para o período selecionado.</div></td>
            </tr>         
          </tbody>
        </table>
       
      </div>
    </div>
</template>
    
<style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
    @import url('https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css');
    body{font-family: 'Poppins', sans-serif!important;font-size:14px}
    .head{
        background: #000;
        color: #fff;
    }
    .head img{height: 60px;}
    .head p{font-size: 12px;margin: 0;}
    h1{font-weight: bold!important;font-size: 3rem;}
    h2{font-weight: 600!important;}
    .border-radius-1{border-radius: .5rem;}
    .persons{}
    .about p{margin-bottom: 1.5rem;}
    .persons b{
        display: block;
        font-size: 12px;
        letter-spacing: 3px;
        font-weight: 600;
        margin-bottom: 1rem;
    }
    .persons > div > span{
        font-weight: 600;
    }
    .persons > div > span > span{display: block;font-size: 14px;font-weight: 400;}
    .persons > div > span > small{
        
    }
    .project{}
    .project p{font-size: 14px; line-height: 24px;}

    .box{
        border: 1px solid #ccc;
    }
    .box .item:not(:last-child){
        border-bottom: 1px solid #f2f2f2;
        padding-bottom: 1rem;
        margin-bottom: 2rem;
    }
    .box p{
        color:#908D92;
        font-size: 14px;
    }
    .box .heading b{
        letter-spacing: 2px;
        color:#908D92;
    }
    .list{}
    .list .item p{font-size: 14px;}
    .list .item{
        border-left: 4px solid #B932C8;
    }
    

    .pagamento{font-size: 12px;}
    .pagamento p{
        font-size: 12px;
        margin: 0;
    }
    .termos{}
    .termos > p{
        margin: 0 0 3rem 0;
        font-size: 14px;
    }
    .table-success, .table-success>td, .table-success>th {
      background-color: #c3e6cb !important;
  }
  
</style>

<script>
  import axios from 'axios';

export default {
  data() {
    return {
      launches: [], // Armazenar os lançamentos recebidos do webhook
      filteredLaunches: [], // Lançamentos filtrados por ano e mês
      selectedYear: new Date().getFullYear(),
      selectedMonth: new Date().getMonth() + 1,
      years: [], // Array de anos para o dropdown
      months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    };
  },
  computed: {
    sumPaid() {
      // Calcular a soma dos valores pagos
      return this.filteredLaunches.reduce((total, launch) => {
        if (launch['Pago'] != "FALSO") {
          return total + parseFloat(launch['Valor']);
        }
        return total;
      }, 0).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
    },
    sumPending() {
      // Calcular a soma dos valores pendentes
      return this.filteredLaunches.reduce((total, launch) => {
        if (launch['Pago'] == "FALSO") {
          return total + parseFloat(launch['Valor']);
        }
        return total;
      }, 0).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
    },
    availableYears() {
      // Retornar uma lista de anos disponíveis com base nos lançamentos
      const years = new Set();
      this.launches.forEach(launch => {
        const launchDate = new Date(launch['Data de Pagamento']);
        years.add(launchDate.getFullYear());
      });
      return Array.from(years);
    }
  },
  methods: {
    async fetchData() {
      // Chame o webhook e armazene os dados
      try {
        const response = await axios.get(`https://primary-production-0790.up.railway.app/webhook/get_payments_?id=${this.$route.params.user}`);
        this.launches = response.data.data; // Supondo que o webhook retorna um array de lançamentos
        this.filteredLaunches = this.launches;
        this.generateYears();
        this.filterData();
      } catch (error) {
        console.error('Erro ao buscar os lançamentos:', error);
      }
    },
    filterData() {
      // Filtrar os lançamentos com base no ano e mês selecionados
      this.filteredLaunches = this.launches.filter(launch => {
        // Obter a data de pagamento do lançamento e dividir em dia, mês e ano
        const [day, month, year] = launch[`Data de Pagamento`].split('/');
        // Criar um objeto Date com a data de pagamento formatada corretamente (ano, mês, dia)
        const launchDate = new Date(`${year}-${month}-${day}`);
        
        // Comparar ano e mês da data de pagamento com o ano e mês selecionados
        return launchDate.getFullYear() === this.selectedYear && launchDate.getMonth() + 1 === this.selectedMonth;
      });
    },

    generateYears() {
      // Gerar os anos para o dropdown
      const currentYear = new Date().getFullYear();
      this.years = Array.from({ length: 5 }, (_, index) => currentYear - index);
    },
  },
  mounted() {
    this.fetchData(); // Chame a função fetchData quando o componente for montado
  },
};
</script>

  