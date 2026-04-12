import AccessControl "mo:caffeineai-authorization/access-control";

mixin (accessControlState : AccessControl.AccessControlState) {
  /// Public: verify admin password for frontend login gate.
  /// Returns true if the provided password matches the hardcoded admin password.
  public shared func verifyAdminPassword(password : Text) : async Bool {
    password == "11760000";
  };

  /// Public: claim admin role by proving knowledge of the admin password.
  /// Grants #admin role to the caller's IC principal if the password matches.
  /// Idempotent — safe to call multiple times.
  /// This bridges password-only admin UX with IC principal-based backend auth.
  public shared ({ caller }) func claimAdminRole(password : Text) : async Bool {
    if (caller.isAnonymous()) {
      return false; // Anonymous callers cannot claim admin role
    };
    if (password != "11760000") {
      return false; // Wrong password
    };
    accessControlState.userRoles.add(caller, #admin);
    true;
  };

  /// Public: self-register as a user.
  /// Any non-anonymous caller can call this to get the #user role.
  /// Idempotent — safe to call multiple times.
  /// Does NOT downgrade admins.
  public shared ({ caller }) func selfRegister() : async () {
    if (caller.isAnonymous()) {
      return; // Anonymous callers cannot register
    };
    // Check if already registered as admin — don't downgrade
    switch (accessControlState.userRoles.get(caller)) {
      case (? #admin) {}; // Already admin, do nothing
      case (_) {
        // Register or re-register as user
        accessControlState.userRoles.add(caller, #user);
      };
    };
  };
};
