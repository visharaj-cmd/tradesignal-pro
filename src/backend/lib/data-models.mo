import List "mo:core/List";
import Map "mo:core/Map";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Array "mo:core/Array";
import Nat "mo:core/Nat";
import Order "mo:core/Order";
import Types "../types/data-models";

module {
  public func listServices(services : List.List<Types.Service>) : [Types.Service] {
    let sorted = services.toArray();
    sorted.sort(func(a : Types.Service, b : Types.Service) : Order.Order {
      Nat.compare(a.sortOrder, b.sortOrder)
    });
  };

  public func getService(services : List.List<Types.Service>, id : Types.ServiceId) : ?Types.Service {
    services.find(func(s) { s.id == id });
  };

  public func addService(
    services : List.List<Types.Service>,
    nextServiceId : { var value : Nat },
    title : Text,
    description : Text,
    iconName : Text,
    sortOrder : Nat,
  ) : Types.Service {
    let id = nextServiceId.value;
    nextServiceId.value += 1;
    let service : Types.Service = {
      id;
      title;
      description;
      iconName;
      sortOrder;
    };
    services.add(service);
    service;
  };

  public func updateService(
    services : List.List<Types.Service>,
    id : Types.ServiceId,
    title : Text,
    description : Text,
    iconName : Text,
    sortOrder : Nat,
  ) : ?Types.Service {
    var found = false;
    services.mapInPlace(func(s) {
      if (s.id == id) {
        found := true;
        { s with title; description; iconName; sortOrder };
      } else { s };
    });
    if (found) {
      services.find(func(s) { s.id == id });
    } else {
      null;
    };
  };

  public func deleteService(services : List.List<Types.Service>, id : Types.ServiceId) : Bool {
    let originalSize = services.size();
    services.retain(func(s) { s.id != id });
    services.size() < originalSize;
  };

  public func getContactDetails(contactDetails : { var value : ?Types.ContactDetails }) : ?Types.ContactDetails {
    contactDetails.value;
  };

  public func setContactDetails(
    contactDetails : { var value : ?Types.ContactDetails },
    phone : Text,
    whatsapp : Text,
    email : Text,
    address : Text,
    socialMedia : [Types.SocialLink],
  ) : Types.ContactDetails {
    let details : Types.ContactDetails = {
      phone;
      whatsapp;
      email;
      address;
      socialMedia;
    };
    contactDetails.value := ?details;
    details;
  };

  public func listLeads(leads : List.List<Types.Lead>) : [Types.Lead] {
    leads.toArray();
  };

  public func getLead(leads : List.List<Types.Lead>, id : Types.LeadId) : ?Types.Lead {
    leads.find(func(l) { l.id == id });
  };

  public func addLead(
    leads : List.List<Types.Lead>,
    nextLeadId : { var value : Nat },
    fullName : Text,
    contactNumber : Text,
  ) : Types.Lead {
    let id = nextLeadId.value;
    nextLeadId.value += 1;
    let lead : Types.Lead = {
      id;
      fullName;
      contactNumber;
      timestamp = Time.now();
    };
    leads.add(lead);
    lead;
  };

  public func deleteLead(leads : List.List<Types.Lead>, id : Types.LeadId) : Bool {
    let originalSize = leads.size();
    leads.retain(func(l) { l.id != id });
    leads.size() < originalSize;
  };

  public func verifyAdminPassword(adminAuth : { var value : Types.AdminAuth }, password : Text) : Bool {
    adminAuth.value.passwordHash == password;
  };
};
