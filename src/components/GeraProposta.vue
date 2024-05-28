<template>
    <div v-if="chave">{{ chave }}</div>
    <div class="main p-3" v-if="proposta && proposta.client">
        <div class="head border-radius-1 py-5 mb-5">
            <div class="container my-5">
                <div class="row align-items-center mb-5 pb-5">
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
                <h1 class="font-bold mb-5">Proposta</h1>
                <div class="row persons">
                    <div class="col-auto mr-5 pr-5">
                        <b>RESPONSÁVEL</b>
                        <span>Eduardo Vieira Lemes<br><small>eduardo@alpix.dev</small></span>
                    </div>
                    <div class="col-auto">
                        <b>CLIENTE</b>
                        <span>{{ proposta.client.data.attributes.company }}<br><span>{{ proposta.client.data.attributes.name }}</span><small>{{ proposta.client.data.attributes.email }}</small></span>
                    </div>
                </div>
                <hr style="border-color:#fff; margin:6rem 0;">
                <div class="row project">
                    <div class="col-md-3">
                        <h2>O projeto</h2>
                    </div>
                    <div class="col-md-8 offset-md-1">
                        <p class="about" v-html="markdownToHtml(proposta.about)"></p>
                    </div>
                </div>
            </div>            
        </div>
        <div class="container mt-5 pt-5">
            <div class="row pb-5 mb-5">
                <div class="col-md-3">
                    <h2>Valores</h2>
                </div>
                <div class="col-md-8 offset-md-1">
                    <div class="box border-radius-1 p-4">
                        <div class="row heading mb-4">
                            <div class="col"><b>ITEM</b></div>
                            <div class="col-auto"><b>PREÇO</b></div>
                        </div>
                        
                        <div v-for="(service, index) in proposta.services" :key="index" class="item">
                            <div class="row align-items-start justify-content-between">
                                <div class="col">
                                    <b class=" mb-2 d-block">{{service.service.data.attributes.title}}</b>
                                    <p v-html="markdownToHtml(service.override_description || (service.service.data && service.service.data.attributes.description))"></p>                            
                                </div>
                                <div class="col-auto">{{ (service.price || service.service.data.attributes.price).toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) }}</div>
                            </div>                            
                        </div>
                        <div v-if="bid_total > 0" class="item">
                            <div class="row align-items-start justify-content-between" style="font-size:14px">
                                <div class="col">
                                    <b class=" mb-2 d-block">Total</b>
                                </div>
                                <div class="col-auto"><span class=" mb-2 d-block text-right"><b>{{ (bid_total).toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) }} </b><br><small>em até <b>12x</b> de <b>{{ (bid_total /12).toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) }}</b> sem juros</small></span></div>
                            </div>  
                            <div class="row align-items-start justify-content-between" style="font-size:18px;">
                                <div class="col">
                                    <b class=" mb-2 d-block">Pagamento à vista (-6%)</b>
                                </div>
                                <div class="col-auto"><b class=" mb-2 d-block">{{ (bid_total * 0.94).toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) }}</b></div>
                            </div>                          
                        </div>
                        
                        
                    </div>
                </div>
            </div>
            <div class="row pb-5 mb-5">
                <div class="col-md-3">
                    <h2>Cronograma</h2>
                </div>
                <div class="col-md-8 offset-md-1">
                    <p>O prazo estimado para a conclusão do projeto completo é de <b>{{ bid_semanas }} semanas.*</b></p>
                    <div class="list">
                        <div v-for="(item, index_) in proposta.timeline" :key="index_" class="item px-4 my-5">
                            <b class=" mb-2 d-block">{{ item.title }} - {{ item.weeks }} semanas</b>
                            <p>{{ item.description }}</p>                            
                        </div>
                        
                    </div>
                </div>
            </div>
            <div class="row pb-5 mb-5">
                <div class="col-md-3">
                    <h2>Extras</h2>
                </div>
                <div class="col-md-8 offset-md-1">
                    <p>Podemos fornecer quaisquer serviços adicionais fora do escopo. Estes podem ser quaisquer designs adicionais, mudanças no website, treinamento adicional, sessões de brainstorming, etc.<br>
                        Tudo deve ser previamente discutido antes de qualquer valor a ser enviado.</p>
                </div>
            </div>
            <div class="row pb-5 mb-5">
                <div class="col-md-3">
                    <h2>Pagamento e termos legais</h2>
                </div>
                <div class="col-md-8 offset-md-1 termos">
                    <p><b>1. Estrutura de pagamento</b><span class="mt-2 d-block" v-html="markdownToHtml(proposta.payment_terms)"></span>                      
                        <div class="row  align-items-center justify-content-center">
                            <div class="col-auto">
                                <img v-if="bid.payment_base64" :src="bid.payment_base64" style="height:150px"/>
                            </div>
                            <div class="col pagamento" >
                                <b>Banco: </b>077 - Inter<br>
                                <b>Agência: </b>0001<br>
                                <b>Conta: </b>47532386<br>
                                <b>CNPJ/PIX: </b>35.810.898/0001-48<br>
                                <b>Favorecido: </b>Eduardo Vieira Lemes                                
                            </div>
                            
                        </div>
                        
                    </p>
                    <p><b>2. Materiais adicionais</b> tais como fontes pagas, fotos ou ferramentas de terceiros, não estão incluídos no preço. Se tais despesas surgirem, serão discutidas com o contratante antes de fazer qualquer compra.</p>
                    <p><b>3. Prazos.</b> O prazo total para todo o projeto é previsto para até {{ bid_semanas }}  semanas. Quando solicitado aprovação visual de páginas ou qualquer elemento do projeto, o prazo fica pausado não contando assim o tempo de espera no prazo total até o retorno do contratante com aprovação ou solicitação de ajustes;</p>
                    <p><b>4. Cancelamento:</b> Caso o contratante cancele o projeto após o seu início, o pagamento a ser efetuado deverá ser coorespondente ao tempo utilizado pela contratada mesmo que não tenha a intenção de utilizar o trabalho produzido. Caso o contratado cancele o projeto após seu início, o contratante pagará apenas pelo trabalho produzido que pretende utilizar.</p>
                    <p><b>5. O contratante é dono de todo o trabalho produzido. </b>A criação feita pela contratada e todos os direitos de propriedade intelectual associados a ela são repassados ao contratante depois que a contratada tiver sido paga integralmente pelos serviços prestados.</p>
                    <p><b>6. Solicitações de ajustes: </b>Até o fim do projeto, o contratante poderá solicitar no máximo 3 conjuntos de alterações no site, devendo cada alteração ser enviada por e-mail com todos os ajustes necessários.<br><br>Mudanças de estrutura, alteração de layouts, novas funcionalidades e outros que se constituem como manutenção evolutiva pós aprovações ou pós publicação, são feitas à parte via orçamento previamente aprovado com o contratante ou em contrato mensal de manutenção (opcional).</p>
                    <p><b>7. Garantia e suporte.</b> Durante o período de 60 dias corridos após a entrega do projeto, estão cobertas na garantia ajustes de BUGS ou correções de erros necessárias.<br><br>

