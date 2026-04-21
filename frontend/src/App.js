import React, { useState } from 'react';
import './App.css';
import InputForm from './components/InputForm';

function App() {
  const [report, setReport] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  return (
    <div className="App">
      <h2 style={{textAlign: 'center', marginBottom: '2rem'}}>Predictor <span className="status-warning">AI</span></h2>
      
      <InputForm setReport={setReport} setIsProcessing={setIsProcessing} isProcessing={isProcessing} />

      {report && !isProcessing && (
        <div className="report-card">
          <div className="score-display">
            <div className={`status-pill ${report.visual.pClass}`}>{report.visual.pLabel}</div>
            <div className={`score-visualizer ${report.visual.pClass}`}>{report.score}%</div>
          </div>
          
          <div className="insights-list">
            {report.insights.map((msg, i) => (
              <div key={i} className="insight-item">
                <strong>Insight {i+1}:</strong> {msg}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;