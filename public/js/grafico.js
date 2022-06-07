const ctx = document.getElementById('myChart').getContext("2d");

let labels = [];
let dados = [];
let frase = document.getElementById('frase');
  

const data = {
    labels,
    datasets: [{
        data: dados,
        label: '',
        fill: true,
        backgroundColor: [
        'rgba(153, 102, 255, 0.2)'
        ],
        borderColor: [
            '#6d7bf9',
          ],
          borderWidth: 1 
    }]
};


let config = {
    type: 'bar',
    data,
    options: {
        responsive: true,
        scales: {
            yAxes: [{
            	ticks: {
                	beginAtZero: true,
                    stepSize: 5
            	}
        	}],
            y : {
                ticks: {
                    callback: function(value)
                        {
                            let finalValue = value
                            return finalValue + '%';
                        }
                }
            }            
    	},
        
    },
    plugins: [ChartDataLabels]
};


const myChart = new Chart(ctx, config);

const pegarDadosGrafico = () => {
    
    

    let select  = eval(document.getElementById('sel_grafico').value);
    let checkbox = document.getElementById('checkbox_porcentagem').checked 


    let tabela = select[1];
    let coluna = select[0];
    let idUsuario = sessionStorage.ID_USUARIO;

    fetch('/usuario/dados-grafico',{
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            tabelaServer : tabela,
            colunaServer : coluna,
            idUsuarioServer : idUsuario
        })
    })
        .then((resposta) =>{
            console.log(resposta)
            if(resposta.ok)
            {
                resposta.json()
                    .then(json =>{
                        console.log(json);
                        console.log(JSON.stringify(json));
                        plotarGrafico(json, checkbox);
                    })
                    .catch((erro) =>{
                        console.log(erro);
                    })
                    
            }
        })

}

const plotarGrafico = (json,porcentagem) => 
{
    labels.length = 0;
    dados.length = 0;

    if(porcentagem)
    {
        config.options.y = {"max": 100};  
        let cemPorCento = 0;


        for(let i = 0; i < json.length; i++)
            cemPorCento += json[i].contagem

        for(let i = 0; i <json.length; i++)
        {
            let registro = json[i];

            labels.push(registro.coluna)
            dados.push(((registro.contagem/cemPorCento)*100).toFixed(2))
        }
        }
        


    else
    {
        config.options.y = {"max": json[json.length-1].contagem};
        for(let i = 0; i < json.length; i++)
        {
            let registro = json[i]
        
            labels.push(registro.coluna);
            dados.push(registro.contagem);
        }
    }
    
    myChart.update()
}



