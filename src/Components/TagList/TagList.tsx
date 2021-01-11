import React from 'react';
import { Link } from 'react-router-dom';
import { PageURL } from '../../Pages/PagesURL';


export function TaskList(props: { tags: string[], className?: string }) {
    return (   
        <div className={`tags are-small ${props.className}`}>
            { props.tags.map((it, i) => (<Link key={i} to={PageURL.getURL("SearchByTag",)} className="tag is-link">{it}</Link>))}
        </div>
    );
}