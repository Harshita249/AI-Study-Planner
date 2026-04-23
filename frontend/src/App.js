import React, { useState } from 'react';
import InputForm from './components/InputForm';
import './App.css';

function App() {
  const [results, setResults] = useState(null);

  // Score ke basis par Category aur Color decide karne wala function
  const getCategoryInfo = (score) => {
    if (score >= 90) return { label: "Excellent", color: "#00ff88" };
    if (score >= 75) return { label: "Good", color: "#00d2ff" };
    if (score >= 50) return { label: "Average", color: "#f1c40f" };
    return { label: "Needs Focus", color: "#ff4d4d" };
  };

  const category = results ? getCategoryInfo(results.score) : null;

  return (
    <div className="main-container">
      <div className="content-wrapper">
        <InputForm setResults={setResults} />
        
        {results && (
          <div className="results-container">
            {/* 1. Sabse pehle text */}
            <p className="performance-label">Predicted Performance</p>
            
            {/* 2. Uske neeche Score Value */}
            <h1 className="score-val" style={{ color: category.color }}>
                {results.score}%
            </h1>
            
            {/* 3. Category Badge */}
            <div className="category-badge" style={{ 
              borderColor: category.color, 
              color: category.color,
              backgroundColor: `${category.color}15` 
            }}>
                {category.label}
            </div>

            {/* 4. Logic: Agar Excellent (90+) hai to Improvement box mat dikhao */}
            {category.label !== "Excellent" && (
              <div className="insight-card">
                <span className="insight-title">Area of Improvement</span>
                <p>{results.improvement_area}</p>
              </div>
            )}

            {/* 5. Expert Tip (Humesha dikhega) */}
            <div className="insight-card">
              <span className="insight-title">Expert Tip</span>
              <p>{results.expert_tip}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;