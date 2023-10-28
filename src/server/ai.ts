import fetch from 'node-fetch';

const Credentials = {
    Api_Key: "acc_b3428e5d25e781b",
    Api_Secret: "76932334eddda394eed49d2ea8b18c7b",
    Authorization: "Basic YWNjX2IzNDI4ZTVkMjVlNzgxYjo3NjkzMjMzNGVkZGRhMzk0ZWVkNDlkMmVhOGIxOGM3Yg==",
}

const imageUrl = 'https://docs.imagga.com/static/images/docs/sample/japan-605234_1280.jpg';
const URL = "https://api.imagga.com/v2/tags?image_url=" + encodeURIComponent(imageUrl);

const loadTags = async () => {
    const response = await fetch(URL, {
        headers: {
            'Authorization': Credentials.Authorization,
        }
    });
    const data = await response.json();
    console.log(data);
}

loadTags();