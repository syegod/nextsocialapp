import { useRouter } from "next/router";
import axios from "axios";

const Profile = () => {
    const router = useRouter()
    const {uid} = router.query
    return (
        <div>
            {uid}
        </div>
    );
}

export default Profile;
