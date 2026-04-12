import Runtime "mo:core/Runtime";
import Storage "mo:caffeineai-object-storage/Storage";
import AccessControl "mo:caffeineai-authorization/access-control";
import ConfigLib "../lib/config";
import ConfigTypes "../types/config";

mixin (
  accessControlState : AccessControl.AccessControlState,
  upiConfig : ConfigTypes.UpiConfig,
) {
  /// Anyone: get UPI config (ID + QR code) for payment page
  public query func getUpiConfig() : async ConfigTypes.UpiConfigPublic {
    ConfigLib.getUpiConfig(upiConfig);
  };

  /// Admin: update UPI ID
  public shared ({ caller }) func updateUpiId(upiId : Text) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can update UPI ID");
    };
    ConfigLib.updateUpiId(upiConfig, upiId);
  };

  /// Admin: update QR code image
  public shared ({ caller }) func updateQrCode(qrCodeBlob : Storage.ExternalBlob) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can update QR code");
    };
    ConfigLib.updateQrCode(upiConfig, qrCodeBlob);
  };
};
