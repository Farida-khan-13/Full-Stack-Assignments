import "./App.css";

function App() {
  const preventClick = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <header className="navbar">
        <a
          href="https://www.paypal.com/"
          className="paypal-logo"
          aria-label="PayPal home"
        >
          <img
            src="https://www.paypalobjects.com/webstatic/icon/pp258.png"
            alt="PayPal"
          />
        </a>

        <nav className="nav-links">
          <a href="https://www.paypal.com/" className="nav-link">
            Personal <span className="arrow">⌄</span>
          </a>

          <a href="#business" className="nav-link">
            Business <span className="arrow">⌄</span>
          </a>

          <a href="#partners" className="nav-link">
            Partners <span className="arrow">⌄</span>
          </a>

          <a href="#useful-info" className="nav-link">
            Useful Info <span className="arrow">⌄</span>
          </a>
        </nav>

        <div className="nav-buttons">
          <a
            href="#"
            className="login-button"
            onClick={preventClick}
          >
            Log In
          </a>

          <a
            href="#"
            className="signup-button"
            onClick={preventClick}
          >
            Sign Up
          </a>
        </div>
      </header>

      <main id="business" className="hero">
        <div className="account-toggle">
          <a
            href="https://www.paypal.com/"
            className="toggle-personal"
          >
            Personal
          </a>

          <a href="#business" className="toggle-business">
            Business
          </a>
        </div>

        <h1>PayPal Open</h1>

        <h2>One platform for your business needs</h2>

        <p>
          PayPal Open unifies your PayPal business solutions to help
          you get paid, get growing, and get ahead.
        </p>

        <div className="hero-buttons">
          <a
            href="#"
            className="signup-button"
            onClick={preventClick}
          >
            Sign Up
          </a>

          <a href="#contact-sales" className="contact-button">
            Contact Sales
          </a>
        </div>
      </main>
    </div>
  );
}

export default App;