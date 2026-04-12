import List "mo:core/List";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Storage "mo:caffeineai-object-storage/Storage";
import Types "../types/payments";
import Common "../types/common";

module {
  // 5 minutes in nanoseconds
  let DUPLICATE_WINDOW_NANOS : Int = 300_000_000_000;

  func toPublic(p : Types.Payment) : Types.PaymentPublic { p };

  public func listPayments(payments : List.List<Types.Payment>) : [Types.PaymentPublic] {
    payments.map<Types.Payment, Types.PaymentPublic>(func(p) { toPublic(p) }).toArray();
  };

  public func getPaymentsByUser(payments : List.List<Types.Payment>, userId : Common.UserId) : [Types.PaymentPublic] {
    payments
      .filter(func(p) { p.userId == userId })
      .map<Types.Payment, Types.PaymentPublic>(func(p) { toPublic(p) })
      .toArray();
  };

  public func submitPayment(
    payments : List.List<Types.Payment>,
    nextId : { var value : Nat },
    userId : Common.UserId,
    screenshotBlob : Storage.ExternalBlob,
    utrNumber : Text,
    senderName : Text,
  ) : Types.PaymentPublic {
    let now = Time.now();
    // Guard: no duplicate submission within 5 minutes
    let recent = payments.find(func(p) {
      p.userId == userId and (now - p.timestamp) < DUPLICATE_WINDOW_NANOS
    });
    switch (recent) {
      case (?_) { Runtime.trap("Duplicate payment: please wait before submitting again") };
      case null {};
    };
    let id = nextId.value;
    nextId.value += 1;
    let payment : Types.Payment = {
      id;
      userId;
      screenshotBlob;
      utrNumber;
      senderName;
      status = #pending;
      timestamp = now;
      rejectionReason = null;
    };
    payments.add(payment);
    toPublic(payment);
  };

  public func approvePayment(payments : List.List<Types.Payment>, id : Common.PaymentId) : Bool {
    var found = false;
    payments.mapInPlace(func(p) {
      if (p.id == id) {
        found := true;
        { p with status = #approved };
      } else { p };
    });
    found;
  };

  public func rejectPayment(payments : List.List<Types.Payment>, id : Common.PaymentId, reason : Text) : Bool {
    var found = false;
    payments.mapInPlace(func(p) {
      if (p.id == id) {
        found := true;
        { p with status = #rejected; rejectionReason = ?reason };
      } else { p };
    });
    found;
  };
};
