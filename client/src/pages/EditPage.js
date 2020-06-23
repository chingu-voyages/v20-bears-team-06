import React from 'react';
import ProfileInfo from '../components/ProfileInfo';
import { EditForm } from '../components/EditForm';

import './profilepage.scss';
import './editpage.scss';

const EditPage = (props) =>{


    return (
        <div className='main-content'>
           
            <EditForm />
            

        </div>
    )
}


export default EditPage;