const Settings = require('../models/Settings');

// Get settings
exports.getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    
    if (!settings) {
      // Create default settings if none exist
      settings = new Settings({
        shippingRates: [
          { region: 'Islamabad', rate: 150 },
          { region: 'Rawalpindi', rate: 150 },
          { region: 'Lahore', rate: 200 },
          { region: 'Karachi', rate: 250 },
          { region: 'Other', rate: 200 }
        ],
        businessInfo: {
          name: 'Grazie Outfits',
          email: 'grazieoutfits@gmail.com',
          phone: '+92 318-6831-156',
          whatsapp: '+92 317-5837-684',
          address: 'Islamabad, Pakistan'
        }
      });
      await settings.save();
    }
    
    res.json({ success: true, data: settings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update settings (admin only)
exports.updateSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    
    if (!settings) {
      settings = new Settings(req.body);
    } else {
      Object.assign(settings, req.body);
    }
    
    await settings.save();
    
    res.json({ success: true, data: settings });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get shipping rate by region
exports.getShippingRate = async (req, res) => {
  try {
    const { region } = req.query;
    const settings = await Settings.findOne();
    
    if (!settings || !settings.shippingRates) {
      return res.json({ success: true, data: { rate: 200 } }); // Default rate
    }
    
    const regionRate = settings.shippingRates.find(r => r.region === region);
    const rate = regionRate ? regionRate.rate : 200;
    
    res.json({ success: true, data: { rate } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
