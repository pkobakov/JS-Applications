const dashboard = document.getElementById('dashboard-holder');
const main = document.getElementById('main');

export function showDashboard(){
   main.replaceChildren(dashboard);
}