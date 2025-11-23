import { useState, useEffect } from 'react';

const useExample = (initialValue) => {
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        // Example effect: log value changes
        console.log('Value changed:', value);
    }, [value]);

    const updateValue = (newValue) => {
        setValue(newValue);
    };

    return [value, updateValue];
};

export default useExample;