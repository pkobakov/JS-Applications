function getUserData(){
    return JSON.parse(sessionStorage.getItem('userdata'));
}

function setUserData(userdata){
    
    sessionStorage.setItem('userdata', JSON.stringify(userdata));
}

function getUserID(){
    const userdata = getUserData();
    return userdata._id;
}

function removeUserData(){
    sessionStorage.removeItem('userdata');
}

export const userHelper = {
   getUserData,
   setUserData,
   getUserID,
   removeUserData

}