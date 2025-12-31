const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  emailConfig: {
    smtpHost: String,
    smtpPort: Number,
    smtpUser: String,
    smtpPassword: String,
    fromEmail: String,
    fromName: String
  },
  shippingRates: [{
    region: String,
    rate: Number
  }],
  paymentMethods: {
    cashOnDelivery: {
      enabled: { type: Boolean, default: true }
    },
    bankTransfer: {
      enabled: { type: Boolean, default: true },
      accountName: String,
      accountNumber: String,
      bankName: String,
      iban: String
    },
    easypaisa: {
      enabled: { type: Boolean, default: true },
      accountNumber: String,
      accountTitle: String
    },
    jazzCash: {
      enabled: { type: Boolean, default: true },
      accountNumber: String,
      accountTitle: String
    }
  },
  businessInfo: {
    name: { type: String, default: 'Grazie Outfits' },
    email: String,
    phone: String,
    address: String,
    whatsapp: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Settings', settingsSchema);
