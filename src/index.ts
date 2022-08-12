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
    let name = createHtmlElement('h1',country.name);
    let capital = createHtmlElement('h4',country.capital);
    let population = createHtmlElement('p',country.population.toString());

    const flag = document.createElement('img');
    flag.className = 'flag';
    flag.src = country.flag;

    const container = document.createElement('div');
    container.append(name);
    container.append(capital);
    container.append(population);
    container.append(flag);

    countriesNodes.push(container);

    document.body.append(container);
}

function createHtmlElement(type:string,text:string) 
{
    const element = document.createElement(type);
    element.textContent = text;
    return element;
}

input?.addEventListener('input',debounce(handleInput,800));