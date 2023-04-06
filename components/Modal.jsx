
const Modal = (props) => {
    const { children, setModal } = props
    return (
        <div className="flex justify-center">
            <div onClick={() => setModal(false)} className="fixed bg-black top-0 left-0 opacity-50 w-full h-full z-20">
            </div>
            <div className="fixed sm:min-w-[35ch] rounded-md bg-white z-40">
                <div className="relative flex text-2xl font-medium p-5 flex flex-col">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Modal;
