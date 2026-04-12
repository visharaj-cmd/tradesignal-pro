import Map "mo:core/Map";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Types "../types/subscriptions";
import Common "../types/common";

module {
  // 24 hours in nanoseconds
  public let DAY_NANOS : Int = 86_400_000_000_000;

  public func getSubscription(subs : Map.Map<Common.UserId, Types.Subscription>, userId : Common.UserId) : ?Types.SubscriptionPublic {
    switch (subs.get(userId)) {
      case null null;
      case (?sub) {
        let now = Time.now();
        let active = sub.isActive and sub.expiresAt > now;
        if (not active and sub.isActive) {
          sub.isActive := false;
        };
        ?{
          userId = sub.userId;
          isActive = active;
          expiresAt = sub.expiresAt;
        };
      };
    };
  };

  public func activateSubscription(subs : Map.Map<Common.UserId, Types.Subscription>, userId : Common.UserId) : () {
    let expiresAt = Time.now() + DAY_NANOS;
    switch (subs.get(userId)) {
      case null {
        let sub : Types.Subscription = {
          userId;
          var isActive = true;
          var expiresAt = expiresAt;
        };
        subs.add(userId, sub);
      };
      case (?sub) {
        sub.isActive := true;
        sub.expiresAt := expiresAt;
      };
    };
  };

  public func isSubscriptionActive(subs : Map.Map<Common.UserId, Types.Subscription>, userId : Common.UserId) : Bool {
    let now = Time.now();
    switch (subs.get(userId)) {
      case null false;
      case (?sub) {
        let active = sub.isActive and sub.expiresAt > now;
        if (not active and sub.isActive) {
          sub.isActive := false;
        };
        active;
      };
    };
  };

  public func getActiveSubscriberCount(subs : Map.Map<Common.UserId, Types.Subscription>) : Nat {
    let now = Time.now();
    subs.foldLeft(0, func(acc : Nat, _ : Common.UserId, sub : Types.Subscription) : Nat {
      if (sub.isActive and sub.expiresAt > now) acc + 1 else acc;
    });
  };

  public func expireSubscriptions(subs : Map.Map<Common.UserId, Types.Subscription>) : () {
    let now = Time.now();
    subs.forEach(func(_, sub) {
      if (sub.isActive and sub.expiresAt <= now) {
        sub.isActive := false;
      };
    });
  };
};
