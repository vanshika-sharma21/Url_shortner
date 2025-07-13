import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getUserStats, getUrlStats } from '../../api/statsApi';
import SummaryStats from '../../components/analytics/SummaryStats';
import DailyClicksChart from '../../components/analytics/charts/DailyClicksChart';
import ReferrerChart from '../../components/analytics/charts/ReferrerChart';
import DeviceChart from '../../components/analytics/charts/DeviceChart';
import UrlSelector from '../../components/analytics/UrlSelector';
import { getUserUrls } from '../../api/urlApi'; // 👈 fetch user URLs

const AnalyticsPage = () => {
  const { urlId } = useParams();
  const [stats, setStats] = useState(null);
  const [userStats, setUserStats] = useState(null);
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchUserUrls = async () => {
    try {
      const data = await getUserUrls();
      setUrls(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        if (urlId) {
          const data = await getUrlStats(urlId);
          setStats(data);
        } else {
          const statsData = await getUserStats();
          setUserStats(statsData);
          await fetchUserUrls(); // 👈 fetch all user URLs
        }
      } catch (err) {
        setError('Failed to fetch URLs or analytics data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [urlId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Analytics</h1>

      {urlId ? (
        <>
          <SummaryStats
            totalClicks={stats?.daily?.reduce((sum, day) => sum + day.count, 0) || 0}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Daily Clicks</h2>
              <DailyClicksChart data={stats?.daily || []} />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Top Referrers</h2>
              <ReferrerChart data={stats?.referrers || []} />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Devices</h2>
              <DeviceChart data={stats?.devices || []} />
            </div>
          </div>
        </>
      ) : (
        <>
          <SummaryStats
            totalUrls={userStats?.totalUrls || 0}
            totalClicks={userStats?.totalClicks || 0}
          />

          <UrlSelector urls={userStats?.topUrls || []} />

          <div className="grid grid-cols-1 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Your Short URLs</h2>

              <div className="space-y-4">
                {urls.map((url) => (
                  <div key={url.id} className="border-b pb-4 last:border-b-0">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <p className="text-sm text-gray-500 truncate max-w-md">
                          Original: <span className="break-all">{url.original_url}</span>
                        </p>
                        <p className="font-medium">
                          Short:{" "}
                          <a
                            href={`http://localhost:5000/${url.short_code}`}
                            className="text-blue-600 hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            http://localhost:5000/{url.short_code}
                          </a>
                        </p>
                      </div>

                      <div className="text-right space-y-1">
                        <p className="font-medium">{url.clicks} clicks</p>
                        <Link
                          to={`/analytics/${url.id}`}
                          className="text-sm text-blue-600 hover:underline"
                        >
                          View details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Clicks Last 7 Days</h2>
              <DailyClicksChart data={userStats?.clicksLast7Days || []} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AnalyticsPage;
