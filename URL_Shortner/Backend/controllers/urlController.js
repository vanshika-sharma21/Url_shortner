const UrlService = require('../services/urlService');

exports.shortenUrl = async (req, res) => {
  try {
    const { originalUrl, longUrl } = req.body;
    const url = originalUrl || longUrl;

    if (!url) {
      return res.status(400).json({ error: "Missing URL in request body" });
    }

    const userId = req.user?.id || null;
    const { id, shortCode } = await UrlService.shortenUrl(url, userId);

    res.status(201).json({
      id,
      shortUrl: `${process.env.BASE_URL}/${shortCode}`,
      originalUrl: url,
      shortCode
    });
  } catch (error) {
    console.error("Error in shortenUrl:", error.message);
    res.status(400).json({ error: error.message });
  }
};


exports.redirectUrl = async (req, res) => {
  try {
    const { shortCode } = req.params;
    const originalUrl = await UrlService.getOriginalUrl(
      shortCode,
      req.ip,
      req.get('Referer'),
      req.get('User-Agent')
    );
    res.redirect(originalUrl);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.getUserUrls = async (req, res) => {
  try {
    const urls = await UrlService.getUserUrls(req.user.id);
    res.json(urls.map(url => ({
      ...url,
      shortUrl: `${process.env.BASE_URL}/${url.short_code}`
    })));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteUrl = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await UrlService.deleteUrl(id, req.user.id);
    if (!deleted) throw new Error('URL not found or access denied');
    res.json({ message: 'URL deleted successfully' });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.getUserStats = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("📊 Fetching stats for user ID:", userId);

    const urls = await UrlService.getUserUrls(userId);
    console.log("✅ URLs fetched from model:", urls);

    const totalUrls = urls.length;

   

    let totalClicks = 0;

    for (const url of urls) {
      const clicks = typeof url?.clicks === 'number' ? url.clicks : 0;
      totalClicks += clicks;
    }

    console.log("✅ Stats calculated:", { totalUrls, totalClicks });

    res.json({ totalUrls, totalClicks });

  } catch (error) {
    console.error("🔥 Error in getUserStats:", error.stack || error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};
