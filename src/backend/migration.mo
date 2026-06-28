import List "mo:core/List";
import Map "mo:core/Map";
import SettingsTypes "./types/settings";
import DataModelsTypes "./types/data-models";

module {
  // --- Old types (from previous version) ---
  type OldCurrency = {
    #USD;
    #INR;
  };

  type OldPaymentType = {
    #UPI;
    #CryptoWallet;
  };

  type OldAppSettings = {
    currency : OldCurrency;
    paymentType : OldPaymentType;
    upiId : Text;
    walletAddress : Text;
    walletNetwork : Text;
  };

  type OldService = {
    id : Nat;
    title : Text;
    description : Text;
    icon : Text;
    order : Nat;
  };

  // --- New types (current version) ---
  type NewAppSettings = SettingsTypes.AppSettings;
  type NewService = DataModelsTypes.Service;

  // --- OldActor: record of old stable fields ---
  type OldActor = {
    accessControlState : {
      var adminAssigned : Bool;
      userRoles : Map.Map<Principal, { #admin; #guest; #user }>;
    };
    adminAuth : { var value : { passwordHash : Text } };
    appSettings : { var value : OldAppSettings };
    contactDetails : { var value : ?{ phone : Text; whatsapp : Text; email : Text; address : Text; socialMedia : [{ platform : Text; url : Text }] } };
    cryptoListings : List.List<{ createdAt : Int; description : Text; id : Nat; isActive : Bool; name : Text; price : Float; symbol : Text }>;
    cryptoOrders : List.List<{ var completedAt : ?Int; createdAt : Int; cryptoSymbol : Text; cryptoType : Text; id : Nat; network : Text; var reviewComment : Text; var reviewStatus : { #none; #notTrusted; #trusted }; screenshotUrl : Text; var status : { #completed; #pending; #rejected }; userId : Principal; walletAddress : Text }>;
    leads : List.List<{ contactNumber : Text; fullName : Text; id : Nat; timestamp : Int }>;
    nextLeadId : { var value : Nat };
    nextListingId : { var value : Nat };
    nextOrderId : { var value : Nat };
    nextServiceId : { var value : Nat };
    services : List.List<OldService>;
  };

  // --- NewActor: record of new stable fields ---
  type NewActor = {
    accessControlState : {
      var adminAssigned : Bool;
      userRoles : Map.Map<Principal, { #admin; #guest; #user }>;
    };
    adminAuth : { var value : { passwordHash : Text } };
    appSettings : { var value : NewAppSettings };
    contactDetails : { var value : ?{ phone : Text; whatsapp : Text; email : Text; address : Text; socialMedia : [{ platform : Text; url : Text }] } };
    cryptoListings : List.List<{ createdAt : Int; description : Text; id : Nat; isActive : Bool; name : Text; price : Float; symbol : Text }>;
    cryptoOrders : List.List<{ var completedAt : ?Int; createdAt : Int; cryptoSymbol : Text; cryptoType : Text; id : Nat; network : Text; var reviewComment : Text; var reviewStatus : { #none; #notTrusted; #trusted }; screenshotUrl : Text; var status : { #completed; #pending; #rejected }; userId : Principal; walletAddress : Text }>;
    leads : List.List<{ contactNumber : Text; fullName : Text; id : Nat; timestamp : Int }>;
    nextLeadId : { var value : Nat };
    nextListingId : { var value : Nat };
    nextOrderId : { var value : Nat };
    nextServiceId : { var value : Nat };
    services : List.List<NewService>;
  };

  public func run(old : OldActor) : NewActor {
    // Migrate appSettings: add new fields with defaults
    let newAppSettings : NewAppSettings = {
      currency = old.appSettings.value.currency;
      paymentType = old.appSettings.value.paymentType;
      upiId = old.appSettings.value.upiId;
      walletAddress = old.appSettings.value.walletAddress;
      walletNetwork = old.appSettings.value.walletNetwork;
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

    // Migrate services: rename icon -> iconName, order -> sortOrder
    let newServices = old.services.map<OldService, NewService>(
      func(s : OldService) : NewService {
        {
          id = s.id;
          title = s.title;
          description = s.description;
          iconName = s.icon;
          sortOrder = s.order;
        };
      }
    );

    {
      accessControlState = old.accessControlState;
      adminAuth = old.adminAuth;
      appSettings = { var value = newAppSettings };
      contactDetails = old.contactDetails;
      cryptoListings = old.cryptoListings;
      cryptoOrders = old.cryptoOrders;
      leads = old.leads;
      nextLeadId = old.nextLeadId;
      nextListingId = old.nextListingId;
      nextOrderId = old.nextOrderId;
      nextServiceId = old.nextServiceId;
      services = newServices;
    };
  };
};
