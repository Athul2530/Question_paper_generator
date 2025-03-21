import React, { useState } from 'react';

const DefinePatterns = () => {
  const [pattern, setPattern] = useState("");

  const handleSavePattern = () => {
    if (pattern.trim()) {
      alert(`Pattern "${pattern}" saved successfully!`);
      setPattern("");
    } else {
      alert("Please enter a pattern.");
    }
  };

  const styles = {
    container: {
      padding: '30px',
      textAlign: 'center',
    },
    card: {
      background: 'white',
      padding: '20px',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      maxWidth: '400px',
      margin: 'auto',
    },
    input: {
      padding: '10px',
      margin: '10px 0',
      width: '100%',
      border: '1px solid #ccc',
      borderRadius: '6px',
    },
    button: {
      background: '#28a745',
      color: 'white',
      border: 'none',
      padding: '10px 15px',
      borderRadius: '6px',
      cursor: 'pointer',
      marginTop: '10px',
    },
  };

  return (
    <div style={styles.container}>
      <h1>📑 Define Patterns</h1>
      <div style={styles.card}>
        <input 
          type="text" 
          placeholder="Enter question paper pattern" 
          value={pattern} 
          onChange={(e) => setPattern(e.target.value)} 
          style={styles.input} 
        />
        <button onClick={handleSavePattern} style={styles.button}>Save Pattern</button>
      </div>
    </div>
  );
};

export default DefinePatterns;
