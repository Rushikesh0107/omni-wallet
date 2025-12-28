import 'package:flutter/material.dart';
import 'package:qr_flutter/qr_flutter.dart';

class UpiInstrument extends StatelessWidget {
  final dynamic upi;

  const UpiInstrument({super.key, required this.upi});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.08),
            blurRadius: 8,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Row(
        children: [
          QrImageView(
            data: upi.upiId,
            size: 80,
          ),

          const SizedBox(width: 16),

          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  upi.upiName ?? 'UPI',
                  style: const TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(height: 6),
                Text(
                  upi.upiId,
                  style: const TextStyle(color: Colors.grey),
                ),
              ],
            ),
          ),

          const Icon(Icons.qr_code, color: Colors.grey),
        ],
      ),
    );
  }
}
