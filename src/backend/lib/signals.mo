import List "mo:core/List";
import Time "mo:core/Time";
import Nat "mo:core/Nat";
import Types "../types/signals";
import Common "../types/common";

module {
  public func listSignals(signals : List.List<Types.Signal>) : [Types.Signal] {
    signals.filter(func(s) { s.isActive }).toArray();
  };

  public func listPublicSuccessSignals(signals : List.List<Types.Signal>) : [Types.Signal] {
    signals.filter(func(s) { s.isActive and s.tradeStatus == #success }).toArray();
  };

  public func getSignal(signals : List.List<Types.Signal>, id : Common.SignalId) : ?Types.Signal {
    signals.find(func(s) { s.id == id });
  };

  public func addSignal(signals : List.List<Types.Signal>, nextId : { var value : Nat }, input : Types.SignalInput) : Types.Signal {
    let id = nextId.value;
    nextId.value += 1;
    let signal : Types.Signal = {
      id;
      pair = input.pair;
      signalType = input.signalType;
      entryPrice = input.entryPrice;
      stopLoss = input.stopLoss;
      takeProfit = input.takeProfit;
      confidence = input.confidence;
      timestamp = Time.now();
      isActive = true;
      tradeStatus = switch (input.tradeStatus) { case (?s) s; case null #pending };
      screenshotKey = input.screenshotKey;
      proofKey = null;
    };
    signals.add(signal);
    signal;
  };

  public func updateSignal(signals : List.List<Types.Signal>, id : Common.SignalId, input : Types.SignalInput) : Bool {
    var found = false;
    signals.mapInPlace(func(s) {
      if (s.id == id and s.isActive) {
        found := true;
        { s with
          pair = input.pair;
          signalType = input.signalType;
          entryPrice = input.entryPrice;
          stopLoss = input.stopLoss;
          takeProfit = input.takeProfit;
          confidence = input.confidence;
          tradeStatus = switch (input.tradeStatus) { case (?st) st; case null s.tradeStatus };
          screenshotKey = switch (input.screenshotKey) { case (?k) ?k; case null s.screenshotKey };
        };
      } else { s };
    });
    found;
  };

  public func deleteSignal(signals : List.List<Types.Signal>, id : Common.SignalId) : Bool {
    var found = false;
    signals.mapInPlace(func(s) {
      if (s.id == id and s.isActive) {
        found := true;
        { s with isActive = false };
      } else { s };
    });
    found;
  };

  public func markTradeOutcome(signals : List.List<Types.Signal>, id : Common.SignalId, status : { #success; #failed }, proofKey : ?Text) : ?Types.Signal {
    var result : ?Types.Signal = null;
    signals.mapInPlace(func(s) {
      if (s.id == id) {
        let updated = { s with
          tradeStatus = status;
          proofKey = switch (status) {
            case (#success) proofKey;
            case (#failed) s.proofKey;
          };
        };
        result := ?updated;
        updated;
      } else { s };
    });
    result;
  };

  public func getTradeStats(signals : List.List<Types.Signal>) : Types.TradeStats {
    var total : Nat = 0;
    var success : Nat = 0;
    var failed : Nat = 0;
    signals.forEach(func(s) {
      if (s.isActive) {
        total += 1;
        switch (s.tradeStatus) {
          case (#success) success += 1;
          case (#failed) failed += 1;
          case (#pending) {};
        };
      };
    });
    let winRate : Float = if (total == 0) 0.0 else success.toFloat() / total.toFloat() * 100.0;
    {
      totalSignals = total;
      successSignals = success;
      failedSignals = failed;
      winRate;
    };
  };
};
