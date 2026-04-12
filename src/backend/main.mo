import List "mo:core/List";
import Map "mo:core/Map";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";
import SignalTypes "types/signals";
import PaymentTypes "types/payments";
import SubTypes "types/subscriptions";
import ConfigTypes "types/config";
import CertTypes "types/certificates";
import Common "types/common";
import SignalsApi "mixins/signals-api";
import PaymentsApi "mixins/payments-api";
import SubscriptionsApi "mixins/subscriptions-api";
import ConfigApi "mixins/config-api";
import AdminAuthApi "mixins/admin-auth-api";
import CertificatesApi "mixins/certificates-api";


actor {
  // --- Authorization ---
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // --- Object Storage ---
  include MixinObjectStorage();

  // --- State ---
  let signals = List.empty<SignalTypes.Signal>();
  let nextSignalId = { var value : Nat = 0 };

  let payments = List.empty<PaymentTypes.Payment>();
  let nextPaymentId = { var value : Nat = 0 };

  let subscriptions = Map.empty<Common.UserId, SubTypes.Subscription>();

  let upiConfig : ConfigTypes.UpiConfig = {
    var upiId = "6203460064@ptsbi";
    var qrCodeBlob = null;
  };

  // --- Certificate State ---
  let certRequests = List.empty<CertTypes.CertificateRequest>();
  let nextCertId = { var value : Nat = 0 };
  let masterTemplate : CertTypes.MasterTemplate = {
    var template = null;
    var uploadedAt = 0;
  };

  // --- Mixins ---
  include SignalsApi(accessControlState, signals, subscriptions, nextSignalId);
  include PaymentsApi(accessControlState, payments, nextPaymentId);
  include SubscriptionsApi(accessControlState, subscriptions);
  include ConfigApi(accessControlState, upiConfig);
  include AdminAuthApi(accessControlState);
  include CertificatesApi(accessControlState, certRequests, nextCertId, masterTemplate);
};
