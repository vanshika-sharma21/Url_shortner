import { Link } from 'react-router-dom';

const UrlSelector = ({ urls }) => {
  if (urls.length === 0) return null;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">View Analytics for Specific URL</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {urls.map(url => (
          <Link 
            key={url.id} 
            to={`/analytics/${url.id}`}
            className="border p-4 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <p className="font-medium">{url.short_code}</p>
            <p className="text-sm text-gray-500 truncate">{url.original_url}</p>
            <p className="text-sm mt-2">{url.clicks} clicks</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UrlSelector;