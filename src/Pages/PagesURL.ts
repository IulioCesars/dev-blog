import { Configuration } from "../Configuration";

export declare type PageType = 'SearchByTag' | 'PostView' | 'BaseURL' | 'Assets'


export class PageURL {

    static getURL(page: PageType, ...args: string[]): string
    {
        const routes = {
            "SearchByTag": "",
            "PostView": "posts",
            "BaseURL": process.env.PUBLIC_URL,
            "Assets": `${process.env.PUBLIC_URL}/assets`
        }

        let pageRoute = routes[page];

        for(const a of args)
            pageRoute += '/' + a;

        return pageRoute;
    }
}