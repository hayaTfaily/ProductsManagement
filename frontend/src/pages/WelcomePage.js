import React from 'react';
import { Link } from 'react-router-dom';

export default function WelcomePage() {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Welcome Admin</h2>
      <button type="button" className="btn btn-success" style={styles.button}>
        <Link to="/home" style={styles.link}>
          Let's start
        </Link>
      </button>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  button: {
    padding: '10px 20px',
    borderRadius: '5px',
    backgroundColor: '#28a745',
    border: 'none',
    cursor: 'pointer',
  },
  link: {
    textDecoration: 'none',
    color: '#fff',
  },
};
