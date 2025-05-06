
export default function Modal({ title, content, onClose }) {
    return (
      <div style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        zIndex: 1000
      }}>
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '1rem',
          maxWidth: '500px',
          width: '90%',
          boxShadow: '0 0 15px rgba(0,0,0,0.2)'
        }}>
          <h2>{title}</h2>
          <p>{content}</p>
          <button onClick={onClose} style={{ marginTop: '1rem' }}>Закрити</button>
        </div>
      </div>
    );
  }
  