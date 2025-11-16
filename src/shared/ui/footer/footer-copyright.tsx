export function FooterCopyright() {
  const handleAdminClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.history.pushState({}, '', '/admin/login');
    window.dispatchEvent(new Event('navigate'));
  };

  return (
    <div className="text-center pt-6 sm:pt-8" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
      <p style={{ color: 'rgba(255, 255, 255, 0.6)', margin: 0 }} className="text-xs sm:text-sm">
        © EveryDigitalTools 2025. All Rights Reserved
      </p>
      <div className="mt-3">
        <a
          href="/admin/login"
          className="transition-colors"
          style={{ 
            color: 'rgba(255, 255, 255, 0.4)',
            fontSize: 'var(--text-xs)',
            textDecoration: 'none'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.4)'}
          onClick={handleAdminClick}
        >
          Admin
        </a>
      </div>
    </div>
  );
}
