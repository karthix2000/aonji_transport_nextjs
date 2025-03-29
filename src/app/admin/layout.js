
import AdminHeader from '../../components/AdminHeader.jsx'

export default function AdminLayout({ children }) {
    return (

        <>
        <AdminHeader/>
        
    <main>{children}</main>

        </>
)
}

