import Storage "mo:caffeineai-object-storage/Storage";
import Types "../types/config";

module {
  public func getUpiConfig(cfg : Types.UpiConfig) : Types.UpiConfigPublic {
    {
      upiId = cfg.upiId;
      qrCodeBlob = cfg.qrCodeBlob;
    };
  };

  public func updateUpiId(cfg : Types.UpiConfig, upiId : Text) : () {
    cfg.upiId := upiId;
  };

  public func updateQrCode(cfg : Types.UpiConfig, qrCodeBlob : Storage.ExternalBlob) : () {
    cfg.qrCodeBlob := ?qrCodeBlob;
  };
};
