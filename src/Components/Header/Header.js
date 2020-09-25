import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../../App';
import './Header.css';

const Header = (props) => {
    const history = useHistory();

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const toLogin = () =>{
        history.push(`/login`);
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark">
            <img src="https://iili.io/2nXeCg.png" alt="" className="navbar-brand" />
            <button onClick={() => props.handleNavCollapsed()} className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className={(props.navCollapsed ? "collapse" : "") + ' navbar-collapse navbar-dark ml-auto'} id="navbarTogglerDemo02">
                <form className="form-inline my-2 my-lg-0 mr-auto">
                    <input className="form-control mr-sm-2 bg-dark text-white" type="search" placeholder="Search your destination" />
                </form>
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">News <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Destination</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Blog</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Contact</Link>
                    </li>
                    {
                        loggedInUser.isSignedIn
                        ?<li className="nav-item">
                            <Link className="nav-link text-warning" to="/">{loggedInUser.firstName || loggedInUser.email}</Link>
                        </li>
                        :<button onClick={toLogin} className="btn btn-warning" >Login</button>
                    }
                    {loggedInUser.isSignedIn && <button onClick={() => setLoggedInUser({})} className="loginBtn" >Logout</button>}
                </ul>

            </div>
        </nav>
    );
};

export default Header;