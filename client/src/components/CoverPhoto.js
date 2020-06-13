import React from 'react';

function CoverPhoto(props){

    const style = {
        background: `${props.imageUrl}`,
        backgroundSize: 'cover'
    };

    return (
        <div className='cover-photo' style={style}>

        </div>
    )
};




export default CoverPhoto;