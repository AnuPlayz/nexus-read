import fetch from 'node-fetch';

const Credentials = {
    Api_Key: "acc_b3428e5d25e781b",
    Api_Secret: "76932334eddda394eed49d2ea8b18c7b",
    Authorization: "Basic YWNjX2IzNDI4ZTVkMjVlNzgxYjo3NjkzMjMzNGVkZGRhMzk0ZWVkNDlkMmVhOGIxOGM3Yg==",
}
const BASE_URL = "https://api.imagga.com/v2/tags?image_url=";

export const loadTags = async (imageUrl: string) => {
    const URL = BASE_URL + encodeURIComponent(imageUrl);

    const response = await fetch(URL, {
        headers: {
            'Authorization': Credentials.Authorization,
        }
    })

    const data = await response.json() as any;
    const tags = data.result.tags.map((_d: any) => _d.confidence > 50 ? _d.tag.en : null).filter((d: any) => d !== null);

    return tags;
}