import List "mo:core/List";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";
import CryptoTypes "types/crypto";
import SettingsTypes "types/settings";
import DataModelsTypes "types/data-models";
import CryptoLib "lib/crypto";
import CryptoApi "mixins/crypto-api";
import AdminAuthApi "mixins/admin-auth-api";
import SettingsApi "mixins/settings-api";
import DataModelsApi "mixins/data-models-api";
import Migration "migration";

(with migration = Migration.run)
actor {
  // --- Authorization ---
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // --- Object Storage ---
  include MixinObjectStorage();

  // --- Crypto State ---
  let cryptoListings = List.empty<CryptoTypes.CryptoListing>();
  let cryptoOrders = List.empty<CryptoTypes.CryptoOrder>();
  let nextListingId = { var value : Nat = 0 };
  let nextOrderId = { var value : Nat = 0 };

  // Seed initial listings if empty
  if (cryptoListings.size() == 0) {
    cryptoListings.add(CryptoLib.newListing(0, "Tether", "USDT", "USDT stablecoin pegged to USD. Buy at today's best INR rate.", 85.5));
    cryptoListings.add(CryptoLib.newListing(1, "Bitcoin", "BTC", "The world's leading cryptocurrency. Buy Bitcoin securely.", 5800000.0));
    nextListingId.value := 2;
  };

  // --- App Settings State ---
  let appSettings = {
    var value : SettingsTypes.AppSettings = {
      currency = #INR;
      paymentType = #UPI;
      upiId = "6203460064@ptsbi";
      walletAddress = "";
      walletNetwork = "TRC-20";
      heroContent = {
        headline = "IGNOU Admission & Assignment Help";
        subtitle = "Get professional assistance for IGNOU admissions, assignments, and project reports";
        ctaText = "Get Started";
        ctaSubtext = "Free Consultation";
      };
      whyChoose = {
        title = "Why Choose Us?";
        features = [
          {
            icon = "shield";
            title = "Trusted Service";
            description = "Years of experience helping IGNOU students succeed";
          },
          {
            icon = "clock";
            title = "On-Time Delivery";
            description = "Never miss a deadline with our prompt service";
          },
          {
            icon = "support";
            title = "24/7 Support";
            description = "Round the clock assistance for all your queries";
          },
        ];
      };
      footerContent = {
        copyright = "© 2025 IGNOU Help Center. All rights reserved.";
        links = [
          { text = "Privacy Policy"; url = "#" },
          { text = "Terms of Service"; url = "#" },
          { text = "Contact Us"; url = "#contact" },
        ];
      };
      buttonLabels = {
        whatsappButtonText = "Chat on WhatsApp";
        supportButtonText = "Get Support";
      };
    };
  };

  // --- Data Models State ---
  let services = List.empty<DataModelsTypes.Service>();
  let nextServiceId = { var value : Nat = 0 };
  let contactDetails = {
    var value : ?DataModelsTypes.ContactDetails = null;
  };
  let leads = List.empty<DataModelsTypes.Lead>();
  let nextLeadId = { var value : Nat = 0 };
  let adminAuth = {
    var value : DataModelsTypes.AdminAuth = {
      passwordHash = "11760000";
    };
  };

  // --- Mixins ---
  include AdminAuthApi(accessControlState);
  include CryptoApi(accessControlState, cryptoListings, cryptoOrders, nextListingId, nextOrderId);
  include SettingsApi(accessControlState, appSettings);
  include DataModelsApi(accessControlState, services, nextServiceId, contactDetails, leads, nextLeadId, adminAuth);
};
