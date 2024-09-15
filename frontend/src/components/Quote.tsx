import { useState, useEffect } from 'react';
import axios from 'axios';
import { ClipLoader } from 'react-spinners'; // Import a spinner from react-spinners

export const Quote = () => {
    const [quote, setQuote] = useState<string>('');
    const [author, setAuthor] = useState<string>('');
    const [designation, setDesignation] = useState<string>('Author');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true); // Loading state

    useEffect(() => {
        const fetchQuote = async () => {
            setLoading(true); // Set loading to true when fetch starts
            try {
                const apiKey = import.meta.env.VITE_API_KEY; // Ensure this is correctly set in .env file
                const category = 'learning'; // Modify category if needed
                const response = await axios.get(`https://api.api-ninjas.com/v1/quotes?category=${category}`, {
                    headers: {
                        'X-Api-Key': apiKey,
                    },
                });
                
                if (response.data && response.data.length > 0) {
                    const quoteData = response.data[0];
                    setQuote(quoteData.quote);
                    setAuthor(quoteData.author);
                    setDesignation('Author');
                } else {
                    setError('No quotes found.');
                }
            } catch (error: unknown) {
                console.error('Error fetching quote:', error);
                if (axios.isAxiosError(error)) {
                    // Type guard for AxiosError
                    console.error('Response data:', error.response?.data);
                    console.error('Response status:', error.response?.status);
                    setError('Failed to fetch quote. Please try again later.');
                } else if (error instanceof Error) {
                    // Handle other types of errors
                    console.error('Error message:', error.message);
                    setError('Error in sending request.');
                } else {
                    // Handle unknown error type
                    setError('An unknown error occurred.');
                }
            } finally {
                setLoading(false); // Set loading to false when fetch completes
            }
        };

        fetchQuote();
    }, []);

    return (
        <div className="bg-slate-200 h-screen flex justify-center flex-col items-center">
            <div className="flex justify-center">
                <div className="max-w-lg">
                    {loading ? (
                        <div className="flex justify-center items-center h-screen">
                            <ClipLoader color="#4A90E2" size={50} />
                        </div>
                    ) : error ? (
                        <div className="text-red-500">{error}</div>
                    ) : (
                        <>
                            <div className="text-3xl font-bold">
                                "{quote}"
                            </div>
                            <div className="max-w-md text-xl font-semibold text-left mt-4">
                                {author}
                            </div>
                            <div className="max-w-md text-sm font-light text-slate-400">
                                {designation}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
