import Header from "./Header";

const Layout = (props) => {
    const {children} = props
    return (
        <div className="flex flex-col min-h-screen gap-y-5">
            <Header></Header>
            <main className="sm:px-10 md:px-72">{children}</main>
        </div>
    );
}

export default Layout;
