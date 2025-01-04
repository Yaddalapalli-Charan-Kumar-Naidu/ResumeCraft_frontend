import React from "react";


export default function Navbar() {

  const navbarLinks=["Home","about","login/signup"];
  return (
    <div className="flex items-center text-center justify-between border-lg mx-5 my-2 shadow-xl hover:shadow-2xl rounded-lg hover:scale-120 ">
      <div className="flex gap-2 items-center">
        <img src="logo.webp" alt="ResumeCraft Logo" width="60rem" className="rounded-full hover:scale-[110%] cursor-pointer m-2"></img>
        <a href="/" className="text-lg">ResumeCraft</a>
      </div>
      <div style={{height:"100%"}}>
        <ul className="flex items-center space-x-4">
          {navbarLinks.map((item,index)=>(
            <li key={index} className="p-2 text-center">
              <a href={`/${item.toLowerCase().split("/")[0]}`} className="hover:text-blue-500">{item}</a>
              </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
