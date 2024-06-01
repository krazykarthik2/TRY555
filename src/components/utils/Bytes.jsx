import React, { useEffect, useState } from 'react';

function Bytes({ value = 0 }) {
  const [bytes, setBytes] = useState(value);
  const [notation, setNotation] = useState('B');

  useEffect(() => {
    function formatBytes(value) {
      if (value < 1024) return { value, notation: 'B' };
      if (value < 1024 * 1024) return { value: (value / 1024).toFixed(2), notation: 'KB' };
      if (value < 1024 * 1024 * 1024) return { value: (value / (1024 * 1024)).toFixed(2), notation: 'MB' };
      if (value < 1024 * 1024 * 1024 * 1024) return { value: (value / (1024 * 1024 * 1024)).toFixed(2), notation: 'GB' };
      return { value: (value / (1024 * 1024 * 1024 * 1024)).toFixed(2), notation: 'TB' };
    }

    const formatted = formatBytes(value);
    setBytes(formatted.value);
    setNotation(formatted.notation);
  }, [value]);

  return (
    <span>{bytes}{notation}</span>
  );
}

export default Bytes;
