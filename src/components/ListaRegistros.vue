<template>
    <header class="cabecalho-geral">
        <div class="container">
            <img src="https://www.alpix.dev/wp-content/uploads/2022/04/logo_w.svg" alt="Logo da Empresa">
            <div>
                <p><i class="fa fa-map-marker" aria-hidden="true"></i>Av. Paulista, 171, Andar 4 - São Paulo - SP</p>
                <p><i class="fa fa-phone" aria-hidden="true"></i> +55 (11) 98929-7291</p>
                <p><i class="fa fa-envelope" aria-hidden="true"></i>eduardo@alpix.dev</p>
            </div>
        </div>
    </header>
    <div v-if="bid_id && !loading">
        <div class="container">
            <!-- Cabeçalho da Proposta -->
            <div class="cabecalho-proposta">
                <div>
                    <h2>Dados do <span class="text-styled">Contratante</span></h2>
                    <div v-if="bid.client && bid.client.data && bid.client.data.attributes">
                        <p v-if="bid.client.data.attributes.name"><strong>Cliente:</strong>{{ bid.client.data.attributes.name }}</p>
                        <p v-if="bid.client.data.attributes.company"><strong>Empresa:</strong>{{ bid.client.data.attributes.company }}</p>
                        <p v-if="bid.client.data.attributes.email"><strong>E-mail:</strong>{{ bid.client.data.attributes.email }}</p>
                        <p v-if="bid.client.data.attributes.phone"><strong>Telefone:</strong>{{ bid.client.data.attributes.phone }}</p>
                    </div>
                </div>
            </div>
            <div v-if="bid.scope">
                <div class="hr"></div>
                <section class="descricao-escopo">
                    <h2>Escopo do <span class="text-styled">Projeto</span></h2>
                    <p>{{ bid.scope }}</p>
                </section>
            </div>
            <div v-if="bid.services">
                <div class="hr"></div>
                <section class="descricao-escopo">
                    <h2>Lista de <span class="text-styled">Tarefas</span></h2>
                    <table>
                    <thead>
                    <tr>
                        <th>Serviço</th>
                        <th>Descrição</th>
                        <th>Prazo</th>
                        <th>Valor</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(servico, index) in bid.services" :key="index">
                        <td>{{ servico.service.data && servico.service.data.attributes.title }}</td>
                        <td v-html="markdownToHtml(servico.service.data && servico.service.data.attributes.description)"></td>
                        <td>{{ servico.days }} dias úteis</td>
                        <td>{{ (servico.price || servico.service.data.attributes.price).toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) }}</td>
                    </tr>
                    </tbody>
                    <tfoot v-if="bid_total > 0">
                    <tr>
                        <td colspan="3">Data de Entrega:</td>
                        <td><u>{{ bid_delivery_date_formated }}</u></td>
                    </tr>
                    <tr>
                        <td colspan="3">Valor Total:</td>
                        <td>{{ bid_total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) }}</td>
                    </tr>
                    <tr>
                        <td colspan="3">Valor Parcelado:</td>
                        <td><b>{{bid.installments}}x</b> de <b>{{ (bid_total / bid.installments).toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) }}</b><br><small>sem juros</small></td>
                    </tr>
                    <tr>
                        <td colspan="3">Valor à Vista:</td>
                        <td>{{ (bid_total * bid_atsight).toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) }}</td>
                    </tr>
                    
                    </tfoot>
                </table>
                </section>
                <div class="hr"></div>
                <div v-if="paymentViable == null" class="aceite">
                    <h2>Aceitar <span class="text-styled">Proposta</span>?</h2>
                    <div>
                        <button type="button" @click="atualizarProposta(false)"><i class="fa fa-times" aria-hidden="true"></i> Não</button>
                        <button type="button" @click="atualizarProposta(true)" class="aceitar"><i class="fa fa-check" aria-hidden="true"></i> Sim! Prosseguir para pagamento</button>
                    </div>
                </div>
                <div v-if="paymentViable">
                    <h2>Dados para <span class="text-styled">Pagamento</span></h2>
                    <div class="row-payment">
                        <div class="card-credit">
                            <strong>{{ bid_total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) }}</strong>
                            <b>{{bid.installments}}x</b> de <b>{{ (bid_total / bid.installments).toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) }}</b><br><small>sem juros</small>
                            <br><br>
                            <a class="payLink" :href="pagarmePaymentLink" target="_blank">
                                <i class="fa fa-credit-card"></i>Pagar com Cartão de Crédito
                            </a>

                        </div>
                        <div class="or">
                            ou
                        </div>
                        <div class="card-pix">
                            <img v-if="bid.payment_base64" :src="bid.payment_base64"/>
                            <strong>{{ (bid_total * bid_atsight).toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) }}</strong>
                            <small>{{(bid_total - (bid_total * bid_atsight)).toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) }} de desconto</small>
                            <br>
                            <p>
                                <b>Banco</b>077 - Inter<br><br>
                                <b>Agência</b>0001<br><br>
                                <b>Conta</b>47532386<br><br>
                                <b>CNPJ/PIX</b>35.810.898/0001-48<br><br>
                                <b>Favorecido</b>Eduardo Vieira Lemes<br><br>

                            </p>
                            <a class="payLink" :href="'https://api.whatsapp.com/send/?phone=5511989297291&text=*[Pagamento Realizado]*%0A%0AOlá! Gostaria de informar que o pagamento do valor de *'+ (bid_total * bid_atsight).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) +'* referente a proposta *' + (bid_id + 500) + '* foi realizado via PIX/Transferência.'" target="_blank">
                                <i class="fa fa-check" aria-hidden="true"></i>Confirmar Pagamento
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
    <div class="loading" v-else>
        Carregando...
    </div>

    
