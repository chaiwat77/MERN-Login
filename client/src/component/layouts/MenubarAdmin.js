import React from 'react'
import { Link } from 'react-router-dom'

const MenubarAdmin = () => {
    return (
        <nav>
            <ul class="nav flex-column">
                <li class="nav-item">
                    <Link to="/admin/index">
                        Dashboard
                    </Link>   
                </li>
                <li class="nav-item">
                    <Link to='/admin/manage-admin'>
                        จัดการ user
                    </Link>      
                </li>
            </ul>
        </nav>
    
    )
}




export default MenubarAdmin