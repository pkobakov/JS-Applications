const dashboard = document.getElementById('dashboard-holder');

export function showDashboard(context){
   context.renderer(dashboard);
}