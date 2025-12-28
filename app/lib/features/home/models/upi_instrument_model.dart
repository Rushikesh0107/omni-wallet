class UpiInstrument {
  final String id;
  final String upiId;
  final String upiName;
  final String qrCode;

  UpiInstrument({
    required this.id,
    required this.upiId,
    required this.upiName,
    required this.qrCode,
  });

  factory UpiInstrument.fromJson(Map<String, dynamic> json) {
    return UpiInstrument(
      id: json['id'] as String,
      upiId: json['upiId'] as String,
      upiName: json['upiName'] as String,
      qrCode: json['qrCode'] as String,
    );
  }
}
