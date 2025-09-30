import { useState, useEffect } from 'react';

export function useDebounce(value, delay){
    const [debounceValue, setDebounceValue] = useState(value)

    useEffect => (()=>{
        // temp to update the value after the delay
        const handler = setTimeout (()=>{
            setDebounceValue(value);
        }, delay)

        return ()=>{
            clearTimeout(handler);
        }
    }, [value, delay]);
    
    return debounceValue;
}