import React, { useState } from 'react'
import { Post } from '../Models/Post';
import { PostsService } from '../Services/PostsService';

export const ListPostContext = React.createContext({
    postList: new Array<Post>(),
    isLoading: false,
    refresh: async (force: boolean) => {},
    getPost: async (postId: string) : Promise<Post | undefined> => { return {} as Post  }
})

export function ListPostProvider(props: any): JSX.Element {
    const postService = new PostsService();

    const [ postList, setPostList ] = useState<Post[]>([]);
    const [ isLoading, setIsLoading ] = useState(false);
    const refresh = async (force: boolean) => {
        if(postList.length > 0 || !force)
            return;

        try
        {
            setIsLoading(true);

            const listPost = await postService.getLatestPosts();
            setPostList(listPost);
        }
        catch(ex)
        { console.error(ex); }
        finally 
        { setIsLoading(false); }
    };
    const getPost = async (postId: string) => {
        const cachePost = postList.find(it => it.Name = postId);

        return cachePost ? cachePost : postService.getPost(postId);
    }

    return(
        <ListPostContext.Provider value={{postList, isLoading, refresh, getPost}}>
            {props.children}
        </ListPostContext.Provider>
    );
} 