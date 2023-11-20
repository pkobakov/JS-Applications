const userData = {
    getUserData: () => JSON.parse(sessionStorage.getItem('userData')),
    setUserData: (data) => sessionStorage.setItem('userData',JSON.stringify(data))
};

export {userData};