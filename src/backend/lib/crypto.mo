import List "mo:core/List";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import CryptoTypes "../types/crypto";

module {

  // --- CryptoListing helpers ---

  public func newListing(
    id : Nat,
    name : Text,
    symbol : Text,
    description : Text,
    price : Float,
  ) : CryptoTypes.CryptoListing {
    {
      id;
      name;
      symbol;
      description;
      price;
      isActive = true;
      createdAt = Time.now();
    };
  };

  public func listActiveListings(
    listings : List.List<CryptoTypes.CryptoListing>
  ) : [CryptoTypes.CryptoListing] {
    listings.filter(func(l) { l.isActive }).toArray();
  };

  public func listAllListings(
    listings : List.List<CryptoTypes.CryptoListing>
  ) : [CryptoTypes.CryptoListing] {
    listings.toArray();
  };

  public func getListing(
    listings : List.List<CryptoTypes.CryptoListing>,
    id : Nat,
  ) : ?CryptoTypes.CryptoListing {
    listings.find(func(l) { l.id == id });
  };

  public func updateListing(
    listings : List.List<CryptoTypes.CryptoListing>,
    id : Nat,
    name : Text,
    symbol : Text,
    description : Text,
    price : Float,
    isActive : Bool,
  ) : Bool {
    var found = false;
    listings.mapInPlace(func(l) {
      if (l.id == id) {
        found := true;
        { l with name; symbol; description; price; isActive };
      } else { l };
    });
    found;
  };

  public func deleteListing(
    listings : List.List<CryptoTypes.CryptoListing>,
    id : Nat,
  ) : Bool {
    var found = false;
    listings.mapInPlace(func(l) {
      if (l.id == id) {
        found := true;
        { l with isActive = false };
      } else { l };
    });
    found;
  };

  // --- CryptoOrder helpers ---

  public func newOrder(
    id : Nat,
    caller : Principal,
    req : CryptoTypes.SubmitOrderRequest,
  ) : CryptoTypes.CryptoOrder {
    {
      id;
      userId = caller;
      cryptoType = req.cryptoType;
      cryptoSymbol = req.cryptoSymbol;
      walletAddress = req.walletAddress;
      network = req.network;
      screenshotUrl = req.screenshotUrl;
      var status = #pending;
      createdAt = Time.now();
      var reviewStatus = #none;
      var reviewComment = "";
      var completedAt = null;
    };
  };

  public func toPublic(order : CryptoTypes.CryptoOrder) : CryptoTypes.CryptoOrderPublic {
    {
      id = order.id;
      userId = order.userId;
      cryptoType = order.cryptoType;
      cryptoSymbol = order.cryptoSymbol;
      walletAddress = order.walletAddress;
      network = order.network;
      screenshotUrl = order.screenshotUrl;
      status = order.status;
      createdAt = order.createdAt;
      reviewStatus = order.reviewStatus;
      reviewComment = order.reviewComment;
      completedAt = order.completedAt;
    };
  };

  public func listUserOrders(
    orders : List.List<CryptoTypes.CryptoOrder>,
    userId : Principal,
  ) : [CryptoTypes.CryptoOrderPublic] {
    orders
      .filter(func(o) { Principal.equal(o.userId, userId) })
      .map<CryptoTypes.CryptoOrder, CryptoTypes.CryptoOrderPublic>(toPublic)
      .toArray();
  };

  public func listAllOrders(
    orders : List.List<CryptoTypes.CryptoOrder>
  ) : [CryptoTypes.CryptoOrderPublic] {
    orders.map<CryptoTypes.CryptoOrder, CryptoTypes.CryptoOrderPublic>(toPublic).toArray();
  };

  public func listPendingOrders(
    orders : List.List<CryptoTypes.CryptoOrder>
  ) : [CryptoTypes.CryptoOrderPublic] {
    orders
      .filter(func(o) { o.status == #pending })
      .map<CryptoTypes.CryptoOrder, CryptoTypes.CryptoOrderPublic>(toPublic)
      .toArray();
  };

  public func completeOrder(
    orders : List.List<CryptoTypes.CryptoOrder>,
    id : Nat,
  ) : Bool {
    var found = false;
    orders.mapInPlace(func(o) {
      if (o.id == id and o.status == #pending) {
        found := true;
        o.status := #completed;
        o.completedAt := ?Time.now();
        o;
      } else { o };
    });
    found;
  };

  public func rejectOrder(
    orders : List.List<CryptoTypes.CryptoOrder>,
    id : Nat,
  ) : Bool {
    var found = false;
    orders.mapInPlace(func(o) {
      if (o.id == id and o.status == #pending) {
        found := true;
        o.status := #rejected;
        o;
      } else { o };
    });
    found;
  };

  public func submitReview(
    orders : List.List<CryptoTypes.CryptoOrder>,
    orderId : Nat,
    caller : Principal,
    reviewStatus : CryptoTypes.ReviewStatus,
    comment : Text,
  ) : Bool {
    switch (orders.find(func(o) { o.id == orderId })) {
      case null { false };
      case (?order) {
        if (not Principal.equal(order.userId, caller)) { return false };
        if (order.status != #completed) { return false };
        if (order.reviewStatus != #none) { return false };
        orders.mapInPlace(func(o) {
          if (o.id == orderId) {
            o.reviewStatus := reviewStatus;
            o.reviewComment := comment;
            o;
          } else { o };
        });
        true;
      };
    };
  };

  /// Returns user's completed orders that have not yet been reviewed.
  /// Frontend uses this polling endpoint to trigger congratulations popup.
  public func getNewlyCompletedOrders(
    orders : List.List<CryptoTypes.CryptoOrder>,
    userId : Principal,
  ) : [CryptoTypes.CryptoOrderPublic] {
    orders
      .filter(func(o) {
        Principal.equal(o.userId, userId) and
        o.status == #completed and
        o.reviewStatus == #none
      })
      .map<CryptoTypes.CryptoOrder, CryptoTypes.CryptoOrderPublic>(toPublic)
      .toArray();
  };
};
