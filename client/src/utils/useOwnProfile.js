import React, {useEffect} from 'react';
import { useParams } from 'react-router-dom';



export const useOwnProfile = ({meId}) => {
    const { userId } = useParams();
    if (!meId){
        return false;
    }

    return meId === userId;


}