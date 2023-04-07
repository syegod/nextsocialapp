import { useRouter } from "next/router";
import axios from "axios";

const Profile = () => {
    const router = useRouter()
    const {uid} = router.query
    return (
        <div className="bg-white text-violet-600 text-center p-5 max-w-max">
            {uid}
        </div>
    );
}

export default Profile;
