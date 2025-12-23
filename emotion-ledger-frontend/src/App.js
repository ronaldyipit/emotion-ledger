import React, { useEffect, useState } from "react";

const API_BASE = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

const EMOTIONS = [
  { label: "😄 開心", value: "😄" },
  { label: "😐 麻木", value: "😐" },
  { label: "😠 憤怒", value: "😠" },
  { label: "😢 內疚", value: "😢" },
  { label: "😤 壓力", value: "😤" },
  { label: "😞 後悔", value: "😞" },
];

function App() {
  const [emotion, setEmotion] = useState("");
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [analytics, setAnalytics] = useState({});

  const loadData = async () => {
    const e = await fetch(`${API_BASE}/expenses`).then((r) => r.json());
    const a = await fetch(`${API_BASE}/analytics/emotions`).then((r) =>
      r.json()
    );
    setExpenses(e);
    setAnalytics(a);
  };

  useEffect(() => {
    loadData();
  }, []);

  const submitExpense = async () => {
    if (!emotion || !amount) {
      alert("請先選情緒，再輸入金額");
      return;
    }

    await fetch(`${API_BASE}/expenses`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        emotion,
        amount: parseFloat(amount),
        reason,
      }),
    });

    setEmotion("");
    setAmount("");
    setReason("");
    loadData();
  };

  return (
    <div style={styles.container}>
      <h1>Emotion Ledger</h1>
      <p style={styles.subtitle}>
        記低你點解花錢，而唔只係花咗幾多。
      </p>

      {/* Expense Entry Card */}
      <div style={styles.card}>
        <h2>你而家嘅情緒係？</h2>

        <div style={styles.emotionGrid}>
          {EMOTIONS.map((e) => (
            <button
              key={e.value}
              onClick={() => setEmotion(e.value)}
              style={{
                ...styles.emotionBtn,
                backgroundColor:
                  emotion === e.value ? "#333" : "#f2f2f2",
                color: emotion === e.value ? "#fff" : "#000",
              }}
            >
              {e.label}
            </button>
          ))}
        </div>

        <input
          style={styles.input}
          placeholder="金額"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <input
          style={styles.input}
          placeholder="點解會洗呢筆錢？（可選）"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />

        <button style={styles.submit} onClick={submitExpense}>
          記低呢一刻
        </button>
      </div>

      {/* Emotion Analytics */}
      <div style={styles.card}>
        <h2>情緒消費概覽</h2>
        {Object.keys(analytics).length === 0 && <p>未有資料</p>}
        {Object.entries(analytics).map(([emo, data]) => (
          <p key={emo}>
            {emo} → {data.count} 次 / ${data.total}
          </p>
        ))}
      </div>

      {/* Recent Expenses */}
      <div style={styles.card}>
        <h2>最近記帳</h2>
        {expenses.slice(0, 5).map((e) => (
          <div key={e.id} style={styles.expenseRow}>
            <span>
              {e.emotion} ${e.amount}
            </span>
            <small>{e.reason}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 480,
    margin: "0 auto",
    padding: 20,
    fontFamily: "sans-serif",
  },
  subtitle: { color: "#666" },
  card: {
    background: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  },
  emotionGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: 8,
    marginBottom: 12,
  },
  emotionBtn: {
    padding: 10,
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 10,
    borderRadius: 6,
    border: "1px solid #ccc",
  },
  submit: {
    width: "100%",
    padding: 12,
    border: "none",
    borderRadius: 6,
    background: "#000",
    color: "#fff",
    cursor: "pointer",
  },
  expenseRow: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 8,
  },
};

export default App;