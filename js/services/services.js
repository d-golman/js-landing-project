'use strict';

const postData = async (url, data) => {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });
    return await res.json();
};

const getData = async (url) => {
    const data = await fetch(url, {
        method: "GET"
    });
    if (!data.ok) {
        throw new Error(`Couldn't fetch from ${url}, status ${data.status}`);
    }
    return await data.json();
};

export {postData,getData};