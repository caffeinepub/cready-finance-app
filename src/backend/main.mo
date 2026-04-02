import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Int "mo:core/Int";
import Order "mo:core/Order";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  module Applicant {
    public type ProductType = {
      #personalLoan;
      #businessLoan;
      #creditCard;
    };

    public type ApplicationStatus = {
      #pending;
      #approved;
      #rejected;
    };

    public type Application = {
      user : Principal;
      productType : ProductType;
      lender : Text;
      productName : Text;
      status : ApplicationStatus;
    };

    public type CreditScore = Nat;

    public type Applicant = {
      email : Text;
      mobile : Text;
      incomeRange : Text;
    };
  };

  type ProductType = Applicant.ProductType;
  type ApplicationStatus = Applicant.ApplicationStatus;
  type Application = Applicant.Application;
  type CreditScore = Applicant.CreditScore;
  type Applicant = Applicant.Applicant;

  public type Profile = {
    id : Principal;
    name : Text;
    email : Text;
    pan : Text;
    mobile : Text;
    incomeRange : Text;
    creditScore : Nat;
    created : Int;
    lastLogin : Int;
  };

  module Profile {
    public func compare(profile1 : Profile, profile2 : Profile) : Order.Order {
      switch (Text.compare(profile1.name, profile2.name)) {
        case (#equal) { Text.compare(profile1.email, profile2.email) };
        case (order) { order };
      };
    };

    public func compareByLastLogin(profile1 : Profile, profile2 : Profile) : Order.Order {
      Int.compare(profile1.lastLogin, profile2.lastLogin);
    };
  };

  public type UpdateProfileRequest = {
    name : Text;
    lastLogin : ?Int;
  };

  let profiles = Map.empty<Principal, Profile>();
  let applications = Map.empty<Principal, [Application]>();

  // Safe role check: returns false instead of trapping for unknown principals
  func hasUserPermission(caller : Principal) : Bool {
    if (caller.isAnonymous()) { return false };
    switch (accessControlState.userRoles.get(caller)) {
      case (null) { false };
      case (?role) { role == #admin or role == #user };
    };
  };

  // Required frontend functions
  public query ({ caller }) func getCallerUserProfile() : async ?Profile {
    if (caller.isAnonymous()) { return null };
    profiles.get(caller);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : Profile) : async () {
    if (not hasUserPermission(caller)) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    profiles.add(caller, profile);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?Profile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    profiles.get(user);
  };

  // Application-specific functions
  public shared ({ caller }) func register(name : Text, email : Text, pan : Text, mobile : Text, incomeRange : Text) : async () {
    if (profiles.containsKey(caller)) { Runtime.trap("User already registered!") };
    let now = Time.now();
    let profile : Profile = {
      id = caller;
      name;
      email;
      pan;
      mobile;
      incomeRange;
      creditScore = 0;
      created = now;
      lastLogin = now;
    };
    profiles.add(caller, profile);
    // Auto-assign #user role so the user can call protected endpoints immediately
    if (not accessControlState.userRoles.containsKey(caller)) {
      accessControlState.userRoles.add(caller, #user);
    };
  };

  public query ({ caller }) func isRegistered() : async Bool {
    if (caller.isAnonymous()) { return false };
    profiles.containsKey(caller);
  };

  public query ({ caller }) func getProfile(user : Principal) : async Profile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    switch (profiles.get(user)) {
      case (null) { Runtime.trap("User does not exist") };
      case (?profile) { profile };
    };
  };

  public shared ({ caller }) func updateProfile(name : Text, lastLogin : ?Int) : async () {
    if (not hasUserPermission(caller)) {
      Runtime.trap("Unauthorized: Only users can update profiles");
    };
    switch (profiles.get(caller)) {
      case (null) { Runtime.trap("User does not exist") };
      case (?profile) {
        let updatedProfile : Profile = {
          id = profile.id;
          name;
          email = profile.email;
          pan = profile.pan;
          mobile = profile.mobile;
          incomeRange = profile.incomeRange;
          creditScore = profile.creditScore;
          created = profile.created;
          lastLogin = switch (lastLogin) {
            case (null) { profile.lastLogin };
            case (?login) { login };
          };
        };
        profiles.add(caller, updatedProfile);
      };
    };
  };

  public shared ({ caller }) func submitApplication(productType : ProductType, lender : Text, productName : Text) : async () {
    if (not hasUserPermission(caller)) {
      Runtime.trap("Unauthorized: Only users can submit applications");
    };
    let application : Application = {
      user = caller;
      productType;
      lender;
      productName;
      status = #pending;
    };

    let userApplications = switch (applications.get(caller)) {
      case (null) { [application] };
      case (?apps) { apps.concat([application]) };
    };

    applications.add(caller, userApplications);
  };

  public query ({ caller }) func getMyApplications() : async [Application] {
    if (not hasUserPermission(caller)) {
      return [];
    };
    switch (applications.get(caller)) {
      case (null) { [] };
      case (?apps) { apps };
    };
  };

  public shared ({ caller }) func updateCreditScore(creditScore : CreditScore) : async () {
    if (not hasUserPermission(caller)) {
      Runtime.trap("Unauthorized: Only users can update credit score");
    };
    switch (profiles.get(caller)) {
      case (null) { Runtime.trap("User does not exist") };
      case (?profile) {
        let updatedProfile : Profile = {
          id = profile.id;
          name = profile.name;
          email = profile.email;
          pan = profile.pan;
          mobile = profile.mobile;
          incomeRange = profile.incomeRange;
          creditScore;
          created = profile.created;
          lastLogin = profile.lastLogin;
        };
        profiles.add(caller, updatedProfile);
      };
    };
  };

  public query ({ caller }) func getCreditScore(user : Principal) : async CreditScore {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own credit score");
    };
    switch (profiles.get(user)) {
      case (null) { Runtime.trap("User does not exist") };
      case (?profile) { profile.creditScore };
    };
  };

  public query ({ caller }) func getAllProfiles() : async [Profile] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all profiles");
    };
    profiles.values().toArray().sort();
  };

  public query ({ caller }) func getAllProfilesSortedByLatestActivity() : async [Profile] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all profiles");
    };
    profiles.values().toArray().sort(Profile.compareByLastLogin);
  };
};
