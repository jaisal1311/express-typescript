const add = (first, second, callbacks) => {
    setTimeout(() => {
        let s = first + second;
        callbacks(s)
    }, 2000);

    return first + second
}

console.log(add(1, 2, (data) => console.log(data)))