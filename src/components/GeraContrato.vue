<template>
    <div v-if="bid_id && contract && !loading">
        <div class="container py-5">
            <h1 class="mb-5">CONTRATO DE PRESTAÇÃO DE SERVIÇO</h1>
            <p><b>DEFINIÇÃO:</b> Esse contrato visa documentar a proposta de prestação de serviços, apresentada pela CONTRATADA e aceita previamente pela CONTRATANTE, contendo todas as informações acerca da metodologia de trabalho, do cronograma de atividades, dos recursos necessários para a execução do serviço, bem como as descrições das condições de pagamento e prazos previamente definidos.</p>
            <p><b>CONTRATADA:</b> EDUARDO VIEIRA LEMES (ALPIX), com sede na AV PAULISTA, 171 - ANDAR 4 - CEP 01311904 - Brasil, inscrito no CNPJ/MF sob o n. 35.810.898/0001-48, neste ato representado por seu representante legal EDUARDO VIEIRA LEMES, brasileiro, CPF Nº 416.816.188-93.</p>
            <p><b>CONTRATANTE: </b><i>{{ contract.company_name || '_RAZAO_SOCIAL_' }}</i> com sede na <i>{{ contract.company_address || '_ENDERECO_' }}</i>, inscrito no CNPJ/MF sob o nº <i>{{ contract.doc_cnpj  || '_DOC_' }}</i>, neste ato representado por seu representante legal <i>{{ contract.person_name  || '_DOC_' }}</i>, <i>BRASILEIRO(A)</i>, CPF Nº <i>{{ contract.doc_cpf  || '_PERSON_DOC_' }}</i>.</p>
            <br>
            <p>Cláusula 1ª. O presente contrato tem como objeto o desenvolvimento das seguintes atividades:</p>
            <p v-for="(servico, index) in bid.services" :key="index" class="item_contrato">                    
                <b>{{ servico.service.data && servico.service.data.attributes.title }}:</b>
                <div v-html="markdownToHtml(servico.override_description || (servico.service.data && servico.service.data.attributes.description))"></div>                    
            </p>
            
            <h2>DA EXECUÇÃO</h2>
            <p>Cláusula 2ª. Nos serviços estabelecidos neste contrato, o CONTRATADO somente fornecerá a mão-de-obra necessária, responsabilizando-se o CONTRATANTE pelo fornecimento de todos os materiais e informações para a confecção das atividades mencionadas na Cláusula 1ª, de acordo com a solicitação do CONTRATADO.</p>
            <p>Parágrafo único. Podemos considerar os materiais a serem fornecidos: imagens, textos, acessos à paineis administrativos de ferramentas, entre outros.</p>
            <p>Cláusula 3ª. As atividades desenvolvidas serão realizadas única e exclusivamente pelo CONTRATADO, facultando-lhe a responsabilidade de contratação de ajudantes, os quais terão vínculo único e direto com o mesmo, que ficará exclusivamente responsável pelo pagamento e todos os encargos existentes.</p>
            <p>Cláusula 4ª. Quaisquer danos causados a terceiros e provenientes da execução do trabalho, agindo dolosa ou culposamente, serão de inteira responsabilidade do CONTRATADO, mesmo que praticados pelos seus ajudantes.</p>
            <p>Cláusula 5ª. O CONTRATADO terá completa e irrestrita liberdade para executar seu trabalho, não necessitando de predeterminar horários ou funções, ficando assim caracterizado que o mesmo exerce de maneira autônoma seus serviços, não mantendo nenhum vínculo trabalhista com o CONTRATANTE.</p>

            <h2>DO PAGAMENTO</h2>
            <p>Cláusula 6ª. Pelos serviços prestados, o CONTRATANTE pagará ao CONTRATADO a quantia de {{ bid_total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) }}. O não pagamento poderá acarretar a inclusão do CONTRATANTE nos Serviços de Proteção ao Crédito, de acordo com as regras do Código de Defesa do Consumidor.</p>
            <p>Parágrafo único. A forma de pagamento e eventuais descontos podem ser tratados posteriormente entre o CONTRATADO e a CONTRATADA via e-mail e aplicativos de mensagem, podendo ser anexados a este contrato futuramente desde que consentido entre as partes.</p>

            <h2>DO PRAZO</h2>
            <p>Cláusula 7ª. O CONTRATADO se compromete a executar os serviços até a data de {{ bid_delivery_date_formated }}, mas poderá ser extendido de acordo com a troca de informações entre as partes ou devido ao surgimento de novas solicitação de alterações e/ou inclusões de serviços neste mesmo projeto.</p>
            <p>Parágrafo único. Caso existam observações quanto ao prazo de entrega de atividades específicas Cláusula 1ª as mesmas devem ser acatadas.</p>

            <h2>DO FORO</h2>
            <p>Cláusula 8ª. Para dirimir quaisquer controvérsias oriundas deste contrato, as partes elegem o foro da comarca de São Paulo.</p>
        </div>

    </div>
    <div class="loading" v-else>
        Carregando...
    </div>

    
