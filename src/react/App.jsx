import React, { useState } from 'react';
import NepaliDatePicker from './NepaliDatePicker';

/**
 * Main App Sandbox interface demonstrating reactive state,
 * custom props, theme switching, and range callbacks.
 */
export default function App() {
  const [selectedDate, setSelectedDate] = useState('');
  const [rangeStart, setRangeStart] = useState(null);
  const [rangeEnd, setRangeEnd] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState('classic-light');
  const [selectedLang, setSelectedLang] = useState('ne');

  const themes = [
    'classic-light', 'classic-dark', 'nepali-red', 'ocean-blue', 'forest-green',
    'sunset-orange', 'royal-purple', 'midnight', 'glassmorphism', 'neon-cyberpunk'
  ];

  return (
    <div style={{ maxWidth: '800px', margin: '4rem auto', padding: '2rem', background: '#0f1524', borderRadius: '16px', border: '1px solid #1f293d', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
      <header style={{ borderBottom: '1px solid #1f293d', paddingBottom: '1.5rem', marginBottom: '2rem', textAlign: 'center' }}>
        <h1 style={{ margin: 0, fontSize: '2rem', fontWeight: 800, background: 'linear-gradient(135deg, #6366f1, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          React Sandbox Demos
        </h1>
        <p style={{ margin: '0.5rem 0 0', color: '#9ca3af', fontSize: '0.95rem' }}>
          Interactive React bindings workspace for Nepali DatePicker Studio.
        </p>
      </header>

      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
        <div style={{ background: '#172033', padding: '1.25rem', borderRadius: '12px', border: '1px solid #1f293d' }}>
          <h2 style={{ fontSize: '1.1rem', color: '#f3f4f6', marginTop: 0, marginBottom: '1rem' }}>Configuration Props</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', color: '#6b7280', fontWeight: 700, marginBottom: '0.5rem' }}>Visual Theme</label>
              <select 
                value={selectedTheme} 
                onChange={(e) => setSelectedTheme(e.target.value)}
                style={{ width: '100%', padding: '0.5rem', borderRadius: '8px', background: '#090d16', border: '1px solid #1f293d', color: '#f3f4f6', cursor: 'pointer' }}
              >
                {themes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', color: '#6b7280', fontWeight: 700, marginBottom: '0.5rem' }}>Language Option</label>
              <select 
                value={selectedLang} 
                onChange={(e) => setSelectedLang(e.target.value)}
                style={{ width: '100%', padding: '0.5rem', borderRadius: '8px', background: '#090d16', border: '1px solid #1f293d', color: '#f3f4f6', cursor: 'pointer' }}
              >
                <option value="ne">Nepali (नेपाली)</option>
                <option value="en">English</option>
              </select>
            </div>
          </div>
        </div>

        <div style={{ background: '#172033', padding: '1.25rem', borderRadius: '12px', border: '1px solid #1f293d', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2 style={{ fontSize: '1.1rem', color: '#f3f4f6', marginTop: 0, marginBottom: '1rem' }}>State Output Log</h2>
          <div style={{ fontSize: '0.85rem', color: '#9ca3af', lineHeight: 1.6 }}>
            <div><strong>Selected Single Date:</strong> <span style={{ color: '#10b981' }}>{selectedDate || 'None'}</span></div>
            <div style={{ marginTop: '0.5rem' }}>
              <strong>Date Range Start:</strong> <span style={{ color: '#6366f1' }}>{rangeStart ? rangeStart.formatted : 'None'}</span>
            </div>
            <div>
              <strong>Date Range End:</strong> <span style={{ color: '#a855f7' }}>{rangeEnd ? rangeEnd.formatted : 'None'}</span>
            </div>
          </div>
        </div>
      </section>

      <section style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '12px', border: '1px solid #1f293d' }}>
          <h3 style={{ fontSize: '1rem', color: '#f3f4f6', marginTop: 0, marginBottom: '0.75rem' }}>Demo 1: Single Date Selector Prop</h3>
          <NepaliDatePicker
            options={{
              theme: selectedTheme,
              lang: selectedLang,
              showAdDate: true,
              closeOnSelect: true
            }}
            value={selectedDate}
            onChange={(date) => setSelectedDate(date ? date.formatted : '')}
            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: '#090d16', border: '1px solid #1f293d', color: '#f3f4f6' }}
            placeholder="Select a date..."
          />
        </div>

        <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '12px', border: '1px solid #1f293d' }}>
          <h3 style={{ fontSize: '1rem', color: '#f3f4f6', marginTop: 0, marginBottom: '0.75rem' }}>Demo 2: Date Range Selector Mode</h3>
          <NepaliDatePicker
            options={{
              theme: selectedTheme,
              lang: selectedLang,
              mode: 'range',
              presets: true,
              showDuration: true,
              onRangeChange: (start, end) => {
                setRangeStart(start);
                setRangeEnd(end);
              }
            }}
            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: '#090d16', border: '1px solid #1f293d', color: '#f3f4f6' }}
            placeholder="Select a range..."
          />
        </div>
      </section>
    </div>
  );
}
