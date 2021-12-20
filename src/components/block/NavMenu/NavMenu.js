import './NavMenu.css'

export const NavMenu = ({ pages, currentPage, setCurrentPage }) => {
  return (
    <div className="nav-menu">
      {pages.map((p) => (
        <button
          key={p.id}
          className={`nav-menu-button ${
            p.id === currentPage ? 'nav-menu-button_current' : ''
          }`}
          type="button"
          onClick={() => setCurrentPage(p.id)}
        >
          <img src={p.icon} alt={p.imgAlt} />
          {p.id === currentPage ? p.title : null}
        </button>
      ))}
    </div>
  )
}
