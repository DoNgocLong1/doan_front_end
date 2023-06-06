import React from 'react';

const Notification = ({ isActive, headerText, mainContent, buttonText, href, onClick }: any) => {
  return (
    <>
      <div className={`coating ${isActive && 'active'}`}></div>
      <div className={`notification flex-column ${isActive && 'active'}`}>
        <p className="notification-header">{headerText}</p>
        <p>{mainContent}</p>
        {href ? (
          <a href={href} title={buttonText}>
            <button>{buttonText}</button>
          </a>
        ) : (
          <button onClick={onClick}>{buttonText}</button>
        )}
      </div>
      <style jsx>
        {`
          .coating {
            display: none;
            position: fixed;
            z-index: 4;
            top:0;
            left:0;
            right:0;
            bottom:0;
            opacity: 0.6;
            background-color: #000;
          }
          .coating.active {
            display: block;
          }
          .notification {
            z-index: 5;
            display: flex;
            flex-direction: column;
            top: -100%;
            left: 50%;
            transform: translate(-50%, -50%);
            position: fixed;
            width: 300px;
            height: 250px;
            background-color: #fff;
            color: #000;
            align-items: center;
            justify-content: space-between;
            padding: 20px;
            transition: 0.5s;
            border-radius: 25px;
          }
          .notification p {
            padding: 0 20px;
            text-align: center;
            font-size: 1.5em;
          }
          .notification.active {
            top: 50%
          }
          .notification button {
            padding: 10px 20px;
            width: 100px;
            border: none;
            outline: none;
            color: #fff;
            font-size: 15px;
            background-color: #508cc3;
            cursor: pointer;
            border-radius: 15px;
          }
          .notification-header {
            font-weight:bold;
            font-size: 2em;
          }
        `}
      </style>
    </>
  )
}

export default Notification;
