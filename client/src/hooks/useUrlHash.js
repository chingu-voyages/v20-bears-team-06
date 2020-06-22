import { useLocation } from 'react-router-dom';

export function useUrlHash(){
    return useLocation.hash();
}