Manutenções evolutivas não estão contempladas neste período.<br><br>

O suporte ao uso do sistema é gratuito por 30 dias a contar da entrega do projeto, e será realizado exclusivamente através de contato digital, em horário pré-estabelecido (10h às 12h e das 14h às 17h). Após este período, o suporte será cobrado na modalidade de pagamento por hora técnica.</p>
                    <p><b></b></p>
                    <p><b></b></p>
                    <p><b></b></p>
                    <p><b></b></p>
                    
                </div>
            </div>
        </div>
    </div>
    <div v-else class="p-5">
        {{ aviso }}
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
    .about p,
    .head p{color:#fff!important}
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
    .project p{font-size: 14px; line-height: 24px;    color: #fff!important;}

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
    .container{width: 990px;}

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
</style>

<script>
  import axios from 'axios'
  import { QrCodePix } from 'qrcode-pix'
  import marked from 'marked'
  import CryptoJS from 'crypto-js';
  import md5 from 'md5';
  
  export default {
    name: 'GeraProposta',
    data() {
      return {
        proposta: {},
        parametro: false,
        bid: [],
        bid_id : false,
        bid_total : 0,
        bid_semanas : 0,
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
        chave: '',
        aviso:'Carregando proposta...'
      };
    },
    methods:{
       
        markdownToHtml(description) {            
            return marked(description)
        },
        async calcTotals(){
            
            this.bid_total = 0
            //this.bid_atsight = (100 - this.bid.discount_at_sight) / 100

            for(let i in this.proposta.services){
                this.bid_total = this.bid_total + (this.proposta.services[i].price ? this.proposta.services[i].price : this.proposta.services[i].service.data.attributes.price)
                this.bid_workingDays = this.bid_workingDays + this.proposta.services[i].days
            }
            for(let i in this.proposta.timeline){
                this.bid_semanas = this.bid_semanas + this.proposta.timeline[i].weeks
                
            }

            
            // while (this.bid_workingDaysSum < this.bid_workingDays) {
            //     this.bid_delivery_date.setDate(this.bid_delivery_date.getDate() + 1); // avançar um dia

            //     // Verificar se o dia é um dia útil
            //     const diaDaSemana = this.bid_delivery_date.getDay();
            //     if (diaDaSemana !== 0 && diaDaSemana !== 6) { // 0 é domingo e 6 é sábado
            //         this.bid_workingDaysSum ++; // incrementar o contador de dias úteis
            //     }
            // }

            // if(this.bid.delivery_date){
            //     this.bid_delivery_date = new Date(this.bid.delivery_date)
            //     this.bid_delivery_date.setDate(this.bid_delivery_date.getDate() + 1)
            // }

            // const dia = this.bid_delivery_date.getDate().toString().padStart(2, '0')
            // const mes = (this.bid_delivery_date.getMonth() + 1).toString().padStart(2, '0')
            // const ano = this.bid_delivery_date.getFullYear()
            // this.bid_delivery_date_formated  = `${dia}/${mes}/${ano}`

            

            
            //if(!this.bid.payment_base64){
                this.qrCodePix = await QrCodePix({
                    version: '01',
                    key: '35810898000148', //or any PIX key
                    name: 'Eduardo Vieira Lemes',
                    city: 'SAO PAULO',
                    transactionId: `Proposta Núm. ${this.bid_id + 150}`, //max 25 characters
                    message: '',
                    cep: '01311904',
                    value: (this.bid_total * 0.92),
                });

            //console.log(qrCodePix.base64); // '00020101021126510014BR.GOV.BCB.PIX...'
            //this.qrCodePix = 
            
                this.qrCodePixImage = await this.qrCodePix.base64()
                this.bid.payment_base64 = this.qrCodePixImage
            //}

            
        },
        
        async getBid(){
            this.parametro = this.$route.params.id || this.$route.path.replace('/','')
            let key = this.$route.query.key;
            if(this.$route.query.key == 'main'){
                this.chave = md5(this.parametro);
            }else{
                this.chave = false;
            }
            
            
            if(md5(this.parametro).toString() == key || this.chave){
                await axios.get(`https://strapi-production-f692.up.railway.app/api/proposals/?filters[id][$eq]=${this.parametro - 150}&populate=deep`)
                //await axios.get(`http://localhost:1337/api/proposals/?filters[id][$eq]=${this.parametro - 150}&populate=deep`)
                .then(response => {   
                    
                    this.proposta = response.data.data[0].attributes
                    this.bid_id = this.parametro - 150
                    console.log(this.proposta)                 
                })
                .catch(error => {
                console.error(error);
                });

                this.calcTotals()
            }else{
                this.aviso = 'Chave inválida. Informe a chave correta para visualizar a proposta'
            }
        }
    },
    mounted(){
        this.getBid()
    },
    created() {
        
        
    },
  };
  </script>

  