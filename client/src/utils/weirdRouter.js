


export function weirdRouter(route){
    const link = document.createElement('a');
    link.href = route;
    link.style.display='hidden';
    let divs = document.getElementsByTagName('div');
    divs[0].appendChild(link);
    return link.click();
}