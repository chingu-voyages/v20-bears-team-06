import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { FOLLOWER_IDS , GET_PROFILE } from './Queries';




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


