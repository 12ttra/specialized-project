import React from 'react'
import { Link } from 'react-router-dom'
import '../../App.css'
const Sidebar = () => {
    return (
        <div className="sidebar-wrapper mg-top">
            <nav id="sidebar" className='mg-top'>
                <ul className="list-unstyled components">
                    <li>
                        <Link to="/dashboard"><i className="fa fa-tachometer"></i> Overview</Link>
                    </li>
                    <li>
                        <Link to="/admin/products"><i
                            className="fa fa-product-hunt"></i> Products Management</Link>
                    </li>

                    <li>
                        <Link to="/admin/orders"><i className="fa fa-shopping-basket"></i>Orders Management</Link>
                    </li>

                    <li>
                        <Link to="/admin/users"><i className="fa fa-users"></i> Users Management</Link>
                    </li>

                    <li>
                        <Link to="/admin/reviews"><i className="fa fa-star"></i>Comments Management</Link>
                    </li>

                </ul>
            </nav>
        </div>
    )
}

export default Sidebar
