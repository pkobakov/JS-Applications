const catalogSection = document.getElementById('catalog');

export function showCatalog(){
    document.querySelector('main').replaceChildren(catalogSection);
}