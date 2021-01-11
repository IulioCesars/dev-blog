import React from 'react'
import './Loading.css';

export function Loading(props: {IsLoading: boolean}) {
    const component = props.IsLoading ? <div className="loader"></div> : <></>;

    return(component);
}