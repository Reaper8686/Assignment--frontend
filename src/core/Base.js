import Menu from "./Menu";

function Base({
  title = "My title",
  description = "",
  className = "container p-4",
  children,
}) {
  return (
    <div>
      <Menu />
      <div className="container-fluid">
        <div className="jumbotron text-center py-3">
          <h2 className="display-4 fw-bold">{title}</h2>
          <p className="lead m-0">{description}</p>
        </div>
        <div className={className}>{children}</div>
      </div>
      <footer className="footer unicolor bottom">
        <div className="container-fluid text-center py-3">
          <span>Copyright © 2022</span>

          <a href="https://github.com/Reaper8686" className="ms-5">
            Contact Us
          </a>
        </div>
      </footer>
    </div>
  );
}

export default Base;
