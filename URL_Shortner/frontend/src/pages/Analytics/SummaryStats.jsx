const SummaryStats = ({ totalUrls, totalClicks }) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-gray-500">Total URLs</h3>
          <p className="text-3xl font-bold">{totalUrls || '-'}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-gray-500">Total Clicks</h3>
          <p className="text-3xl font-bold">{totalClicks || '-'}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-gray-500">Avg. Clicks/URL</h3>
          <p className="text-3xl font-bold">
            {totalUrls && totalClicks ? Math.round(totalClicks / totalUrls) : '-'}
          </p>
        </div>
      </div>
    );
  };
  
  export default SummaryStats;