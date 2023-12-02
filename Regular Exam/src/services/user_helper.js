function getUserData(){
    return JSON.parse(sessionStorage.getItem('userdata'));
}

function setUserData(userdata){
    sessionStorage.setItem('userdata', JSON.stringify(userdata));
}

function getUserID(){
    const userdata = getUserData();
    if (userdata) {
        return userdata._id;
        
    }
    return null;
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