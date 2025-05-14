import logo from "../assets/logo-2.svg";

export const Footer = () => {
  return (
    <footer id="footer" className="bg-muted/30">
      <hr className="w-11/12 mx-auto" />

      <section className="container py-16 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Logo Only */}
        <div className="flex flex-col items-start">
          <a href="/" className="flex items-center gap-2">
            <img src={logo} alt="LearnScape Logo" className="w-23 h-auto" />
          </a>
        </div>

        {/* About Links */}
        <div className="flex flex-col gap-3">
          <h3 className="font-bold text-lg">About</h3>
          <a href="#features" className="opacity-70 hover:opacity-100 transition">Features</a>
          <a href="#pricing" className="opacity-70 hover:opacity-100 transition">Pricing</a>
          <a href="#faq" className="opacity-70 hover:opacity-100 transition">FAQ</a>
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-3">
          <h3 className="font-bold text-lg">Contact</h3>
          <a
            href="mailto:njawahirani@learnscapeai.com"
            className="opacity-70 hover:opacity-100 transition underline text-primary"
          >
            contact@learnscapeai.com
          </a>
        </div>
      </section>

      {/* Copyright */}
      <section className="container pb-8 text-center text-sm text-muted-foreground">
        &copy; 2025{" "}
        <a
          href="/"
          className="text-primary hover:underline"
        >
          LearnScape AI
        </a>
        . All rights reserved.
      </section>
    </footer>
  );
};
