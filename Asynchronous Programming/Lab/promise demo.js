function executor(resolve, reject){
    console.log('promise starting');
    setTimeout(() => {
        resolve('Hello from the promise'), 5000
    });

    // setTimeout(() => {
    //     reject(new Error('Something went wrong!')), 5000
    // });

    console.log('promise ended');
}

const promise = new Promise(executor); 

promise.then(successCallback);
//promise.catch(failedCallBack);

function successCallback(data){
    console.log("RECEIVED DATA: ", data);
}

function failedCallBack(error){
    console.error('Encountered error: ', error.message);
}