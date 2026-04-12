import Common "common";

module {
  public type Subscription = {
    userId : Common.UserId;
    var isActive : Bool;
    var expiresAt : Common.Timestamp;
  };

  public type SubscriptionPublic = {
    userId : Common.UserId;
    isActive : Bool;
    expiresAt : Common.Timestamp;
  };
};
