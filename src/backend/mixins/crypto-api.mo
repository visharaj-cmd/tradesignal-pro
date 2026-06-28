import List "mo:core/List";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import CryptoTypes "../types/crypto";
import CryptoLib "../lib/crypto";

mixin (
  accessControlState : AccessControl.AccessControlState,
  listings : List.List<CryptoTypes.CryptoListing>,
  orders : List.List<CryptoTypes.CryptoOrder>,
  nextListingId : { var value : Nat },
  nextOrderId : { var value : Nat },
) {

  // ── Admin: Listing management ──────────────────────────────────────────

  public shared ({ caller }) func adminAddCryptoListing(
    name : Text,
    symbol : Text,
    description : Text,
    price : Float,
  ) : async Nat {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized");
    };
    let id = nextListingId.value;
    nextListingId.value += 1;
    let listing = CryptoLib.newListing(id, name, symbol, description, price);
    listings.add(listing);
    id;
  };

  public shared ({ caller }) func adminUpdateCryptoListing(
    id : Nat,
    name : Text,
    symbol : Text,
    description : Text,
    price : Float,
    isActive : Bool,
  ) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized");
    };
    CryptoLib.updateListing(listings, id, name, symbol, description, price, isActive);
  };

  public shared ({ caller }) func adminDeleteCryptoListing(id : Nat) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized");
    };
    CryptoLib.deleteListing(listings, id);
  };

  public query func adminListAllCryptoListings() : async [CryptoTypes.CryptoListing] {
    CryptoLib.listAllListings(listings);
  };

  // ── Public: Listing queries ────────────────────────────────────────────

  public query func listActiveCryptoListings() : async [CryptoTypes.CryptoListing] {
    CryptoLib.listActiveListings(listings);
  };

  public query func getCryptoListing(id : Nat) : async ?CryptoTypes.CryptoListing {
    CryptoLib.getListing(listings, id);
  };

  // ── User: Order submission ─────────────────────────────────────────────

  public shared ({ caller }) func submitCryptoOrder(
    req : CryptoTypes.SubmitOrderRequest
  ) : async Nat {
    let id = nextOrderId.value;
    nextOrderId.value += 1;
    let order = CryptoLib.newOrder(id, caller, req);
    orders.add(order);
    id;
  };

  public query ({ caller }) func getMyOrders() : async [CryptoTypes.CryptoOrderPublic] {
    CryptoLib.listUserOrders(orders, caller);
  };

  /// Polling endpoint: returns user's completed orders that have not yet been reviewed.
  /// Frontend polls this to trigger congratulations popup.
  public query ({ caller }) func pollNewlyCompletedOrders() : async [CryptoTypes.CryptoOrderPublic] {
    CryptoLib.getNewlyCompletedOrders(orders, caller);
  };

  public shared ({ caller }) func submitOrderReview(
    orderId : Nat,
    reviewStatus : CryptoTypes.ReviewStatus,
    comment : Text,
  ) : async Bool {
    CryptoLib.submitReview(orders, orderId, caller, reviewStatus, comment);
  };

  // ── Admin: Order management ────────────────────────────────────────────

  public query func adminListAllOrders() : async [CryptoTypes.CryptoOrderPublic] {
    CryptoLib.listAllOrders(orders);
  };

  public query func adminListPendingOrders() : async [CryptoTypes.CryptoOrderPublic] {
    CryptoLib.listPendingOrders(orders);
  };

  public shared ({ caller }) func adminCompleteOrder(id : Nat) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized");
    };
    CryptoLib.completeOrder(orders, id);
  };

  public shared ({ caller }) func adminRejectOrder(id : Nat) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized");
    };
    CryptoLib.rejectOrder(orders, id);
  };
};
