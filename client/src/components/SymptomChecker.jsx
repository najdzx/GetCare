import React, { useState } from 'react';

const SymptomChecker = () => {
  const [symptoms, setSymptoms] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult('');
    try {
      const res = await fetch('/api/symptom-checker', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symptoms }),
      });
      const data = await res.json();
      if (data.error) setError(data.error);
      else setResult(data.result);
    } catch (err) {
      setError('Failed to get advice.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="symptom-checker">
      <h2>Symptom Checker (Powered by OpenAI)</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={symptoms}
          onChange={e => setSymptoms(e.target.value)}
          placeholder="Describe your symptoms..."
          rows={4}
          style={{ width: '100%', marginBottom: 12 }}
        />
        <button type="submit" disabled={loading || !symptoms.trim()}>
          {loading ? 'Checking...' : 'Check Symptoms'}
        </button>
      </form>
      {error && <div style={{ color: 'red', marginTop: 12 }}>{error}</div>}
      {result && (
        <div style={{ marginTop: 16, background: '#f6f6f6', padding: 16, borderRadius: 8 }}>
          <strong>Advice:</strong>
          <div>{result}</div>
          <div style={{ fontSize: 12, color: '#888', marginTop: 8 }}>
            <em>This is AI-generated and not a substitute for professional medical advice.</em>
          </div>
        </div>
      )}
    </div>
  );
};

export default SymptomChecker;
