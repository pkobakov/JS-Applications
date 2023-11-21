const userData = {
    getUserData: () => JSON.parse(sessionStorage.getItem('userData')),
    setUserData: (data) => sessionStorage.setItem('userData',JSON.stringify(data)),
    clearUserData: () => sessionStorage.removeItem('userData'), 
    getUserId: () => JSON.parse(sessionStorage.getItem('userData'))._id
};

export {userData};