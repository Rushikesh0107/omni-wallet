import 'package:app/features/home/models/card_instrument_model.dart';
import 'package:app/features/home/models/upi_instrument_model.dart';

class User {
  final String id;
  final String email;
  final DateTime createdAt;
  final DateTime updatedAt;
  final List<CardInstrument> cardInstruments;
  final List<UpiInstrument> upiInstruments;

  User({
    required this.id,
    required this.email,
    required this.createdAt,
    required this.updatedAt,
    required this.cardInstruments,
    required this.upiInstruments,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'] as String,
      email: json['email'] as String,
      createdAt: DateTime.parse(json['createdAt'] as String),
      updatedAt: DateTime.parse(json['updatedAt'] as String),
      cardInstruments: (json['cardInstruments'] as List)
          .map((e) => CardInstrument.fromJson(e))
          .toList(),
      upiInstruments: (json['upiInstruments'] as List)
          .map((e) => UpiInstrument.fromJson(e))
          .toList(),
    );
  }
}
