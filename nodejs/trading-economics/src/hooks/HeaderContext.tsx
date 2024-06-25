import { Dispatch, SetStateAction, createContext, useContext } from 'react';

const headerContext = createContext<{ title: string; setTitle: Dispatch<SetStateAction<string>>; } | undefined>(undefined);
const useHeaderContext = () => {
    const header = useContext(headerContext);
    if (header === undefined) throw new Error('useHeaderContext must be used with a headerContext.');
    return header;
};

export {
    headerContext,
    useHeaderContext
};
