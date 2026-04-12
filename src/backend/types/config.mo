import Storage "mo:caffeineai-object-storage/Storage";

module {
  public type UpiConfig = {
    var upiId : Text;
    var qrCodeBlob : ?Storage.ExternalBlob;
  };

  public type UpiConfigPublic = {
    upiId : Text;
    qrCodeBlob : ?Storage.ExternalBlob;
  };
};
