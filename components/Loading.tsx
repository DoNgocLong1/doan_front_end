import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

interface LoadingProps {
  loading: boolean;
}

const Loading = ({ loading }: LoadingProps) => {
  const router = useRouter();
  if (router.pathname === '/product') {
    return (
      <></>
    )
  }
  return (
    <>
      <div className="loading">
        <div className="image-container">
          <Image src="/loading.png" width="200" height="200" alt="loading" loading="eager" />
          <div className="image-placeholder"></div>
        </div>
      </div>
      <style jsx>
        {`
          .loading {
            position: fixed;
            width: 100vw;
            height: 100vh;
            background: rgba(12, 11, 11, 0.5);
            display: ${loading ? 'flex' : 'none'};
            top: 0;
            left: 0;
            align-items: center;
            justify-content: center;
            z-index: 9999;
          }
          .image-container {
            position: relative;
            width: 200px;
            height: 200px;
          }

          .image-placeholder {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
          }

          .image-placeholder::before {
            content: "";
            display: block;
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(to right, transparent 0%, rgba(255, 255, 255, 0.5) 50%, transparent 100%);
            animation: loading 1s linear infinite;
          }

          @keyframes loading {
            from {
              left: -100%;
            }
            to {
              left: 100%;
            }
          }

          @keyframes wave {
            0% {
              transform: skewX(-15deg) translateX(-75%);
            }
            50% {
              transform: skewX(15deg) translateX(75%);
            }
            100% {
              transform: skewX(-15deg) translateX(-75%);
            }
          }
        `}
      </style>
    </>
  );
};

export default Loading;