</template>

<style>
    @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css');
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700&display=swap');
    
    .or{font-size:36px;font-weight: 700;}
    .row-payment{
        display:flex;
        gap:4rem;
        justify-content: center;
        align-items: center;
    }
    .card-credit strong{font-size:20px;margin-bottom: 10px;display: block;}
    .card-credit,
    .card-pix{
        padding: 30px;
        border: 1px solid #f8f8f8;
        border-radius: 10px;
        box-shadow: 0px 0px 30px rgba(0,0,0,.1);
        width: 300px;
        text-align: center;
    }
    .card-pix small{
        background: #1abc9c;
        color: #fff;
        font-weight: 600;
        display: block;
        width: fit-content;
        margin: 5px auto 0 auto;
        padding: 5px 15px;
        border-radius: 30px;
        font-size:11px;
    }
    .card-pix p{font-size:14px;margin-bottom:15px;display:block}
    .card-pix b{display:block;font-size:10px;}
    .card-pix strong{
        font-size:25px;
        font-weight:700;
        background: -webkit-linear-gradient(#FC5656, #B32FD3);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    .loading{
        text-align: center;
        font-weight: 700;
        font-size:25px
    }
    .aceite{
        display:flex;
        justify-content: space-between;
    }
    .aceite div{
        display: flex;
        gap:30px;
        align-items: center;
    }
    .card-pix a,
    .card-credit a{display:block;text-decoration:none}
    .card-pix a i,
    .card-credit a i,
    .aceite div button i{margin-right:10px;cursor:pointer}
    .aceite div button,
    .card-pix a,
    .card-credit a{
        background: #ecf0f1;
        color: #666;
        border: 0;
        font-size: 14px;
        line-height: 46px;
        padding: 0 20px;
        border-radius: 6px;
        cursor: pointer;
    }
    .card-pix a,
    .aceite div button.aceitar{
        background: #1abc9c;
        border: 0;
        color:#fff;
        font-weight:600;
        box-shadow:4px 4px 4px rgba(0,0,0,.1);
        font-size:16px;
    }

    .container{width:990px;margin:0 auto}
    body{padding:0 0 5rem 0;margin:0;
        font-family: 'Montserrat', sans-serif;}
    header{
        background:#131313;
        padding:1rem;
        font-size:12px;
        color:#fff;
        margin-bottom:50px
    }
    header p{text-align: right;}
    header i{margin-right:10px;}
    header .container{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    header img{height: 50px;}

    h2{font-weight:700;font-size:39px}
    .cabecalho-proposta{}
    .cabecalho-proposta p{}
    .cabecalho-proposta p strong{margin-right:10px;}

    .hr{border-top:1px solid #f2f2f2;margin:50px 0}

    .text-styled{
        background: -webkit-linear-gradient(#FC5656, #B32FD3);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    table ul li{
        margin-bottom:10px;
    }
    table ul li:last-child{margin:0}
    table{width:100%}
    table th{text-align: left;}
    table td,
    table th{padding:15px;}
    table tbody tr td{font-size:12px;}
    table tbody tr td:nth-child(2){width:480px}
    table tbody tr td:first-child{font-weight:bold}
    table tbody tr td:last-child{text-align: right;}
    table tbody tr:nth-child(odd) td{
        background:#f2f2f2
    }
    table tfoot td[colspan="3"]{font-weight:600}
    table tfoot tr:last-child td:last-child{
        font-size:25px;
        font-weight:700;
        background: -webkit-linear-gradient(#FC5656, #B32FD3);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    table tfoot td{text-align: right;}

    @media(max-width:990px){
        /* body{padding:10px} */
        .container{max-width:100%;padding:0 30px}
    }
</style>
<script>
  import axios from 'axios'
  import { QrCodePix } from 'qrcode-pix'
  import marked from 'marked'
  import pagarme from 'pagarme'

  
  export default {
    name: 'ListaRegistros',
    data() {
      return {
        parametro: false,
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
        formataValorPagarme(valor){
            let pagarmeAmount = valor.toString()
            pagarmeAmount = pagarmeAmount.includes('.') ? pagarmeAmount.replace('.','') : pagarmeAmount + '00'
            pagarmeAmount = parseInt(pagarmeAmount)
            return pagarmeAmount
        },
        async atualizarProposta(aceitou){
            this.loading = true

            let items = []

            for(let i in this.bid.services){
                items.push({
                    id: this.bid.services[i].id,
                    title: this.bid.services[i].service.data.attributes.title,
                    unit_price: this.bid.services[i].price ? this.bid.services[i].price : this.bid.services[i].service.data.attributes.price,
                    quantity: 1,
                    tangible: false
                })
            }
            
            if(aceitou){
                let items = []

                for(let i in this.bid.services){
                    items.push({
                        id: this.bid.services[i].id.toString(),
                        title: this.bid.services[i].service.data.attributes.title,
                        unit_price: this.formataValorPagarme(this.bid.services[i].price ? this.bid.services[i].price : this.bid.services[i].service.data.attributes.price),
                        quantity: 1,
                        tangible: false
                    })
                }

                //GERA LINK PAGARME
                await axios.post(`https://strapi-production-f692.up.railway.app/api/pagarme`,{
                    data: {
                        name: '#'+ (this.bid_id + 500) + '_' + this.bid.client.data.attributes.name.toUpperCase().replaceAll(' ','_'),
                        amount : this.formataValorPagarme(this.bid_total),
                        items : items,
                        payment_config:{
                            boleto:{enabled:false},
                            credit_card:{
                                enabled:true,
                                free_installments: this.bid.installments,
                                max_installments: this.bid.installments
                            },
                            default_payment_method: "credit_card"
                        },
                        max_orders:1
                    }
                }).then(response => {
                    this.pagarmePaymentLink = response.data.data
                })
            }

            await axios.put(`https://strapi-production-f692.up.railway.app/api/bids/${this.bid_id}`,{
                data: {
                    accepted:aceitou,
                    payment_base64 : aceitou && this.qrCodePixImage ? this.qrCodePixImage : '',
                    payment_link : aceitou && this.pagarmePaymentLink ? this.pagarmePaymentLink : ''
                }
            })
            .then(response => {
                console.log(response.data)
                this.bid.accepted = aceitou
            })
            .catch(error => {
                console.error(error);
            });
            
            this.paymentViable = aceitou

            this.loading = false
            
        },
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

            const dia = this.bid_delivery_date.getDate().toString().padStart(2, '0')
            const mes = (this.bid_delivery_date.getMonth() + 1).toString().padStart(2, '0')
            const ano = this.bid_delivery_date.getFullYear()
            this.bid_delivery_date_formated  = `${dia}/${mes}/${ano}`

            
            //if(!this.bid.payment_base64){
                this.qrCodePix = await QrCodePix({
                    version: '01',
                    key: '35810898000148', //or any PIX key
                    name: 'Eduardo Vieira Lemes',
                    city: 'SAO PAULO',
                    transactionId: `${this.bid_id + 500}`, //max 25 characters
                    message: `Prazo de entrega estimado: ${dia}/${mes}/${ano}`,
                    cep: '01311904',
                    value: (this.bid_total * this.bid_atsight),
                });

            //console.log(qrCodePix.base64); // '00020101021126510014BR.GOV.BCB.PIX...'
            //this.qrCodePix = 
            
                this.qrCodePixImage = await this.qrCodePix.base64()
                this.bid.payment_base64 = this.qrCodePixImage
            //}

            
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
            }

            if(this.parametro == 123456){
                // let PAGARMEAPIKEY = ""
                // let PAGARMECKEY = ""
                let PAGARMEAPIKEY = "ak_live_nCn5HCIpU4IYNcHEegKwPYEx2Ob49J"
                // let PAGARMECKEY = "ek_live_dfOrhOGhS65igcwCps5S8gFMNdBMWN"
                
                // await pagarme.client.connect({ 
                //     api_key: PAGARMEAPIKEY,
                // })
                // .then(client => client.paymentLinks.create({
                //     amount : this.bid_total,
                //     items : items,
                //     payment_config:{
                //         boleto:{enabled:false},
                //         credit_card:{
                //             enabled:true,
                //             free_installments: this.bid_installments,
                //             max_installments: this.bid_installments
                //         },
                //         default_payment_method: "credit_card"
                //     },
                //     max_orders:1
                // }).then(response => console.log(response))
                // )
                
                // .then(paymentLinks => console.log(paymentLinks))
                // .catch(error => console.log(JSON.stringify(error)))

                

                
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

  