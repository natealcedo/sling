import React from 'react';
import md5 from 'md5';

const Avatar = ({ email, size = 40, style }) => {
  const hash = md5(email);
  const uri = `https://secure.gravatar.com/avatar/${hash}`;

  return (
    <img
      src={uri}
      alt={email}
      style={{ width: `${size}px`, height: `${size}px`, borderRadius: '4px', ...style }}
    />
  );
};

export default Avatar;