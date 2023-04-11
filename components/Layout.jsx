import Header from "./Header";

const Layout = (props) => {
    const {children} = props
    return (
        <div className="flex flex-col min-h-screen gap-y-5 bg-gradient-to-r from-violet-500 to-purple-500 ">
            <Header></Header>
            <main className="sm:px-10 md:px-16 xl:px-72 text-white flex justify-center flex-1">{children}</main>
        </div>
    );
}

export default Layout;
