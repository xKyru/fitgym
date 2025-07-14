import { useState, useEffect } from "react";

const useFetch = url => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);

                if(!response.ok){
                    throw new Error(`HTTP error. status: ${response.status}`);
                }

                const jsonData = await response.json();
                setData(jsonData);
                setError(null);
            } catch (error) {
                setError(error.message);
                setData([]);
            } finally{
                setLoading(false);
            }
        }
        fetchData();
    }, [url]);
    return {data, loading, error};
}

export default useFetch;