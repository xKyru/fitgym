import { Outlet, useParams } from 'react-router-dom';
import './Layout.scss';
import Sidebar from '../components/Sidebar';
import Navigation from '../components/Navigation';
import { Link } from 'react-router-dom';

const Layout = ({headerTitle, headerSubtitle, buttonText, buttonLink, buttonIcon}) => {
    const params = useParams();

    const finalLink = typeof buttonLink === 'function' 
    ? buttonLink(params.id) 
    : buttonLink;

    return(
        <div className='page-container'>
            <Sidebar></Sidebar>
            <div className='page-wrap'>
                <Navigation></Navigation>
                <main className='page-content'>
                    <div className="page-content__header">
                        <div className="page-content__header-description">
                                {headerTitle && <h1 className="page-content__header-title">{headerTitle}</h1>}
                                {headerSubtitle && <h1 className="page-content__header-subtitle">{headerSubtitle}</h1>}
                        </div>
                        {finalLink && buttonText && (
                            <Link
                                className="page-content__button"
                                to={finalLink}
                            >
                                <span className="page-content__button-icon material-symbols-outlined">{buttonIcon}</span>
                                {buttonText}
                            </Link>
                        )}

                    </div>                    
                    <Outlet />
                </main>
            </div>
        </div>
    )
}


export default Layout