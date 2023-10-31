function createTimer(){
    return new Promise(resolve => {
        setTimeout(() => {resolve('hello')}, 2000);
    });
}


async function start(){
    const timerPromise = createTimer();

    console.log('starting');

    const data = await timerPromise;
    console.log('operation complete: ', data);

    console.log('end of scope');

}

start();



