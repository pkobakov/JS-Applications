export async function getRecipes(){
    const response =  await fetch('http://localhost:3030/data/recipes', {
        method: 'get',
        headers: {'Content-Type': 'application/json'}
    });

    const data = response.json();
    return data;
}