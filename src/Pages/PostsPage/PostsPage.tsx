import React, { useContext, useEffect } from 'react'
import { Loading } from '../../Components/Loading/Loading';
import { ListPostContext } from '../../Context/ListPostContext';
import { PostCard } from './PostCard/PostCard';

export function PostsPage() : JSX.Element {
    const { postList, refresh, isLoading } = useContext(ListPostContext);

    useEffect(() => { refresh(true) }, [refresh, postList]);

    return(
        <div className="columns is-multiline">
            <Loading IsLoading={isLoading}/>
            {
                postList.map((it, i) => (
                <div key={i} className="column is-6">
                    <PostCard PostCard={it}/>
                </div>
                ))
            }
        </div>
    );
}