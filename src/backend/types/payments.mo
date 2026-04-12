import Common "common";
import Storage "mo:caffeineai-object-storage/Storage";

module {
  public type PaymentStatus = { #pending; #approved; #rejected };

  public type Payment = {
    id : Common.PaymentId;
    userId : Common.UserId;
    screenshotBlob : Storage.ExternalBlob;
    utrNumber : Text;
    senderName : Text;
    status : PaymentStatus;
    timestamp : Common.Timestamp;
    rejectionReason : ?Text;
  };

  public type PaymentPublic = {
    id : Common.PaymentId;
    userId : Common.UserId;
    screenshotBlob : Storage.ExternalBlob;
    utrNumber : Text;
    senderName : Text;
    status : PaymentStatus;
    timestamp : Common.Timestamp;
    rejectionReason : ?Text;
  };
};
