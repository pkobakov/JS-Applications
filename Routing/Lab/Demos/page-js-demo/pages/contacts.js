const root = document.getElementById('root');

function contactsTemplate(){
    return '<h1>Contacts</h1>'
}
export function loadContacts(context, next){
    root.innerHTML = contactsTemplate();
}