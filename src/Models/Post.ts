import { prototype } from "events"
import { PostCard } from "../Pages/PostsPage/PostCard/PostCard"

export interface Post {
    Title: string,
    Tags: string[],
    Description: string,
    CreationDate: Date,
    CoverURL: string;

    MarkdownBody: string;
    Name: string;
}