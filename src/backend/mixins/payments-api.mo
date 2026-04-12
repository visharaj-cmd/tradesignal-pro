import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Storage "mo:caffeineai-object-storage/Storage";
import AccessControl "mo:caffeineai-authorization/access-control";
import PaymentLib "../lib/payments";
import PaymentTypes "../types/payments";
import Common "../types/common";

mixin (
  accessControlState : AccessControl.AccessControlState,
  payments : List.List<PaymentTypes.Payment>,
  nextPaymentId : { var value : Nat },
) {
  /// User: submit a payment with screenshot, UTR, and sender name
  public shared ({ caller }) func submitPayment(
    screenshotBlob : Storage.ExternalBlob,
    utrNumber : Text,
    senderName : Text,
  ) : async PaymentTypes.PaymentPublic {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Please log in to submit a payment");
    };
    PaymentLib.submitPayment(payments, nextPaymentId, caller, screenshotBlob, utrNumber, senderName);
  };

  /// User: get own payment history
  public query ({ caller }) func getMyPayments() : async [PaymentTypes.PaymentPublic] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Please log in to view your payments");
    };
    PaymentLib.getPaymentsByUser(payments, caller);
  };

  /// Admin: list all payments
  public query ({ caller }) func listAllPayments() : async [PaymentTypes.PaymentPublic] {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can view all payments");
    };
    PaymentLib.listPayments(payments);
  };

  /// Admin: approve a payment
  public shared ({ caller }) func approvePayment(id : Common.PaymentId) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can approve payments");
    };
    PaymentLib.approvePayment(payments, id);
  };

  /// Admin: reject a payment with a reason
  public shared ({ caller }) func rejectPayment(id : Common.PaymentId, reason : Text) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can reject payments");
    };
    PaymentLib.rejectPayment(payments, id, reason);
  };
};
