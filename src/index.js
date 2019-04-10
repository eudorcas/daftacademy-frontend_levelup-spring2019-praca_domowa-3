import 'babel-polyfill';

function* secondsGenerator() {
    let i = yield;
    yield;
    while (true) {
        yield ++i;
        if (i >= 59) {
            yield i = 0;
        }
    }
}

function* minutesGenerator() {
    let j = yield;
    yield;
    while (true) {
        yield ++j;
        if (j >= 59) {
            yield j = 0;
        }
    }
}

function* hoursGenerator() {
    let z = yield;
    yield;
    while (true) {
        yield ++z;
        if (z >= 12) {
            yield z = 0;
        }
    }
}

const addDigit = (number) => {
    return number < 10 ? "0"+number : number
}
const date = new Date();
const currentH = Math.floor(date.getHours() > 12 ? date.getHours()/2 : date.getHours());
const currentM = date.getMinutes();
const currentS = date.getSeconds();

document.getElementById("hours").innerHTML = addDigit(currentH);
document.getElementById("minutes").innerHTML = addDigit(currentM);
document.getElementById("seconds").innerHTML = addDigit(currentS);

const seconds = secondsGenerator();
const minutes = minutesGenerator();
const hours = hoursGenerator();

seconds.next();
minutes.next();
hours.next();

seconds.next(currentS);
minutes.next(currentM);
hours.next(currentH);

setInterval(() => {
    const sec = seconds.next().value;
    document.getElementById("seconds").innerHTML = addDigit(sec);

    if (sec === 59) {
        const min = minutes.next().value;
        document.getElementById("minutes").innerHTML = addDigit(min);

        if (min === 59) {
            const h = hours.next().value;
            document.getElementById("hours").innerHTML = addDigit(h);
        }
    }
}, 1000);

