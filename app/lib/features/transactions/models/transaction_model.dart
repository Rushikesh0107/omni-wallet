import 'package:app/features/beneficiary/models/beneficiary_model.dart';
import 'package:app/features/home/models/card_instrument_model.dart';
import 'package:app/features/home/models/upi_instrument_model.dart';

class Transaction {
  final String id;
  final String userId;
  final String amount;
  final String status;
  final String beneficiaryId;
  final DateTime createdAt;
  final DateTime updatedAt;

  final String? cardInstrumentId;
  final String? upiInstrumentId;

  final CardInstrument? cardInstrument;
  final UpiInstrument? upiInstrument;
  final Beneficiary beneficiary;

  Transaction({
    required this.id,
    required this.userId,
    required this.amount,
    required this.status,
    required this.beneficiaryId,
    required this.createdAt,
    required this.updatedAt,
    this.cardInstrumentId,
    this.upiInstrumentId,
    this.cardInstrument,
    this.upiInstrument,
    required this.beneficiary,
  });

  factory Transaction.fromJson(Map<String, dynamic> json) {
    return Transaction(
      id: json['id'],
      userId: json['userId'],
      amount: json['amount'],
      status: json['status'],
      beneficiaryId: json['beneficiaryId'],
      createdAt: DateTime.parse(json['createdAt']),
      updatedAt: DateTime.parse(json['updatedAt']),
      cardInstrumentId: json['cardInstrumentId'],
      upiInstrumentId: json['upiInstrumentId'],
      cardInstrument: json['cardInstrument'] != null
          ? CardInstrument.fromJson(json['cardInstrument'])
          : null,
      upiInstrument: json['upiInstrument'] != null
          ? UpiInstrument.fromJson(json['upiInstrument'])
          : null,
      beneficiary: Beneficiary.fromJson(json['beneficiary']),
    );
  }
}
