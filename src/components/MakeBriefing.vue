<template>
    <div class="head d-flex justify-content-center py-4 mb-5">
        <img src="https://www.alpix.dev/assets/logo_w.svg" alt="Logo da Alpix">
    </div>
    <div v-if="finished">
        <div class="container text-center">
            <h2 class="h4 mt-3 mb-4">Pronto! Sua entrevista foi <b class="gradient text">enviada</b>.</h2>
            <p>Agora é com a gente. Vamos dar um retorno o quanto antes, fechado?</p>
            <p>Qualquer dúvida entre em contato através de nossos canais de atendimento</p>
            <small class="d-block mt-5"><u>Agora você já pode fechar essa página.</u></small>
        </div>
    </div>
    <div v-else>
        <div class="container" v-if="type == 'logo'">    
            <div v-if="step == 0">
                <span class="brad badge gradient py-2 px-3">Criação de Logo</span>
                <h2 class="h4 mt-3 mb-4">Você chegou na faze mais importante do seu projeto: <b class="gradient text">a entrevista!</b></h2>
                <p>É ela que vai determinar os detalhes do seu <B>logo</B> e nos ajudar a alinhar suas expectativas.</p>
                <p>Por isso, reserve um bom tempo para preencher as informações no formulário e detalhar ao máximo suas expectativas. Vai levar de 15 a 20 minutos e sugerimos que faça pelo computador.</p>
                <div class="row my-5 align-items-center">
                    <div class="col">
                        <div class="panel bg-black txt-white p-5" style="border-radius:15px">
                            <h4 class="h5 mb-4 font-weight-bold">Tenha em mãos:</h4>
                            <ul>
                                <li>
                                    Informações sobre a persona da sua empresa;
                                </li>
                                <li>
                                    Nome de alguns concorrentes diretos;
                                </li>
                                <li>
                                    Nome das referências do seu segmento.
                                </li>
                                
                            </ul>
                        </div>
                    </div>
                    <div class="col-auto offset-md-1">
                        <button type="button" class="cta btn gradient btn-lg txt-white px-5 py-3" @click="setStepTo(step+1)">
                            Iniciar minha entrevista!
                        </button>
                    </div>
                </div>
            </div>
            <div v-if="step != 0">
                <div class="row justify-content-center">
                    <div class="col-md-6">
                        <div class="row stepper justify-content-between mb-5 align-items-end">
                            <div class="col-auto"  :class="(step >= 1 ? 'placed' : ''),(step == 1 ? 'current' : '')">
                                <div class="step_marker">
                                    Identificação
                                    <span class="pointer mt-2" :class="step >= 1 ? 'gradient' : ''"></span>
                                </div>
                            </div>
                            <div class="col separator mb-2"></div>
                            <div class="col-auto"  :class="(step >= 2 ? 'placed' : ''),(step == 2 ? 'current' : '')">
                                <div class="step_marker">
                                    Marca
                                    <span class="pointer mt-2" :class="step >= 2 ? 'gradient' : ''"></span>
                                </div>
                            </div>
                            <div class="col separator mb-2"></div>
                            <div class="col-auto" :class="(step >= 3 ? 'placed' : ''),(step == 3 ? 'current' : '')">
                                <div class="step_marker" >
                                    Concorrentes
                                    <span class="pointer mt-2" :class="step >= 3 ? 'gradient' : ''"></span>
                                </div>
                            </div>
                            <div class="col separator  mb-2"></div>
                            <div class="col-auto" :class="(step >= 4 ? 'placed' : ''),(step == 4 ? 'current' : '')">
                                <div class="step_marker" >
                                    Referências
                                    <span class="pointer mt-2" :class="step >= 4 ? 'gradient' : ''"></span>
                                </div>
                            </div>
                            
                        </div>
                    </div>                
                </div>
                
            </div>            
            <div v-for="(section, index) in briefing.logo" :key="'section_'+step">            
                <div v-if="'step'+step === index">
                    <div class="row justify-content-center">
                        <div class="col-12 col-md-6">
                            <span class="brad badge gradient py-2 px-3">Criação de Logo</span>
                            <h2 class="h4 mt-3 mb-4">{{section.title}}</h2>
                            <p v-html="section.description"></p>
                            <div class="row my-5 align-items-center">
                                <div class="col-12">
                                    <div class="form-group" v-for="item in section.questions" :key="step+'_logo_'+item.id">
                                        <label :for="item.field" class="font-weight-bold" v-html="item.question"></label>   
                                        <p class="hint" v-if="item.hint" v-html="item.hint"></p>
                                        <input v-if="item.type == 'text'"  v-model="item.text_response" :type="item.type" class="form-control"  :id="item.field" placeholder="">
                                        <textarea rows="4" v-if="item.type == 'textarea'"  v-model="item.text_response" :type="item.type" class="form-control"  :id="item.field" placeholder=""></textarea>
                                        <input v-if="item.type == 'number'" v-model="item.number_response" :type="item.type" class="form-control"  :id="item.field" placeholder="">
                                        <input v-if="item.type == 'mail'"  v-model="item.text_response" :type="item.type" class="form-control"  :id="item.field" placeholder="">
                                        <input v-if="item.type == 'phone'"  v-model="item.text_response" :type="item.type" class="form-control"  :id="item.field" placeholder="">
                                        <input v-if="item.type == 'file'"  @change="handleFileChange($event, index, item.question_id)" :type="item.type" multiple class="form-control"  :id="item.field" placeholder="">
                                    </div>
                                    
                                </div>
                            </div>
                            <div class="row justify-content-between">
                                <div class="col-auto">
                                    <button v-if="step > 1" type="button" class="cta btn btn-light  btn-lg txt-black px-5 py-3" @click="setStepTo(step-1)">
                                        Voltar
                                    </button>
                                </div>
                                <div class="col-auto">
                                    <button type="button" v-if="briefing.logo['step'+(step+1)]" class="cta btn gradient btn-lg txt-white px-5 py-3" @click="setStepTo(step+1)">
                                        Avançar
                                    </button>
                                    <button type="button" v-else class="cta btn gradient btn-lg txt-white px-5 py-3" @click="sendBriefing()">
                                        Finalizar Entrevista
                                    </button>                                
                                </div>
                            </div>
                        </div>
                    </div>            
                </div>
            </div>
        </div>
        <div class="container" v-if="type == 'loja-virtual'">   
            <div v-if="step == 0">
                <span class="brad badge gradient py-2 px-3">Criação de Loja Virtual</span>
                <h2 class="h4 mt-3 mb-4">Você chegou na faze mais importante do seu projeto: <b class="gradient text">a entrevista!</b></h2>
                <p>É ela que vai determinar os detalhes da sua <b>loja virtual</b> e nos ajudar a alinhar suas expectativas.</p>
                <p>Por isso, reserve um bom tempo para preencher as informações no formulário e detalhar ao máximo suas expectativas. Vai levar de 15 a 20 minutos e sugerimos que faça pelo computador.</p>
                <div class="row my-5 align-items-center">
                    <div class="col">
                        <div class="panel bg-black txt-white p-5" style="border-radius:15px">
                            <h4 class="h5 mb-4 font-weight-bold">Tenha em mãos:</h4>
                            <ul>
                                <li>
                                    Logo e arquivos da sua marca;
                                </li>
                                <li>
                                    História da sua empresa;
                                </li>
                                <li>
                                    Outros sites para usar como referência;
                                </li>
                                <li>
                                    Fotos + informações de ao menos  4 produtos que você vende ou vai vender.
                                </li>
                                
                            </ul>
                        </div>
                    </div>
                    <div class="col-auto offset-md-1">
                        <button type="button" class="cta btn gradient btn-lg txt-white px-5 py-3" @click="setStepTo(step+1)">
                            Iniciar minha entrevista!
                        </button>
                    </div>
                </div>
            </div>     
            <div v-if="step != 0">
                <div class="row justify-content-center">
                    <div class="col-md-6">
                        <div class="row stepper justify-content-between mb-5 align-items-end">
                            <div class="col-auto"  :class="(step >= 1 ? 'placed' : ''),(step == 1 ? 'current' : '')">
                                <div class="step_marker">
                                    Identificação
                                    <span class="pointer mt-2" :class="step >= 1 ? 'gradient' : ''"></span>
                                </div>
                            </div>
                            <div class="col separator mb-2"></div>
                            <div class="col-auto"  :class="(step >= 2 ? 'placed' : ''),(step == 2 ? 'current' : '')">
                                <div class="step_marker">
                                    Marca
                                    <span class="pointer mt-2" :class="step >= 2 ? 'gradient' : ''"></span>
                                </div>
                            </div>
                            <div class="col separator mb-2"></div>
                            <div class="col-auto" :class="(step >= 3 ? 'placed' : ''),(step == 3 ? 'current' : '')">
                                <div class="step_marker" >
                                    Concorrentes
                                    <span class="pointer mt-2" :class="step >= 3 ? 'gradient' : ''"></span>
                                </div>
                            </div>
                            <div class="col separator  mb-2"></div>
                            <div class="col-auto" :class="(step >= 4 ? 'placed' : ''),(step == 4 ? 'current' : '')">
                                <div class="step_marker" >
                                    Referências
                                    <span class="pointer mt-2" :class="step >= 4 ? 'gradient' : ''"></span>
                                </div>
                            </div>
                            <div class="col separator  mb-2"></div>
                            <div class="col-auto" :class="(step >= 4 ? 'placed' : ''),(step == 4 ? 'current' : '')">
                                <div class="step_marker" >
                                    Acessos
                                    <span class="pointer mt-2" :class="step >= 4 ? 'gradient' : ''"></span>
                                </div>
                            </div>
                        </div>
                    </div>                
                </div>
                
            </div>            
            <div v-for="(section, index) in briefing['loja-virtual']" :key="'section_'+step">            
                <div v-if="'step'+step === index">
                    <div class="row justify-content-center">
                        <div class="col-12 col-md-6">
                            <span class="brad badge gradient py-2 px-3">Criação de Logo</span>
                            <h2 class="h4 mt-3 mb-4">{{section.title}}</h2>
                            <p v-html="section.description"></p>
                            <div class="row my-5 align-items-center">
                                <div class="col-12">
                                    <div class="form-group" v-for="item in section.questions" :key="step+'_logo_'+item.id">
                                        <label :for="item.field" class="font-weight-bold" v-html="item.question"></label>   
                                        <p class="hint" v-if="item.hint" v-html="item.hint"></p>
                                        <input v-if="item.type == 'text'"  v-model="item.text_response" :type="item.type" class="form-control"  :id="item.field" placeholder="">
                                        <textarea rows="4" v-if="item.type == 'textarea'"  v-model="item.text_response" :type="item.type" class="form-control"  :id="item.field" placeholder=""></textarea>
                                        <input v-if="item.type == 'number'" v-model="item.number_response" :type="item.type" class="form-control"  :id="item.field" placeholder="">
                                        <input v-if="item.type == 'mail'"  v-model="item.text_response" :type="item.type" class="form-control"  :id="item.field" placeholder="">
                                        <input v-if="item.type == 'phone'"  v-model="item.text_response" :type="item.type" class="form-control"  :id="item.field" placeholder="">
                                        <input v-if="item.type == 'file'"  @change="handleFileChange($event, index, item.question_id)" :type="item.type" multiple class="form-control"  :id="item.field" placeholder="">
                                    </div>
                                    
                                </div>
                            </div>
                            <div class="row justify-content-between">
                                <div class="col-auto">
                                    <button v-if="step > 1" type="button" class="cta btn btn-light  btn-lg txt-black px-5 py-3" @click="setStepTo(step-1)">
                                        Voltar
                                    </button>
                                </div>
                                <div class="col-auto">
                                    <button type="button" v-if="briefing['loja-virtual']['step'+(step+1)]" class="cta btn gradient btn-lg txt-white px-5 py-3" @click="setStepTo(step+1)">
                                        Avançar
                                    </button>
                                    <button type="button" v-else class="cta btn gradient btn-lg txt-white px-5 py-3" @click="sendBriefing()">
                                        Finalizar Entrevista
                                    </button>                                
                                </div>
                            </div>
                        </div>
                    </div>            
                </div>
            </div>
        </div>
    </div>
    
