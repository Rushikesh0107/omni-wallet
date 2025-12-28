import 'package:flutter/material.dart';

class CardInstrument extends StatelessWidget {
  final dynamic card; 

  const CardInstrument({super.key, required this.card});

  String get maskedCardNumber {
    final number = card.cardNumber.toString();
    return '**** **** **** ${number.substring(number.length - 4)}';
  }

  @override
  Widget build(BuildContext context) {
    final isCredit = card.cardType == 'CREDIT';

    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(20),
        gradient: LinearGradient(
          colors: isCredit
              ? [Colors.deepPurple, Colors.indigo]
              : [Colors.teal, Colors.green],
        ),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.2),
            blurRadius: 10,
            offset: const Offset(0, 6),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            card.bankName,
            style: const TextStyle(
              color: Colors.white,
              fontSize: 18,
              fontWeight: FontWeight.bold,
            ),
          ),

          const SizedBox(height: 24),

          Text(
            maskedCardNumber,
            style: const TextStyle(
              color: Colors.white,
              fontSize: 20,
              letterSpacing: 2,
            ),
          ),

          const SizedBox(height: 16),

          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                card.fullName.toUpperCase(),
                style: const TextStyle(color: Colors.white),
              ),
              Text(
                '${card.expiryMonth}/${card.expiryYear}',
                style: const TextStyle(color: Colors.white),
              ),
            ],
          ),

          const SizedBox(height: 12),

          Align(
            alignment: Alignment.bottomRight,
            child: Text(
              card.cardType,
              style: const TextStyle(
                color: Colors.white70,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
