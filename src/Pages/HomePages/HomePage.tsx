
import React from 'react';
import { Navbar } from './Navbar/Navbar';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { PostsPage } from '../PostsPage/PostsPage';
import { PostView } from '../PostView/PostView';
import { ListPostProvider } from '../../Context/ListPostContext';
  

export function HomePage() : JSX.Element {

    return(
        <>
            <BrowserRouter>
                <Navbar/>
                <ListPostProvider>
                    <div id="app" className="container p-2">
                        <Switch>
                            <Route path="/posts/:postId">
                                <PostView/>
                            </Route>
                            <Route path="/">
                                <PostsPage key={1}/>
                            </Route>
                        </Switch>
                    </div>
                </ListPostProvider>
            </BrowserRouter>
        </>
    );
}