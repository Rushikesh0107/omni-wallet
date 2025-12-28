class Beneficiary {
  final String id;
  final String userId;
  final String name;
  final String phoneNumber;

  Beneficiary({
    required this.id,
    required this.userId,
    required this.name,
    required this.phoneNumber,
  });

  factory Beneficiary.fromJson(Map<String, dynamic> json) {
    return Beneficiary(
      id: json['id'] as String,
      userId: json['userId'] as String,
      name : json['name'] as String,
      phoneNumber: json['phoneNumber'] as String
    );
  }
}
