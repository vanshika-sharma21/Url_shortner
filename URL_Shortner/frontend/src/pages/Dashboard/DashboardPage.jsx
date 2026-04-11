import { useState, useEffect } from 'react';
import { shortenUrl, getUserUrls, deleteUrl } from '../../api/urlApi';
import { getUserStats } from '../../api/statsApi';
import UrlList from '../../components/dashboard/UrlList';
import UrlForm from '../../components/dashboard/UrlForm';
import SummaryStats from '../../components/analytics/SummaryStats';
import { FiPlus, FiRefreshCw, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';

const DashboardPage = () => {
  const [urls, setUrls] = useState([]);
  const [stats, setStats] = useState({ totalUrls: 0, totalClicks: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const [urlsData, statsData] = await Promise.all([
        getUserUrls(),
        getUserStats()
      ]);
      setUrls(urlsData);
      setStats(statsData);
    } catch (err) {
      setError('Failed to fetch data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleShorten = async (originalUrl) => {
    try {
      const newUrl = await shortenUrl(originalUrl);
      setUrls([newUrl, ...urls]);
      setStats((prev) => ({
        ...prev,
        totalUrls: prev.totalUrls + 1
      }));
      setSuccessMessage('URL shortened successfully!');
      setTimeout(() => setSuccessMessage(''), 4000);
    } catch (err) {
      setError('Failed to shorten URL. Please try again.');
      setTimeout(() => setError(''), 4000);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUrl(id);
      setUrls(urls.filter(url => url.id !== id));
      setStats((prev) => ({
        ...prev,
        totalUrls: prev.totalUrls - 1
      }));
      setSuccessMessage('URL deleted successfully!');
      setTimeout(() => setSuccessMessage(''), 4000);
    } catch (err) {
      setError('Failed to delete URL. Please try again.');
      setTimeout(() => setError(''), 4000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <button
            onClick={fetchData}
            disabled={loading}
            className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
          >
            <FiRefreshCw className={`mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh Data
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Notifications */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 flex items-center">
            <FiAlertCircle className="mr-3" />
            {error}
          </div>
        )}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-100 border-l-4 border-green-500 text-green-700 flex items-center">
            <FiCheckCircle className="mr-3" />
            {successMessage}
          </div>
        )}

        {/* Analytics Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Analytics Overview</h2>
          <SummaryStats totalUrls={stats.totalUrls} totalClicks={stats.totalClicks} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* URL Management */}
          <div className="lg:col-span-2">
            {/* URL Shortener Form */}
            <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <FiPlus className="mr-2" /> Create a New Short Link
              </h2>
              <UrlForm onSubmit={handleShorten} />
            </div>

            {/* Short URL List */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Your Links</h2>
              {loading ? (
                <div className="text-center py-8">
                  <FiRefreshCw className="animate-spin text-4xl text-blue-500 mx-auto" />
                  <p className="mt-2 text-gray-500">Loading your links...</p>
                </div>
              ) : (
                <UrlList urls={urls} onDelete={handleDelete} />
              )}
            </div>
          </div>

          {/* Sidebar/Info Section */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <span className="font-medium text-blue-800">Total Links</span>
                  <span className="font-bold text-2xl text-blue-600">{stats.totalUrls}</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <span className="font-medium text-green-800">Total Clicks</span>
                  <span className="font-bold text-2xl text-green-600">{stats.totalClicks}</span>
                </div>
              </div>
              <p className="mt-6 text-sm text-gray-500">
                Track your link performance and manage your URLs all in one place.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
