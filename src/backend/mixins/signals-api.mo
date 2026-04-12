import List "mo:core/List";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import SignalLib "../lib/signals";
import SubLib "../lib/subscriptions";
import SignalTypes "../types/signals";
import SubTypes "../types/subscriptions";
import Common "../types/common";

mixin (
  accessControlState : AccessControl.AccessControlState,
  signals : List.List<SignalTypes.Signal>,
  subscriptions : Map.Map<Common.UserId, SubTypes.Subscription>,
  nextSignalId : { var value : Nat },
) {
  /// Public query — no auth required. Returns only successful trades for preview by non-subscribed users.
  public query func listPublicSuccessSignals() : async [SignalTypes.Signal] {
    SignalLib.listPublicSuccessSignals(signals);
  };

  /// Public query — no auth required. Returns live trade statistics.
  public query func getTradeStats() : async SignalTypes.TradeStats {
    SignalLib.getTradeStats(signals);
  };

  /// List all signals — requires active subscription (users) or admin
  public query ({ caller }) func listSignals() : async [SignalTypes.Signal] {
    let isAdmin = AccessControl.isAdmin(accessControlState, caller);
    if (not isAdmin) {
      if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
        Runtime.trap("Unauthorized: Please log in to view signals");
      };
      if (not SubLib.isSubscriptionActive(subscriptions, caller)) {
        Runtime.trap("Subscription required: Please subscribe to access trading signals");
      };
    };
    SignalLib.listSignals(signals);
  };

  /// Admin: add a new trading signal
  public shared ({ caller }) func addSignal(input : SignalTypes.SignalInput) : async SignalTypes.Signal {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can add signals");
    };
    SignalLib.addSignal(signals, nextSignalId, input);
  };

  /// Admin: update an existing trading signal
  public shared ({ caller }) func updateSignal(id : Common.SignalId, input : SignalTypes.SignalInput) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can update signals");
    };
    SignalLib.updateSignal(signals, id, input);
  };

  /// Admin: delete a trading signal
  public shared ({ caller }) func deleteSignal(id : Common.SignalId) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can delete signals");
    };
    SignalLib.deleteSignal(signals, id);
  };

  /// Admin: mark a trade outcome as success or failed. proofKey is optional — only stored when status is #success.
  public shared ({ caller }) func markTradeOutcome(id : Common.SignalId, status : { #success; #failed }, proofKey : ?Text) : async SignalTypes.Signal {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can mark trade outcomes");
    };
    switch (SignalLib.markTradeOutcome(signals, id, status, proofKey)) {
      case (?signal) signal;
      case null Runtime.trap("Signal not found");
    };
  };
};
