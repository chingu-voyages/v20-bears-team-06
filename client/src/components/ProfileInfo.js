import React from "react";
import CoverPhoto from "./CoverPhoto";

const ProfileInfo = (props) => {

  let profile = props.profile;
  

  return (
    <div className="profile info">
      <img className="profile image" />
      <div className="profile info-text">
        <h4>{profile?profile.name:null}</h4>
        <h6>{profile?profile.school||'add school on edit page':null}</h6>
        <h6>{profile?profile.employment||'add employment on edit page':null}</h6>
        <button className="profile button" id="follow">
          follow
        </button>
      </div>
      <CoverPhoto imageUrl={null} />
    </div>
  );
};

export default ProfileInfo;
