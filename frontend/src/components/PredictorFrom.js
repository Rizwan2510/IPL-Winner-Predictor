import React, { useState } from 'react';

const teams = ['CSK', 'MI', 'RCB', 'GT', 'RR', 'KKR', 'SRH', 'DC'];
const venues = ['Wankhede Stadium', 'Eden Gardens', 'M. Chinnaswamy Stadium', 'Narendra Modi Stadium'];

export default function PredictorForm() {
  const [form, setForm] = useState({
    team1: '', team2: '', batFirst: '',
    venue: '', totalRunsTeam1: '', totalRunsTeam2: '',
    economyRate: '', strikeRate: ''
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:8080/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    const data = await response.json();
    setResult(data);
  };

  return (
    <form className="predictor-form" onSubmit={handleSubmit}>
      <h2>🏏 IPL Win Predictor</h2>

      <label>Team 1:</label>
      <select name="team1" value={form.team1} onChange={handleChange}>
        <option value="">Select Team</option>
        {teams.map(t => <option key={t} value={t}>{t}</option>)}
      </select>

      <label>Team 2:</label>
      <select name="team2" value={form.team2} onChange={handleChange}>
        <option value="">Select Team</option>
        {teams.map(t => <option key={t} value={t}>{t}</option>)}
      </select>

      <label>Batting First:</label>
      <select name="batFirst" value={form.batFirst} onChange={handleChange}>
        <option value="">Select Team</option>
        <option value={form.team1}>{form.team1 || 'Team 1'}</option>
        <option value={form.team2}>{form.team2 || 'Team 2'}</option>
      </select>

      <label>Venue:</label>
      <select name="venue" value={form.venue} onChange={handleChange}>
        <option value="">Select Venue</option>
        {venues.map(v => <option key={v} value={v}>{v}</option>)}
      </select>

      <button type="submit">Predict Winner</button>

      {result && (
        <div className="result-box">
          <h3>Prediction Result 🎯</h3>
          <p>{form.team1}: {result.team1_win_prob}%</p>
          <p>{form.team2}: {result.team2_win_prob}%</p>
        </div>
      )}
    </form>
  );
}
