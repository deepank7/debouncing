import React, { useState, useCallback } from 'react';
import debounce from 'lodash.debounce';

export default function App() {
  const [value, setValue] = useState('');
  const [dbValue, saveToDb] = useState(''); // would be an API call normally

  const debouncedSave = useCallback(
    debounce(nextValue => saveToDb(nextValue), 1000),
    [], // will be created only once initially
  );

  const handleChange = event => {
    const nextValue = event.target.value;
    setValue(nextValue);
    // const debouncedSave = debounce(() => saveToDb(nextValue), 1000);
    debouncedSave(nextValue);
  };

  return (
    <main>
      <h1>Blog</h1>
      <textarea value={value} onChange={handleChange} rows={5} cols={50} />
      <section className="panels">
        <div>
          <h2>Editor (Client)</h2>
          {value}
        </div>
        <div>
          <h2>Saved (DB)</h2>
          {dbValue}
        </div>
      </section>
    </main>
  );
}