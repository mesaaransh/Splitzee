export default async function waiter(time: number) {

    let myPromise = new Promise(function (myResolve) {
        setTimeout(function () {
            myResolve(""); // when successful
        }, time);
    });
    return myPromise

}