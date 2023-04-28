import Header from "./Header";
import {NotificationContainer} from 'react-notifications'

const Layout = (props) => {
    const {children} = props
    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-r from-violet-500 to-purple-600">
            <Header></Header>
            <main className="px-3 md:px-16 xl:px-72 text-white flex justify-center flex-1 relative">{children}</main>
            <NotificationContainer />
        </div>
    );
}

export default Layout;
