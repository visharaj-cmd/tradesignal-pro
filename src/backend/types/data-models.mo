module {
  public type ServiceId = Nat;

  public type Service = {
    id : ServiceId;
    title : Text;
    description : Text;
    iconName : Text;
    sortOrder : Nat;
  };

  public type ContactDetails = {
    phone : Text;
    whatsapp : Text;
    email : Text;
    address : Text;
    socialMedia : [SocialLink];
  };

  public type SocialLink = {
    platform : Text;
    url : Text;
  };

  public type LeadId = Nat;

  public type Lead = {
    id : LeadId;
    fullName : Text;
    contactNumber : Text;
    timestamp : Int;
  };

  public type AdminAuth = {
    passwordHash : Text;
  };
};
