import List "mo:core/List";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Common "../types/common";
import CertTypes "../types/certificates";
import CertLib "../lib/certificates";
import Storage "mo:caffeineai-object-storage/Storage";

// Certificates API mixin — exposes certificate management endpoints
// State injected: accessControlState, certRequests, nextCertId, masterTemplate
mixin (
  accessControlState : AccessControl.AccessControlState,
  certRequests : List.List<CertTypes.CertificateRequest>,
  nextCertId : { var value : Nat },
  masterTemplate : CertTypes.MasterTemplate,
) {

  // --- User Endpoints ---

  // Submit a new certificate request with ₹99 payment proof
  public shared ({ caller }) func submitCertificateRequest(
    fullName : Text,
    state : Text,
    country : Text,
    email : ?Text,
    experience : ?Text,
    screenshot1 : Storage.ExternalBlob,
    screenshot2 : ?Storage.ExternalBlob,
    paymentScreenshot : Storage.ExternalBlob,
    utrNumber : Text,
  ) : async CertTypes.CertificateRequestPublic {
    // User auth check
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Please log in to submit a certificate request");
    };
    CertLib.submitCertificateRequest(
      certRequests,
      nextCertId,
      caller,
      fullName,
      state,
      country,
      email,
      experience,
      screenshot1,
      screenshot2,
      paymentScreenshot,
      utrNumber,
    );
  };

  // Returns all certificate requests for the calling user (all statuses — pending, approved, rejected sab dikhao)
  public shared query ({ caller }) func getMyCertificates() : async [CertTypes.CertificateRequestPublic] {
    // User auth check
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Please log in to view your certificates");
    };
    CertLib.getMyCertificates(certRequests, caller);
  };

  // Returns true if calling user has an approved certificate (golden tick ke liye)
  public shared query ({ caller }) func hasCertificate() : async Bool {
    // Anonymous caller ke liye false return karo
    if (caller.isAnonymous()) {
      return false;
    };
    CertLib.hasCertificate(certRequests, caller);
  };

  // Public certificate verification by certCode (for verification page — no auth needed)
  public query func verifyCertificate(certCode : Text) : async ?CertTypes.CertificateRequestPublic {
    CertLib.verifyCertificateByCode(certRequests, certCode);
  };

  // --- Admin Endpoints ---

  // Approve a certificate request
  // Pass null for customCertificate → auto-inject (master template + user data)
  // Pass ?blob → upload a custom VIP certificate
  public shared ({ caller }) func approveCertificate(
    certId : CertTypes.CertificateId,
    customCertificate : ?Storage.ExternalBlob,
  ) : async CertTypes.CertificateRequestPublic {
    // Admin auth check
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can approve certificates");
    };
    CertLib.approveCertificate(certRequests, certId, customCertificate);
  };

  // Reject a certificate request with optional rejection reason (dashboard mein reason dikhega)
  public shared ({ caller }) func rejectCertificate(
    certId : CertTypes.CertificateId,
    rejectionReason : ?Text,
  ) : async CertTypes.CertificateRequestPublic {
    // Admin auth check
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can reject certificates");
    };
    CertLib.rejectCertificate(certRequests, certId, rejectionReason);
  };

  // List all certificate requests (admin view)
  public shared query ({ caller }) func listAllCertificateRequests() : async [CertTypes.CertificateRequestPublic] {
    // Admin auth check
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can list all certificate requests");
    };
    CertLib.getAllCertificateRequests(certRequests);
  };

  // Upload or replace the master certificate template (admin once upload karta hai)
  public shared ({ caller }) func updateMasterTemplate(
    template : Storage.ExternalBlob,
  ) : async () {
    // Admin auth check
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can update the master template");
    };
    CertLib.updateMasterTemplate(masterTemplate, template);
  };

  // Get the current master template (admin preview ke liye)
  public shared query ({ caller }) func getMasterTemplate() : async ?Storage.ExternalBlob {
    // Admin auth check
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can view the master template");
    };
    CertLib.getMasterTemplate(masterTemplate);
  };
};