</template>

<style>
    @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css');
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700&display=swap');
    
    h1{font-weight: bold!important;}
    h2{margin:3rem 0 1.5rem 0!important;
        font-size: 18px!important;
        font-weight: bold!important;
    }
    .item_contrato{border: 1px solid #ccc!important;padding: 10px;}    

    
</style>
<script>
  import axios from 'axios'
  import marked from 'marked'
  
  
  export default {
    name: 'GeraContrato',
    data() {
      return {
        parametro: false,
        contract: false,
        bid: [],
        bid_id : false,
        bid_total : 0,
        bid_installments: 0,
        bid_atsight:0,
        bid_delivery_date: new Date(),
        bid_workingDays:0,
        bid_workingDaysSum:0,
        bid_delivery_date_formated : '',
        loading:false,
        paymentViable:false,
        qrCodePix : false,
        qrCodePixImage:false,
        pagarmePaymentLink : false,
      };
    },
    methods:{
        
        markdownToHtml(description) {            
            return marked(description)
        },
        async calcTotals(){
            
            this.bid_total = 0
            this.bid_atsight = (100 - this.bid.discount_at_sight) / 100

            for(let i in this.bid.services){
                this.bid_total = this.bid_total + (this.bid.services[i].price ? this.bid.services[i].price : this.bid.services[i].service.data.attributes.price)
                this.bid_workingDays = this.bid_workingDays + this.bid.services[i].days
            }


            
            while (this.bid_workingDaysSum < this.bid_workingDays) {
                this.bid_delivery_date.setDate(this.bid_delivery_date.getDate() + 1); // avançar um dia

                // Verificar se o dia é um dia útil
                const diaDaSemana = this.bid_delivery_date.getDay();
                if (diaDaSemana !== 0 && diaDaSemana !== 6) { // 0 é domingo e 6 é sábado
                    this.bid_workingDaysSum ++; // incrementar o contador de dias úteis
                }
            }

            if(this.bid.delivery_date){
                this.bid_delivery_date = new Date(this.bid.delivery_date)
                this.bid_delivery_date.setDate(this.bid_delivery_date.getDate() + 1)
            }

            const dia = this.bid_delivery_date.getDate().toString().padStart(2, '0')
            const mes = (this.bid_delivery_date.getMonth() + 1).toString().padStart(2, '0')
            const ano = this.bid_delivery_date.getFullYear()
            this.bid_delivery_date_formated  = `${dia}/${mes}/${ano}`
            
        },
        
        async getBid(){
            this.parametro = this.$route.params.id || this.$route.path.replace('/','')
            console.log(this.$route)
            console.log(this.parametro)
            if(this.parametro){
                await axios.get(`https://strapi-production-f692.up.railway.app/api/bids?filters[key][$eq]=${this.parametro}&populate=deep`)
                .then(response => {
                this.bid = response.data.data[0].attributes;
                this.bid_id = response.data.data[0].id;
                this.paymentViable = this.bid.accepted 
                this.pagarmePaymentLink = this.bid.payment_link 
                //console.log(this.bid)
                })
                .catch(error => {
                console.error(error);
                });

                this.calcTotals()

                await axios.get(`https://strapi-production-f692.up.railway.app/api/contracts?filters[bid][id][$eq]=${this.bid_id}`)
                .then(response => {
                this.contract = response.data.data[0].attributes;
                })
                .catch(error => {
                console.error(error);
                });
            }

            console.log(this.bid)
            console.log(this.contract)
        }
    },
    mounted(){
        this.getBid()
    },
    created() {
        
        
    },
  };
  </script>

  