class SendMoney {
  final String id;
  final String userId;
  final String amount;
  final String status;
  final String beneficiaryId;
  final DateTime createdAt;
  final DateTime updatedAt;
  final String? cardInstrumentId;
  final String? upiInstrumentId;

  SendMoney({
    required this.id,
    required this.userId,
    required this.amount,
    required this.status,
    required this.beneficiaryId,
    required this.createdAt,
    required this.updatedAt,
    this.cardInstrumentId,
    this.upiInstrumentId,
  });

  factory SendMoney.fromJson(Map<String, dynamic> json) {
    return SendMoney(
      id: json['id'] as String,
      userId: json['userId'] as String,
      amount: json['amount'] as String,
      status: json['status'] as String,
      beneficiaryId: json['beneficiaryId'] as String,
      createdAt: DateTime.parse(json['createdAt']),
      updatedAt: DateTime.parse(json['updatedAt']),
      cardInstrumentId: json['cardInstrumentId'] as String?,
      upiInstrumentId: json['upiInstrumentId'] as String?,
    );
  }
}
