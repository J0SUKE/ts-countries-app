import {debounce} from 'lodash';


const input = document.querySelector<HTMLInputElement>('.countyName');

type Country = {
    name:string,
    capital:string,
    population:number,
    flag:string,// url of the flag is a string
}

const countriesNodes:HTMLElement[]= [];

async function GetCountry(typed:string | undefined) 
{
    if (typed === undefined) return;
    
    const request = await fetch(`https://restcountries.com/v3.1/name/${typed}`)
    const data = request.json();    
    return data;
}

function handleInput() {
    GetCountry(input?.value)
    .then((data:any[])=>{
        
        countriesNodes.forEach(node => {
            node.remove();
        });    
        
        data.forEach(item => {
            let country:Country = {
                name:item.name.common,
                capital:item.capital[0],
                population:item.population,
                flag:item.flags.svg
            }
            PrintCountry(country);
        });
    })
}

function PrintCountry(country:Country) {
    const name = createHtmlElement('h1',country.name);
    const capital = createHtmlElement('h4',country.capital);
    const population = createHtmlElement('p',country.population.toString());
    const flag = createHtmlElement('img',undefined,{src:country.flag,className:'flag'});
    
    const container = createHtmlElement('div');
    
    container.append(name);
    container.append(capital);
    container.append(population);
    container.append(flag);

    countriesNodes.push(container);

    document.body.append(container);
}

function createHtmlElement(type:string,text?:string,props?:{className?:string,src?:string}) 
{
    let element = document.createElement(type) as any;

    if(text) element.textContent = text;
    if (props?.className) element.className = props.className;
    if (props?.src) element.src = props.src;
    

    return element;
}


input?.addEventListener('input',debounce(handleInput,800));