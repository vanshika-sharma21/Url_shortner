const Footer = () => {
    return (
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} ShortURL. All rights reserved.</p>
          <p className="mt-2 text-sm text-gray-400">
            A simple URL shortener with analytics
          </p>
        </div>
      </footer>
    );
  };
  
  export default Footer;