</template>
    
<style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
    @import url('https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css');
    body{font-family: 'Poppins', sans-serif!important;font-size:14px; color:#4f4f4f}
    p{color: #4f4f4f;}
    .head{
        background: #131313;
        color: #fff;
    }
    .hint{font-size:12px}
    .stepper{}
    .stepper .col-auto:not(.placed){opacity: .3;}
    .stepper .separator{
        height:1px;
        background: #ccc;
        margin-left:0;
        margin-right: 0;
    }
    .step_marker{font-size: 12px;color: #000;}
    .current{font-weight: bold;}
    .placed:not(.current) + .separator{background: #131313;}
    .step_marker.placed{
        
    }
    .step_marker .pointer{
        height: 20px;
        width: 20px;
        display: block;
        margin: 0 auto;
        box-shadow: 0px 0px 0px 1px #000;
        border: 2px solid #fff;
        border-radius: 50%;
    }
    .step_marker.placed .pointer{
        
    }
    .panel{}
    .panel ul{
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    .cta{color: #fff!important;border: 0!important;font-weight: 600!important;}
    .panel ul li{
        
    }
    .txt-white{color: #fff;}
    .txt-black{color: #131313!important;}
    .brad{border-radius: 50px!important;}
    .gradient{
        background: -webkit-linear-gradient(#FC5656, #B32FD3);
    }
    .bg-black{background: #131313;}
    .gradient.text{
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    .head img{height: 40px;}
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
    import marked from 'marked'
    import { parse } from 'marked/src/Parser';

    const apiUrl = 'https://strapi-production-f692.up.railway.app/api';
  
  export default {
    name: 'MakeBriefing',
    data() {
      return {        
        type: '',
        step:0,
        id:null,
        finished:false,
        aviso:'Carregando proposta...',
        briefing:{            
            logo:{
                step1:{
                    title:"Quem é você?",
                    description:"Informe os dados abaixo e mantenha seu cadastro atualizado.<br><br>Usaremos essas informações para entrar em contato, criar grupos ou o que for necessário e combinado durante o processo de desenvolvimento.",
                    questions:[
                        {
                            question_id:1,
                            field:'name',
                            question:"Nome",
                            type:'text',
                            text_response:'',
                            number_response:0,
                            file_response:[],
                            list_response:[]
                        },
                        {
                            question_id:2,
                            field:'email',
                            question:"E-mail",
                            type:'mail',
                            text_response:'',
                            number_response:0,
                            file_response:[],
                            list_response:[]
                        },
                        {
                            question_id:3,
                            field:'phone',
                            question:"Telefone",
                            type:'phone',
                            text_response:'',
                            number_response:0,
                            file_response:[],
                            list_response:[]
                        },
                        {
                            question_id:4,
                            field:'whatsapp',
                            question:"Whatsapp",
                            type:'phone',
                            text_response:'',
                            number_response:0,
                            file_response:[],
                            list_response:[]
                        }
                    ]
                },
                step2:{
                    title:"Fale sobre sua marca",
                    description:"Vamos lá",
                    questions:[
                        {
                            question_id:1,
                            field:'name',
                            question:"Nome da Empresa",
                            type:'text',
                            text_response:'',
                            number_response:0,
                            file_response:[],
                            list_response:[]
                        },
                        {
                            question_id:2,
                            field:'name',
                            question:"Qual o perfil do seu público?",
                            type:'text',
                            text_response:'',
                            number_response:0,
                            file_response:[],
                            list_response:[
                                {option: 'Homens', checked:false},
                                {option: 'Mulheres', checked:false},
                                {option: 'Jovens +18 anos', checked:false},
                                {option: 'Jovens Adultos +25 anos', checked:false},
                                {option: 'Adultos +30 anos', checked:false},
                                {option: 'Idosos +60 anos', checked:false},
                                {option: 'Classe A', checked:false},
                                {option: 'Classe B', checked:false},
                                {option: 'Classe C', checked:false},
                                {option: 'Classe D', checked:false}
                            ]
                        },
                        {
                            question_id:3,
                            field:'history',
                            question:"História da Empresa",
                            type:'textarea',
                            text_response:'',
                            number_response:0,
                            file_response:[],
                            list_response:[]
                        },
                        {
                            question_id:4,
                            field:'colors_do',
                            question:"Que cores podemos utilizar?",
                            type:'text',
                            text_response:'',
                            number_response:0,
                            file_response:[],
                            list_response:[]
                        },
                        {
                            question_id:5,
                            field:'colors_dont',
                            question:"Que cores devemos evitar?",
                            type:'text',
                            text_response:'',
                            number_response:0,
                            file_response:[],
                            list_response:[]
                        },
                        {
                            question_id:6,
                            field:'files',
                            question:"Arquivos",
                            hint:"Anexe arquivos da marca já existentes, como logo ou manual de marca que já existam",
                            type:'file',
                            text_response:'',
                            number_response:0,
                            file_response:[],
                            list_response:[]
                        }
                    ]
                },
                step3:{
                    title:"Sobre seus concorrentes",
                    description:"Vamos lá",
                    questions:[
                        {
                            question_id:1,
                            field:'competitors',
                            question:"Informe o nome ao menos 3 concorrentes",
                            type:'text',
                            text_response:'',
                            number_response:0,
                            file_response:[],
                            list_response:[]
                        },
                        {
                            question_id:2,
                            field:'competitors_details',
                            question:"O que você julga ser o diferencial de seus concorrentes?",
                            type:'textarea',
                            text_response:'',
                            number_response:0,
                            file_response:[],
                            list_response:[]
                        }                            
                    ]
                },
                step4:{
                    title:"Suas referências",
                    description:"Vamos lá",
                    questions:[
                        {
                            question_id:1,
                            field:'references',
                            question:"Informe o nome ao menos 3 logos de que gosta e explique o porque",
                            type:'text',
                            text_response:'',
                            number_response:0,
                            file_response:[],
                            list_response:[]
                        },
                        {
                            question_id:2,
                            field:'reference_details',
                            question:"O que você julga ser o diferencial dessas referências?",
                            type:'textarea',
                            text_response:'',
                            number_response:0,
                            file_response:[],
                            list_response:[]
                        }                            
                    ]
                }  
            },
            "loja-virtual":{
                step1:{
                    title:"Quem é você?",
                    description:"Informe os dados abaixo e mantenha seu cadastro atualizado.<br><br>Usaremos essas informações para entrar em contato, criar grupos ou o que for necessário e combinado durante o processo de desenvolvimento.",
                    questions:[
                        {
                            question_id:1,
                            field:'name',
                            question:"Nome",
                            type:'text',
                            text_response:'',
                            number_response:0,
                            file_response:[],
                            list_response:[]
                        },
                        {
                            question_id:2,
                            field:'email',
                            question:"E-mail",
                            type:'mail',
                            text_response:'',
                            number_response:0,
                            file_response:[],
                            list_response:[]
                        },
                        {
                            question_id:3,
                            field:'phone',
                            question:"Telefone",
                            type:'phone',
                            text_response:'',
                            number_response:0,
                            file_response:[],
                            list_response:[]
                        },
                        {
                            question_id:4,
                            field:'whatsapp',
                            question:"Whatsapp",
                            type:'phone',
                            text_response:'',
                            number_response:0,
                            file_response:[],
                            list_response:[]
                        }
                    ]
                },
                step2:{
                    title:"Fale sobre sua marca",
                    description:"Compartilhe detalhes sobre seu empreendimento.",
                    questions:[
                        {
                            question_id:1,
                            field:'name',
                            question:"Nome da Empresa",
                            type:'text',
                            text_response:'',
                            number_response:0,
                            file_response:[],
                            list_response:[]
                        },
                        {
                            question_id:2,
                            field:'name',
                            question:"Qual o perfil do seu público?",
                            type:'text',
                            text_response:'',
                            number_response:0,
                            file_response:[],
                            list_response:[
                                {option: 'Homens', checked:false},
                                {option: 'Mulheres', checked:false},
                                {option: 'Jovens +18 anos', checked:false},
                                {option: 'Jovens Adultos +25 anos', checked:false},
                                {option: 'Adultos +30 anos', checked:false},
                                {option: 'Idosos +60 anos', checked:false},
                                {option: 'Classe A', checked:false},
                                {option: 'Classe B', checked:false},
                                {option: 'Classe C', checked:false},
                                {option: 'Classe D', checked:false}
                            ]
                        },
                        {
                            question_id:3,
                            field:'history',
                            question:"História da Empresa",
                            type:'textarea',
                            text_response:'',
                            number_response:0,
                            file_response:[],
                            list_response:[]
                        },
                        {
                            question_id:4,
                            field:'colors_do',
                            question:"Que cores podemos utilizar?",
                            type:'text',
                            text_response:'',
                            number_response:0,
                            file_response:[],
                            list_response:[]
                        },
                        {
                            question_id:5,
                            field:'colors_dont',
                            question:"Que cores devemos evitar?",
                            type:'text',
                            text_response:'',
                            number_response:0,
                            file_response:[],
                            list_response:[]
                        },
                        {
                            question_id:6,
                            field:'files',
                            question:"Arquivos",
                            hint:"Anexe arquivos da marca já existentes, como logo ou manual de marca que já existam",
                            type:'file',
                            text_response:'',
                            number_response:0,
                            file_response:[],
                            list_response:[]
                        }
                    ]
                },
                step3:{
                    title:"Sobre seus concorrentes",
                    description:"Fale um pouco sobre eles, dessa forma podemos entender o que pode funcionar ou não com seu público-alvo.",
                    questions:[
                        {
                            question_id:1,
                            field:'competitors',
                            question:"Informe o nome ao menos 3 concorrentes",
                            type:'text',
                            text_response:'',
                            number_response:0,
                            file_response:[],
                            list_response:[]
                        },
                        {
                            question_id:2,
                            field:'competitors_details',
                            question:"O que você julga ser o diferencial de seus concorrentes?",
                            type:'textarea',
                            text_response:'',
                            number_response:0,
                            file_response:[],
                            list_response:[]
                        }                            
                    ]
                },
                step4:{
                    title:"Suas referências",
                    description:"Compartilhe suas referências conosco!",
                    questions:[
                        {
                            question_id:1,
                            field:'references',
                            question:"Informe o nome ao menos 3 logos de que gosta e explique o porque",
                            type:'text',
                            text_response:'',
                            number_response:0,
                            file_response:[],
                            list_response:[]
                        },
                        {
                            question_id:2,
                            field:'reference_details',
                            question:"O que você julga ser o diferencial dessas referências?",
                            type:'textarea',
                            text_response:'',
                            number_response:0,
                            file_response:[],
                            list_response:[]
                        }                            
                    ]
                },
                step5:{
                    title:"Seus acessos",
                    description:"Informe abaixo os acessos aos serviços, sistemas e integrações atuais para que possamos integrá-los à sua loja virtual.",
                    questions:[
                        {
                            question_id:1,
                            field:'references',
                            question:"Informe o nome ao menos 3 logos de que gosta e explique o porque",
                            type:'text',
                            text_response:'',
                            number_response:0,
                            file_response:[],
                            list_response:[]
                        },
                        {
                            question_id:2,
                            field:'reference_details',
                            question:"O que você julga ser o diferencial dessas referências?",
                            type:'textarea',
                            text_response:'',
                            number_response:0,
                            file_response:[],
                            list_response:[]
                        }                            
                    ]
                }    
            }
                      
        }            
        
      };
    },
    methods:{
       
        markdownToHtml(description) {            
            return marked(description)
        },


        setStepTo(step){
            localStorage.setItem(`apx_briefing`,JSON.stringify(this.briefing))
            this.step = step;
        },
        handleFileChange(event, index, question_id) {
            console.log(index, question_id - 1)
            console.log(event.target.files)
            
            this.uploadFile(question_id, index, event)
        },
        async sendBriefing() {
            // Array para armazenar todas as perguntas
            const allQuestions = [];

            // Percorrendo cada etapa do objeto
            for (const step in this.briefing[this.type]) {
                if (this.briefing[this.type].hasOwnProperty(step)) {
                    const questions = this.briefing[this.type][step].questions;
                    // Percorrendo cada pergunta em uma etapa
                    questions.forEach(question => {
                        allQuestions.push(question);
                    });
                }
            }
            let data = {
                data:{
                    type: this.type,
                    questions: allQuestions
                }
            }
            
            await axios.post(`https://strapi-production-f692.up.railway.app/api/briefings`,data)
            .then(response => {
                this.finished = true
                localStorage.removeItem(`apx_briefing`)
            })
            .catch(error => {
                alert.error(error);
            });
            
            localStorage.removeItem(`apx_briefing`)
            // await axios.post(apiUrl + `/briefing`,{
            //     questions: 
            // })
            //     .then(response => {
            //     this.bid = response.data.data[0].attributes;
            //     this.bid_id = response.data.data[0].id;
            //     this.paymentViable = this.bid.accepted 
            //     this.pagarmePaymentLink = this.bid.payment_link 
            //     //console.log(this.bid)
            //     })
            //     .catch(error => {
            //     console.error(error);
            //     });
        },
        async uploadFile(question_id, index, event){
            try {
                const formData = new FormData()
                for (let i = 0; i < event.target.files.length; i++) {
                formData.append('files', event.target.files[i]);
                }
                const response = await axios.post(apiUrl + `/upload/`, formData , {
                'Content-Type': 'multipart/form-data',
                });        
                
                console.log(response.data)
                this.briefing[this.type][index].questions[question_id - 1].file_response = response.data
                   
            } catch (error) {
                console.error('Erro ao buscar itens:', error);
            }
        }
        
        
    },
    mounted(){
        this.type = this.$route.params.type;  
        let saved_briefing = localStorage.getItem(`apx_briefing`)
        if(saved_briefing){
            saved_briefing = JSON.parse(saved_briefing)
            this.briefing = saved_briefing
        }
        
    },
    created() {
        
        
    },
  };
  </script>

  