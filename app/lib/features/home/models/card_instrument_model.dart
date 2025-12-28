class CardInstrument {
  final String id;
  final String userId;
  final String cardType;
  final String bankName;
  final String fullName;
  final String cardNumber;
  final String expiryMonth;
  final String expiryYear;
  final String cvv;

  CardInstrument({
    required this.id,
    required this.userId,
    required this.cardType,
    required this.bankName,
    required this.fullName,
    required this.cardNumber,
    required this.expiryMonth,
    required this.expiryYear,
    required this.cvv,
  });

  factory CardInstrument.fromJson(Map<String, dynamic> json) {
    return CardInstrument(
      id: json['id'] as String,
      userId: json['userId'] as String,
      cardType: json['cardType'] as String,
      bankName: json['bankName'] as String,
      fullName: json['fullName'] as String,
      cardNumber: json['cardNumber'] as String,
      expiryMonth: json['expiryMonth'] as String,
      expiryYear: json['expiryYear'] as String,
      cvv: json['cvv'] as String,
    );
  }
}
