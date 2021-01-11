import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Configuration } from '../../../Configuration';

export function Navbar() : JSX.Element {
    const [isActive, setIsActive] = useState(false);
    const pageConfig = Configuration.GetPageConfiguration();


    return(
        <nav className="navbar is-dark is-fixed-top" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <Link className="navbar-item" to={pageConfig.DefaultPath}>
                    <b>{pageConfig.PageName}</b>
                </Link>

                <div role="button" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample"
                    onClick={() => setIsActive(!isActive) }
                    className={`navbar-burger burger ${isActive ? 'is-active' : ''}`}>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </div>
            </div>

            <div id="navbarBasicExample" className={`navbar-menu is-dark ${isActive ? 'is-active' : ''}`}>
                <div className="navbar-start">
                    {/* <a className="navbar-item">About</a> */}
                </div>

                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                            {
                                pageConfig.Accounts?.map((it, i) => 
                                    (
                                    <a key={i} target="_blank" rel="noreferrer" href={it.Url} className="button" style={{ border: 0, backgroundColor: it.BackgroundColor, color: it.FontColor}}>
                                        <b> {it.Name} </b> 
                                    </a>
                                    )
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}