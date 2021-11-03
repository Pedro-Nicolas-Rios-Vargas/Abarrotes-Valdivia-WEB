function makeCancelable() {
    let hasCanceled_ = false;
    let request = {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            mensaje: "Hoal",
        })
    };

    const promise = fetch('/socket/barcode-request', request);

    const wrappedPromise = new Promise((resolve, reject) => {
        promise
            .then((response) => {
                hasCanceled_ ? reject({isCanceled: true}) : resolve(response);
            })
            .catch((error) => {
                hasCanceled_ ? reject({isCanceled: true}) : reject(error);
            });
    });

    return {
        promise: wrappedPromise,
        cancel() {
            hasCanceled_ = true;
        }
    }
}

export default makeCancelable;
