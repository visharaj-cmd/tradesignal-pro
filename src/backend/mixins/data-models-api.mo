import Debug "mo:core/Debug";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Types "../types/data-models";
import DataModelsLib "../lib/data-models";

mixin (
  accessControlState : AccessControl.AccessControlState,
  services : List.List<Types.Service>,
  nextServiceId : { var value : Nat },
  contactDetails : { var value : ?Types.ContactDetails },
  leads : List.List<Types.Lead>,
  nextLeadId : { var value : Nat },
  adminAuth : { var value : Types.AdminAuth },
) {
  // --- Services (Public) ---
  public query func listServices() : async [Types.Service] {
    DataModelsLib.listServices(services);
  };

  public query func getService(id : Types.ServiceId) : async ?Types.Service {
    DataModelsLib.getService(services, id);
  };

  // --- Services (Admin) ---
  public shared ({ caller }) func addService(
    title : Text,
    description : Text,
    iconName : Text,
    sortOrder : Nat,
  ) : async Types.Service {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized");
    };
    DataModelsLib.addService(services, nextServiceId, title, description, iconName, sortOrder);
  };

  public shared ({ caller }) func updateService(
    id : Types.ServiceId,
    title : Text,
    description : Text,
    iconName : Text,
    sortOrder : Nat,
  ) : async ?Types.Service {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized");
    };
    DataModelsLib.updateService(services, id, title, description, iconName, sortOrder);
  };

  public shared ({ caller }) func deleteService(id : Types.ServiceId) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized");
    };
    DataModelsLib.deleteService(services, id);
  };

  // --- Contact Details (Public read, Admin write) ---
  public query func getContactDetails() : async ?Types.ContactDetails {
    DataModelsLib.getContactDetails(contactDetails);
  };

  public shared ({ caller }) func setContactDetails(
    phone : Text,
    whatsapp : Text,
    email : Text,
    address : Text,
    socialMedia : [Types.SocialLink],
  ) : async Types.ContactDetails {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized");
    };
    DataModelsLib.setContactDetails(contactDetails, phone, whatsapp, email, address, socialMedia);
  };

  // --- Leads (Admin only) ---
  public shared ({ caller }) func listLeads() : async [Types.Lead] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized");
    };
    DataModelsLib.listLeads(leads);
  };

  public shared ({ caller }) func getLead(id : Types.LeadId) : async ?Types.Lead {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized");
    };
    DataModelsLib.getLead(leads, id);
  };

  public shared ({ caller }) func deleteLead(id : Types.LeadId) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized");
    };
    DataModelsLib.deleteLead(leads, id);
  };

  // --- Lead Capture (Public, no auth) ---
  public func captureLead(fullName : Text, contactNumber : Text) : async Types.Lead {
    DataModelsLib.addLead(leads, nextLeadId, fullName, contactNumber);
  };

};
