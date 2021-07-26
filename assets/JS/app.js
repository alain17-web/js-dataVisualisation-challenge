let noScript = document.createElement('noscript');
noScript.innerText = "Sorry, Javascript is not enabled on your browser";
document.querySelector('body').insertAdjacentElement('beforeend',noScript);

//dataChart (update every second)
let dataChart = document.createElement('canvas');
dataChart.setAttribute('id','chart');
document.getElementById('firstHeading').insertAdjacentElement('afterend',dataChart);

const chartData = {
    labels: [],
    datasets: [{
        label:"",
        data:[],
        borderColor: `rgb(${randomColor()},${randomColor()}, ${randomColor()})`
    }]
};

const chartConfig = {
    type: 'line',
    data: chartData,
    options: {}
};

let chart = new Chart(
    document.getElementById('chart'),
    chartConfig
);

let xStart = 1;
let yStart = 10;
let length = 10;

function updateDataChart(){

    fetch(`https://canvasjs.com/services/data/datapoints.php?xstart=${xStart}&ystart=${yStart}&length=${length}&type=json`)
        .then( value => value.json())
        .then( data => {
        
    
            data.forEach(value => {
                chart.data.labels.push(value[0]);
                chart.data.datasets[0].data.push(value[1]);
                
            })
            

            xStart = chart.data.labels.length + 1;
            console.log(xStart);
            yStart = chart.data.datasets[0].data[chart.data.datasets[0].data.length - 1];
            console.log(yStart);
            length = 1;

            
            
            chart.update();
            let time = setTimeout(() => updateDataChart(),1000);
            button.addEventListener('click',function(){
            clearTimeout(time);
            })
        })
}
let button = document.createElement('button');
button.innerText = 'Click to freeze chart';
button.setAttribute('id','button');
document.getElementById('chart').insertAdjacentElement('afterend',button);

updateDataChart();
        
        

//Chart table1
let data1 = document.getElementById('table1');
let chart1 = document.createElement('canvas');
chart1.setAttribute("id","chartTable1");
data1.insertAdjacentElement('beforebegin',chart1);

  
let trElems = [...data1.querySelectorAll('tbody tr')];

let labels = [...trElems[0].querySelectorAll('th')];

let dataTr = trElems.slice(1,trElems.length);




const data = {
    labels :[],
    datasets:[]
};

const config = {
    type: 'bar',
    data: data,
    options:{
        scales:{
            y:{
                beginAtzero: true
            }
        }
    },
};

data.labels = labels.map(value => value.innerText).filter(value => value !="");



trElems.forEach(trElem => {
    let tdElems =  [...trElem.querySelectorAll('td')];
    
    let datas = tdElems.map(value => value.innerText === ":" ? 0 : value.innerText);
    
    

    data.datasets.push({
        label: datas[0],
        data: datas.slice(1,datas.length).map(value => value.toString().replace(",",".")),
        backgroundColor: `rgb(${randomColor()}, ${randomColor()}, ${randomColor()})`,
        borderColor: `rgb(${randomColor()},${randomColor()}, ${randomColor()})`,
        borderWidth: 1,
        maxBarThickness : 5
        
    })
})

let chartTable1 = new Chart(
    document.getElementById('chartTable1'),
    config
);

//Chart table2
let data2 = document.getElementById('table2');
let chart2 = document.createElement('canvas');
chart2.setAttribute("id","chartTable2");
data2.insertAdjacentElement('beforebegin',chart2);


labels = [...data2.querySelectorAll('thead tr th')];
trElems = [...data2.querySelectorAll('tbody tr')];

const barData = {
    labels: [],
    datasets: []
};

const barConfig = {
    type: 'bar',
    data: barData,
    options:{
        scales:{
            y:{
                beginAtzero: true
            }
        }
    },
};

barData.labels = labels.slice(2,labels.length).map(value => value.innerText);

trElems.forEach(trElem => {
    datas = [...trElem.querySelectorAll('td')].map(value => value.innerText);
    
    barData.datasets.push({
        label: datas[0],
        data: datas.slice(1,datas.length),
        backgroundColor:[`rgb(${randomColor()},${randomColor()},${randomColor()})`],
        borderColor: [`rgb(${randomColor()},${randomColor()},${randomColor()})`],
        borderWidth: 1,
        maxBarThickness : 5
    })
})

let chartTable2 = new Chart(
    document.getElementById('chartTable2'),
    barConfig
);

function randomColor(){
    return Math.floor(Math.random() * 256);}

