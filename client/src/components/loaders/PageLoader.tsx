import styles from './PageLoader.module.css';

const PageLoader: React.FC = () => {
  return (
    <div
      className="loader-overlay"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: -1,
      }}
    >
      <div className={styles.loader}>
        <div style={{ '--i': 1 } as React.CSSProperties}></div>
        <div style={{ '--i': 2 } as React.CSSProperties}></div>
        <div style={{ '--i': 3 } as React.CSSProperties}></div>
        <div style={{ '--i': 4 } as React.CSSProperties}></div>
      </div>
    </div>
  );
};

export default PageLoader;
