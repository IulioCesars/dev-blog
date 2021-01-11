declare type searchMethods = 'startsWith';

export class MarkdownEditor {
    private readonly lines: string[];
    public hiddenLines: number[];
    
    constructor(private readonly rawTextOriginal : string)
    {
        this.lines = rawTextOriginal.split('\n');
        this.hiddenLines = [];
    }

    private getToolMethods(method: searchMethods): [
        searchFunc: (text: string, searchText: string) => boolean,
        cleanText: (text : string, searchText: string) => string
     ] {
        switch(method)
        {
            case "startsWith": {
                return [
                    (text, search) => text.startsWith(search),
                    (text, search) => text.replace(search, "")
                ];
            }
            default: {
                return [(it, _)=> false, it => it];
            }
        }
    }

    public getLine(method: searchMethods, text: string): {
        index: number,
        lineText: string
    } {
        const [ searchFunc, _ ] = this.getToolMethods(method);
        const lineIndex = this.lines.findIndex(it => searchFunc(it, text));

        return {
            index: lineIndex, 
            lineText: this.lines[lineIndex]
        };
    }

    public getElement(method: 'startsWith', text: string) : {
        index: number,
        lineText: string,
        value: string
    } {
        const [ _, cleanText ] = this.getToolMethods(method);
        const { index, lineText } = this.getLine(method, text);

        return {
            index, 
            lineText, 
            value: cleanText(lineText, text)
        };
    }

    public toString(): string {
        return this.lines
            .filter((text, index) => !this.hiddenLines.some(it => it === index))
            .join("\n");
    }
}