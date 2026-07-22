interface StatusBarProps {
  statusText: string;
  onFnKey: (keyNumber: number) => void;
}

export const StatusBar = ({ statusText, onFnKey }: StatusBarProps) => {
  const fnKeys = [
    { num: 1, label: 'Ayuda', action: () => onFnKey(1) },
    { num: 2, label: 'Buscar', action: () => onFnKey(2) },
    { num: 3, label: 'Ver', action: () => onFnKey(3) },
    { num: 5, label: 'Refrescar', action: () => onFnKey(5) },
    { num: 9, label: 'Audio', action: () => onFnKey(9) },
    { num: 10, label: 'Salir', action: () => onFnKey(10) },
  ];

  return (
    <div className="dos-status-bar">
      {fnKeys.map((item) => (
        <div key={item.num} className="dos-fn-key" onClick={item.action} style={{ cursor: 'pointer' }}>
          <span className="dos-fn-num">F{item.num}</span>
          <span className="dos-fn-label">{item.label}</span>
        </div>
      ))}
      <div style={{ marginLeft: 'auto', paddingRight: '8px', color: '#ffff55', fontWeight: 'bold' }}>
        {statusText}
      </div>
    </div>
  );
};
