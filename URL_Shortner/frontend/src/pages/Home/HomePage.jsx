import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiArrowRight, FiBarChart2, FiLink, FiUserPlus } from 'react-icons/fi';

const HomePage = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 sm:py-32">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            Shorten, Share, and Analyze Your Links
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg sm:text-xl text-indigo-100">
            Create clean, memorable links. Track every click and gain valuable insights into your audience.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {user ? (
              <Link
                to="/dashboard"
                className="transform transition-transform duration-300 hover:scale-105 inline-flex items-center px-8 py-4 border border-transparent text-base font-medium rounded-full shadow-lg text-white bg-indigo-500 hover:bg-indigo-600"
              >
                Go to Dashboard <FiArrowRight className="ml-2" />
              </Link>
            ) : (
              <>
                <Link
                  to="/register"
                  className="transform transition-transform duration-300 hover:scale-105 inline-flex items-center px-8 py-4 border border-transparent text-base font-medium rounded-full shadow-lg text-white bg-indigo-500 hover:bg-indigo-600"
                >
                  Get Started for Free
                </Link>
                <Link
                  to="/login"
                  className="transform transition-transform duration-300 hover:scale-105 inline-flex items-center px-8 py-4 border border-transparent text-base font-medium rounded-full text-indigo-600 bg-white hover:bg-indigo-50"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Why You'll Love Our URL Shortener</h2>
            <p className="mt-4 text-lg text-gray-500">
              Everything you need in one simple and powerful platform.
            </p>
          </div>
          <div className="mt-16 grid gap-12 md:grid-cols-3">
            <div className="text-center p-8 bg-white rounded-xl shadow-lg transform transition-transform duration-300 hover:-translate-y-2">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 mx-auto mb-6">
                <FiLink size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Easy URL Shortening</h3>
              <p className="text-gray-500">Create short, branded links in seconds. Say goodbye to long, clunky URLs.</p>
            </div>
            <div className="text-center p-8 bg-white rounded-xl shadow-lg transform transition-transform duration-300 hover:-translate-y-2">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-600 mx-auto mb-6">
                <FiBarChart2 size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">In-Depth Analytics</h3>
              <p className="text-gray-500">Track every click with detailed reports on geography, devices, and referrers.</p>
            </div>
            <div className="text-center p-8 bg-white rounded-xl shadow-lg transform transition-transform duration-300 hover:-translate-y-2">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-purple-100 text-purple-600 mx-auto mb-6">
                <FiUserPlus size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Free User Accounts</h3>
              <p className="text-gray-500">Manage your links, view your history, and organize your campaigns with a free account.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-gray-100 py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Ready to Get Started?
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Join now and start creating powerful, trackable links in seconds.
          </p>
          <div className="mt-8">
            <Link
              to="/register"
              className="transform transition-transform duration-300 hover:scale-105 inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-full shadow-lg text-white bg-blue-600 hover:bg-blue-700"
            >
              Sign Up Now <FiArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;