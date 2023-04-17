import axios from "axios";
import { useEffect } from "react";

const Index = () => {
    useEffect(async () => {
        const response = await axios.get('/api/films/getallfilms')
    }, [])

    return (
        <div>
            test
        </div>
    );
}

export default Index;


