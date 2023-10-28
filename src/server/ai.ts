import fetch from 'node-fetch';

const Credentials = {
    Api_Key: "acc_b3428e5d25e781b",
    Api_Secret: "76932334eddda394eed49d2ea8b18c7b",
    Authorization: "Basic YWNjX2IzNDI4ZTVkMjVlNzgxYjo3NjkzMjMzNGVkZGRhMzk0ZWVkNDlkMmVhOGIxOGM3Yg==",
}
const BASE_URL = "https://api.imagga.com/v2/categories/nsfw_beta?image_url=";

export const isNFSWPages = async (links: string[]): Promise<boolean> => {
    let realNFSW = false;
    for (const link of links) {
        const real = await isNFSW(link);
        if (real) {
            realNFSW = true;
            break;
        }
    }
    return realNFSW;
}

export const isNFSW = async (link: string) => {
    const url = BASE_URL + link;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': Credentials.Authorization
        }
    });
    const data = await response.json() as {
        result: {
            categories: {
                confidence: number,
                name: {
                    en: string
                }
            }[]
        }
    };

    const safeCategory = data.result.categories.find(category => category.name.en === "safe");
    if (safeCategory && safeCategory.confidence > 80) {
        return false;
    }

    return true;
}