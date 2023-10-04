"use client";

import { scrapeAndStoreProduct } from '@/lib/actions';
import React, { FormEvent } from 'react'
import { useState } from 'react'

const isValidAmazonProductURL = (url: string) => {
        try {
            const parsedURL = new URL(url);
            const hostname = parsedURL.hostname;

            // Check if the hostname is amazon
            if (hostname.includes('amazon.com') || hostname.includes('amazon.') || hostname.includes('amazon')) {
                return true;
            }
        } catch (error) {
            console.log(error);
            return false;
        }

        return false;
}

const Searchbar = () => {
    const [searchPrompt, setSearchPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const isValidLink = isValidAmazonProductURL(searchPrompt);
        
        if(!isValidLink) {
            return alert('Please provide a valid amazon link');
        }

        try{
            setIsLoading(true);

            //scraper code here
            const product = await scrapeAndStoreProduct(searchPrompt);
            console.log(product);
        } catch(error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form 
            className='flex flex-wrap gap-4 mt-12' 
            onSubmit={handleSubmit}
        > 
            <input 
                type="text" 
                value={searchPrompt}
                onChange={(e) => setSearchPrompt(e.target.value)}
                placeholder='Enter product link' 
                className='searchbar-input'
            />

            <button 
                type='submit' 
                disabled={searchPrompt === ''} 
                className='searchbar-btn'
            >
                {isLoading ? 'Searching...' : 'Search'}
            </button>
        </form>
    )
}

export default Searchbar