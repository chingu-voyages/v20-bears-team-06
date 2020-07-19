import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_ME } from '../graphql/Queries';



export const useMeId = () =>{
    const { data, loading, error } = useQuery(GET_ME);
    if (error){
        console.log(error);
    }

    if (!loading&&data){
        if (data.me){
            return data.me.id;
        }
    }
};