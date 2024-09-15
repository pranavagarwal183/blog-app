import { useState,useEffect } from "react";
import axios from "axios";

export const Quote = () => {
    const [quote, setQuote] = useState('');
    const [author, setAuthor] = useState('');
    const [designation, setDesignation] = useState('');

    useEffect(() => {
        const fetchQuote = async () => {
            try {
                const response = await axios.get('https://api.api-ninjas.com/v1/quotes?category=happiness');
                setQuote(response.data.quote);
                setAuthor(response.data.author);
                // If the API doesn't provide a designation, you can set it manually
                setDesignation('Author'); 
            } catch (error) {
                console.error('Error fetching quote:', error);
            }
        };

        fetchQuote();
    }, []);

    return (
        <div className="bg-slate-200 h-screen flex justify-center flex-col">
            <div className="flex justify-center">
                <div className="max-w-lg">
                    <div className="text-3xl font-bold">
                        "{quote}"
                    </div>
                    <div className="max-w-md text-xl font-semibold text-left mt-4">
                        {author}
                    </div>
                    <div className="max-w-md text-sm font-light text-slate-400">
                        {designation}
                    </div>
                </div>
            </div>
        </div>
    );
}