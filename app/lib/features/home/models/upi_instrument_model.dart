class UpiInstrument {
  final String id;
  final String userId;
  final String upiId;
  final String upiName;
  final String upiPhone;
  final String qrCode;

  UpiInstrument({
    required this.id,
    required this.userId,
    required this.upiId,
    required this.upiName,
    required this.upiPhone,
    required this.qrCode,
  });

  factory UpiInstrument.fromJson(Map<String, dynamic> json) {
    return UpiInstrument(
      id: json['id'] as String,
      userId: json['userId'] as String,
      upiId: json['upiId'] as String,
      upiName: json['upiName'] as String,
      upiPhone: json['upiPhone'] as String,
      qrCode: json['qrCode'] as String,
    );
  }
}