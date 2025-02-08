import React, { useEffect } from 'react';

const TawkTo = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://embed.tawk.to/66be1f9b146b7af4a43adaab/1i5bamucu';
    script.charset = 'UTF-8';
    script.async = true;
    script.setAttribute('crossorigin', '*');
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
};

export default TawkTo;
