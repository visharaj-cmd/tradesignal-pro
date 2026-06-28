module {
  public type Currency = {
    #USD;
    #INR;
  };

  public type PaymentType = {
    #UPI;
    #CryptoWallet;
  };

  public type HeroContent = {
    headline : Text;
    subtitle : Text;
    ctaText : Text;
    ctaSubtext : Text;
  };

  public type WhyChooseFeature = {
    icon : Text;
    title : Text;
    description : Text;
  };

  public type WhyChooseSection = {
    title : Text;
    features : [WhyChooseFeature];
  };

  public type FooterLink = {
    text : Text;
    url : Text;
  };

  public type FooterContent = {
    copyright : Text;
    links : [FooterLink];
  };

  public type ButtonLabels = {
    whatsappButtonText : Text;
    supportButtonText : Text;
  };

  public type AppSettings = {
    currency : Currency;
    paymentType : PaymentType;
    upiId : Text;
    walletAddress : Text;
    walletNetwork : Text;
    heroContent : HeroContent;
    whyChoose : WhyChooseSection;
    footerContent : FooterContent;
    buttonLabels : ButtonLabels;
  };
};
