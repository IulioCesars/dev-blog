
export declare type PageType = 'SearchByTag' | 'PostView' | 'Local' | 'Assets'


export class PageURL {
    static getURL(page: PageType, ...args: string[]): string
    {
        const routes = {
            "SearchByTag": "",
            "PostView": "posts",
            "Local": window.location.origin,
            "Assets": `${window.location.origin}/assets`
        }

        let pageRoute = routes[page];

        for(const a of args)
            pageRoute += '/' + a;

        return pageRoute;
    }
}