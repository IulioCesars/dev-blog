import React from 'react';
import { Post } from '../../../Models/Post';
import './PostCard.css'
import { PageURL } from '../../PagesURL';
import { Link } from 'react-router-dom';
import { TaskList } from '../../../Components/TagList/TagList';
import { Configuration } from '../../../Configuration';

export declare type PostCardProps = {
    PostCard: Post
};

export function PostCard(props: PostCardProps) : JSX.Element {
    const postCard = props.PostCard;

    const imageStyle = {
        backgroundImage: `url(${postCard.CoverURL})`, 
        backgroundPosition: 'center', 
        backgroundSize: 'cover' 
    };

    const dateString = Configuration.GetDateInDefaultFormat(postCard.CreationDate);
    const hideImage = (postCard.CoverURL || '').length === 0;

    const cardContentClass = `is-${hideImage ? 12 : 6}`;
    const cardImageClass = `is-${hideImage ? 0 : 6} ${hideImage ? 'is-hidden': ''}`;

    return(
        <div className="card">
            <div className="columns m-0">
                <div className={`column ${cardImageClass} p-0`}>
                    <div className="card-image is-hidden-touch" style={imageStyle} />
                    <div className="card-image is-hidden-desktop" >
                        <img src={postCard.CoverURL} alt={postCard.Title} height='100%' />
                    </div>
                </div>
                <div className={`column ${cardContentClass} p-0`}>
                    <div className="card-content p-2 pr-3">
                        <div className="content p-2 mb-0">
                            <Link to={PageURL.getURL('PostView', postCard.Name)} className="title is-4">
                                {postCard.Title}
                            </Link>
                            <TaskList className="pt-2 is-6" tags={postCard.Tags} />
                        </div>
                        <div className="content p-2 card-description card-description-desktop is-hidden-touch" >
                            {postCard.Description}
                        </div>
                        <div className="content p-2 card-description is-hidden-desktop" >
                            {postCard.Description}
                        </div>
                        <div className="pt-1">
                            <b className="level-right" >{dateString}</b>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}