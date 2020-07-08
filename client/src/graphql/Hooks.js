import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery , useMutation } from '@apollo/react-hooks';
import { FOLLOWER_IDS , GET_PROFILE, GET_FILES } from './Queries';
import { SET_SEEN } from './Mutations';





export async function useProfile(userId){

    const { data=null, loading, error } = useQuery(GET_PROFILE,{
        variables: {userId:userId}
    });

    if (!loading){
        if (data&&data.user){
            return data.user;
        }
    }
    

}


export function useSetSeen(notifications){
    const { data, loading } = useMutation(SET_SEEN, {
        variables:{notificationIds:notifications}
    });

    if(!loading&&data.setSeen){
        return data.setSeen;
    }
};


const useAws


