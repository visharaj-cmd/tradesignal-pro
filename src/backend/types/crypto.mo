import Common "common";

module {
  public type UserId = Common.UserId;

  public type CryptoListing = {
    id : Nat;
    name : Text;
    symbol : Text;
    description : Text;
    price : Float;
    isActive : Bool;
    createdAt : Int;
  };

  public type ReviewStatus = {
    #none;
    #trusted;
    #notTrusted;
  };

  public type OrderStatus = {
    #pending;
    #completed;
    #rejected;
  };

  public type CryptoOrder = {
    id : Nat;
    userId : Principal;
    cryptoType : Text;
    cryptoSymbol : Text;
    walletAddress : Text;
    network : Text;
    screenshotUrl : Text;
    var status : OrderStatus;
    createdAt : Int;
    var reviewStatus : ReviewStatus;
    var reviewComment : Text;
    var completedAt : ?Int;
  };

  public type CryptoOrderPublic = {
    id : Nat;
    userId : Principal;
    cryptoType : Text;
    cryptoSymbol : Text;
    walletAddress : Text;
    network : Text;
    screenshotUrl : Text;
    status : OrderStatus;
    createdAt : Int;
    reviewStatus : ReviewStatus;
    reviewComment : Text;
    completedAt : ?Int;
  };

  public type SubmitOrderRequest = {
    cryptoType : Text;
    cryptoSymbol : Text;
    walletAddress : Text;
    network : Text;
    screenshotUrl : Text;
  };
};
