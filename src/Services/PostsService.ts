import { Post } from "../Models/Post";
import moment from 'moment';
import { MarkdownEditor } from "../Utils/MarkdownEditor";
import { PageURL } from "../Pages/PagesURL";


export class PostsService {
    private basePath: string;
    constructor() {
        this.basePath = PageURL.getURL("Assets");
    }
    
    private BuildPost(postId: string, markdownBody: string) : Post {
        const markEditor = new MarkdownEditor(markdownBody);

        const elTitle = markEditor.getElement('startsWith', "#");
        const elDescription = markEditor.getElement('startsWith', "Description:");
        const elTags = markEditor.getElement('startsWith', "Tags:");
        const elCreationDate = markEditor.getElement('startsWith', "Created:");


        const tags = elTags?.value?.split(",").map(it => it.trim());
        const creationDate = moment(elCreationDate.value, ["dd/MM/YYYY"]).toDate();

        markEditor.hiddenLines = [
            elTitle.index,
            elDescription.index,
            elTags.index,
            elCreationDate.index
        ];

        const post : Post = {
            Title: elTitle ? elTitle.value : postId.replaceAll("_", " "),
            Description: elDescription?.value,
            Name: postId,
            MarkdownBody: markEditor.toString(),
            CoverURL: '',
            Tags: tags,
            CreationDate: creationDate
        };

        return post;
    }

    async getLatestPosts(): Promise<Post[]> 
    {
        var articlesResponse = await fetch(`${this.basePath}/articles.json`);
        var articles: string[] = await articlesResponse.json();

        return this.fetchPosts(...articles);
    }

    async getPost(postId: string) {
        const posts = await this.fetchPosts(postId);
        return posts.length > 0 ? posts[0] : undefined;
    }

    private async fetchPosts(...postList: string[]){
        const posts: Post[] = [];

        for(const folderName of postList)
        {
            const articleBasePath = `${this.basePath}/${folderName}`
            var articleResponse = await fetch(`${articleBasePath}/index.md`);
            var markdownBody = await articleResponse.text();

            posts.push(this.BuildPost(folderName, markdownBody));
        }

        return posts;
    }
}