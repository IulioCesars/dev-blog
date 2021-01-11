import React, { useContext, useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import { ListPostContext } from '../../Context/ListPostContext';
import { Post } from '../../Models/Post';
import gfm from 'remark-gfm'
import { PageURL } from '../PagesURL';
import { TaskList } from '../../Components/TagList/TagList';
import { Configuration } from '../../Configuration';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import * as CodeTheme from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Loading } from '../../Components/Loading/Loading';



export function PostView(): JSX.Element {
    const { getPost } = useContext(ListPostContext);
    const [ post, setPost ] = useState<Post>();
    const [ isLoading, setIsLoading ] = useState(false);
    const { postId } = useParams<{postId: string}>();
    const dateString = Configuration.GetDateInDefaultFormat(post?.CreationDate ?? new Date());

    const renderers = {
        code: (parameters: any) => {
            const { language, value } = parameters;
            return <SyntaxHighlighter style={CodeTheme.darcula} language={language} children={value} />
        }
    }

    const transformImageUri = (it: string) => {
        if(!post)
            return "";

        return PageURL.getURL("Assets", post.Name, it);
    }

    useEffect(() => { 
        const fetchPost = async () => {
            setIsLoading(true);

            const post = await getPost(postId);
            setPost(post);

            setIsLoading(false);
        }
        fetchPost();    
    }, [getPost, postId]);

    return(
        <div className="container is-max-widescreen">
            <div className="card">
                <Loading IsLoading = {isLoading} />
                <div className="card-content">
                    <p className="title">
                        {post?.Title}
                    </p>
                    <div className="columns mb-0">
                        <TaskList className="column is-10 m-0 pt-0 pb-0" tags={post?.Tags ?? []} />
                        <div className="column is-2 pt-0 pb-1">
                            <b className="level-right" >{dateString}</b>
                        </div>
                    </div>
                    <br></br>
                    <div className="content">
                        <ReactMarkdown linkTarget="_blank" 
                        renderers={renderers} 
                            transformImageUri={it => transformImageUri(it) } 
                            plugins={[gfm]} >
                            {post?.MarkdownBody ?? '' }
                        </ReactMarkdown>
                    </div>
                </div>
            </div>
        </div>
    );
}