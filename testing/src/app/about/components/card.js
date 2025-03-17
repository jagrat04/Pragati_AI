import React from "react";

const MemberCard = ({ name, role, image, linkedin, github }) => {
  return (
    <div className="card">
      <img src={image} alt={name} className="profile-pic" />
      <h1 className=" text-black">{name}</h1>
      <h2 className=" text-black ">{role}</h2>
      <div className="social-links">
        {linkedin && (
          <a href={linkedin} target="_blank">
            LinkedIn
          </a>
        )}
        {github && (
          <a href={github} target="_blank">
            GitHub
          </a>
        )}
      </div>
    </div>
  );
};

export default MemberCard;
