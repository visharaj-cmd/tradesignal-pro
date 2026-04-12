import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import SubLib "../lib/subscriptions";
import SubTypes "../types/subscriptions";
import Common "../types/common";

mixin (
  accessControlState : AccessControl.AccessControlState,
  subscriptions : Map.Map<Common.UserId, SubTypes.Subscription>,
) {
  /// User: get own subscription status
  public query ({ caller }) func getMySubscription() : async ?SubTypes.SubscriptionPublic {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Please log in to view your subscription");
    };
    SubLib.getSubscription(subscriptions, caller);
  };

  /// Admin: activate subscription for a user (24 hours)
  public shared ({ caller }) func activateUserSubscription(userId : Common.UserId) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can activate subscriptions");
    };
    SubLib.activateSubscription(subscriptions, userId);
  };

  /// Public query — no auth required. Returns count of users with currently active subscriptions.
  public query func getActiveSubscriberCount() : async Nat {
    SubLib.getActiveSubscriberCount(subscriptions);
  };

  /// Check if caller has an active subscription
  public query ({ caller }) func checkSubscriptionStatus() : async Bool {
    SubLib.isSubscriptionActive(subscriptions, caller);
  };
};
