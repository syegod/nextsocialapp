import { AuthContext } from "@/context/authcontext";
import { useRouter } from "next/router";
import { useContext } from "react";

const Film = () => {
    const router = useRouter()
    const {fid} = router.query
    const user = useContext(AuthContext)
    return (
        <div className="flex my-auto">
            {fid}
        </div>
    );
}

export default Film;
