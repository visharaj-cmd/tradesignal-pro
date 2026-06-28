import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import SettingsTypes "../types/settings";

mixin (
  accessControlState : AccessControl.AccessControlState,
  appSettings : { var value : SettingsTypes.AppSettings },
) {

  /// Public: anyone can read the current app settings.
  public query func getAppSettings() : async SettingsTypes.AppSettings {
    appSettings.value;
  };

  /// Admin only: update the app settings.
  public shared ({ caller }) func adminUpdateSettings(
    settings : SettingsTypes.AppSettings
  ) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized");
    };
    appSettings.value := settings;
    true;
  };
};
