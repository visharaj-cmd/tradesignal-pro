import Common "common";

module {
  public type SignalType = { #buy; #sell };

  public type TradeStatus = { #pending; #success; #failed };

  public type Signal = {
    id : Common.SignalId;
    pair : Text;
    signalType : SignalType;
    entryPrice : Float;
    stopLoss : Float;
    takeProfit : Float;
    confidence : Nat; // 0-100
    timestamp : Common.Timestamp;
    isActive : Bool;
    tradeStatus : TradeStatus;
    screenshotKey : ?Text;
    proofKey : ?Text;
  };

  public type TradeStats = {
    totalSignals : Nat;
    successSignals : Nat;
    failedSignals : Nat;
    winRate : Float;
  };

  public type SignalInput = {
    pair : Text;
    signalType : SignalType;
    entryPrice : Float;
    stopLoss : Float;
    takeProfit : Float;
    confidence : Nat;
    screenshotKey : ?Text;
    tradeStatus : ?TradeStatus;
  };
};
