import 'package:app/features/home/screens/components/add_card_instrument.dart';
import 'package:app/features/home/screens/components/add_upi_instrument.dart';
import 'package:app/features/home/screens/components/card_instrument.dart';
import 'package:app/features/home/screens/components/upi_instrument.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../provider/home_provider.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Consumer<HomeProvider>(
      builder: (context, home, _) {
        if (home.loading) {
          return const Scaffold(
            body: Center(child: CircularProgressIndicator()),
          );
        }

        if (home.error != null) {
          print(home.error);
          return Scaffold(body: Center(child: Text('Error: ${home.error}')));
        }

        final user = home.user;
        final cardInstruments = user?.cardInstruments;
        final upiInstruments = user?.upiInstruments;

        return Scaffold(
          body: Padding(
            padding: const EdgeInsets.all(16.0),
            child: SingleChildScrollView(
              scrollDirection: Axis.vertical,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Wrap(
                    spacing: 12,
                    runSpacing: 12,
                    children: [
                      ElevatedButton(
                        onPressed: () {
                          Navigator.of(context).push(
                            MaterialPageRoute(
                              builder: (_) =>
                                  AddCardInstrument(cardType: 'credit'),
                            ),
                          );
                        },
                        child: const Text("+ Credit Card"),
                      ),
                      ElevatedButton(
                        onPressed: () {
                          Navigator.of(context).push(
                            MaterialPageRoute(
                              builder: (_) =>
                                  AddCardInstrument(cardType: 'debit'),
                            ),
                          );
                        },
                        child: const Text("+ Debit Card"),
                      ),
                      ElevatedButton(
                        onPressed: () {
                          Navigator.of(context).push(MaterialPageRoute(builder:  (_) => AddUpiInstrument(instrumentType: 'upi')));
                        },
                        child: const Text("+ UPI"),
                      ),
                    ],
                  ),

                  const SizedBox(height: 24),

                  if (cardInstruments != null &&
                      cardInstruments.isNotEmpty) ...[
                    const Text(
                      'Your Cards',
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 12),
                    ...cardInstruments.map(
                      (card) => CardInstrument(card: card),
                    ),
                  ],

                  const SizedBox(height: 24),

                  if (upiInstruments != null && upiInstruments.isNotEmpty) ...[
                    const Text(
                      'UPI',
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 12),
                    ...upiInstruments.map((upi) => UpiInstrument(upi: upi)),
                  ],
                ],
              ),
            ),
          ),
        );
      },
    );
  }
}
