import 'package:app/features/beneficiary/provider/beneficiary_provider.dart';
import 'package:app/features/home/provider/home_provider.dart';
import 'package:app/features/send_money/provider/send_money_provider.dart';
import 'package:app/features/send_money/screens/success_screen.dart';
import 'package:dropdown_button2/dropdown_button2.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class SendMoneyScreen extends StatelessWidget {
  SendMoneyScreen({super.key});

  final ValueNotifier<String> amountNotifier = ValueNotifier("");
  final ValueNotifier<String?> selectedBeneficiaryId = ValueNotifier(null);
  final ValueNotifier<String?> selectedInstrumentId = ValueNotifier(null);

  @override
  Widget build(BuildContext context) {
    final sendMoneyProvider = context.read<SendMoneyProvider>();

    final beneficiaries = context.watch<BeneficiaryProvider>().beneficiaries;

    final user = context.watch<HomeProvider>().user;

    final instruments = [
      ...?user?.cardInstruments.map(
        (c) => PaymentInstrumentOption(
          id: c.id,
          label:
              '${c.bankName} ${c.cardType} CARD •••• ${c.cardNumber.substring(c.cardNumber.length - 4)}',
          type: InstrumentType.card,
        ),
      ),
      ...?user?.upiInstruments.map(
        (u) => PaymentInstrumentOption(
          id: u.id,
          label: u.upiId,
          type: InstrumentType.upi,
        ),
      ),
    ];

    return Scaffold(
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              /// Amount Preview
              ValueListenableBuilder<String>(
                valueListenable: amountNotifier,
                builder: (_, value, __) {
                  return Text(
                    'Rs. ${value.isEmpty ? "0" : value}',
                    style: const TextStyle(
                      fontSize: 48,
                      fontWeight: FontWeight.w800,
                    ),
                  );
                },
              ),

              const SizedBox(height: 24),

              /// Amount Input
              TextField(
                keyboardType: TextInputType.number,
                decoration: const InputDecoration(
                  hintText: 'Enter amount',
                  border: OutlineInputBorder(),
                ),
                onChanged: (value) {
                  amountNotifier.value = value;
                },
              ),

              const SizedBox(height: 20),

              /// Beneficiary Dropdown
              ValueListenableBuilder<String?>(
                valueListenable: selectedBeneficiaryId,
                builder: (_, selected, __) {
                  return DropdownButtonFormField2<String>(
                    value: selected,
                    decoration: const InputDecoration(
                      border: OutlineInputBorder(),
                      labelText: 'Select Beneficiary',
                    ),
                    dropdownStyleData: const DropdownStyleData(
                      offset: Offset(0, -3),
                    ),
                    items: beneficiaries?.map((b) {
                      return DropdownMenuItem(
                        value: b.id,
                        child: Text(
                          b.name,
                          style: const TextStyle(fontSize: 15),
                        ),
                      );
                    }).toList(),
                    onChanged: (value) {
                      selectedBeneficiaryId.value = value;
                    },
                  );
                },
              ),

              const SizedBox(height: 16),

              ValueListenableBuilder<String?>(
                valueListenable: selectedInstrumentId,
                builder: (_, selected, __) {
                  return DropdownButtonFormField2<String>(
                    value: selected,
                    decoration: const InputDecoration(
                      border: OutlineInputBorder(),
                      labelText: 'Select Payment Method',
                    ),
                    dropdownStyleData: const DropdownStyleData(
                      offset: Offset(0, -3),
                    ),
                    items: instruments.map((i) {
                      return DropdownMenuItem(
                        value: i.id,
                        child: Row(
                          children: [
                            Icon(
                              i.type == InstrumentType.card
                                  ? Icons.credit_card
                                  : Icons.account_balance_wallet,
                              size: 18,
                            ),
                            const SizedBox(width: 8),
                            Text(i.label),
                          ],
                        ),
                      );
                    }).toList(),
                    onChanged: (value) {
                      selectedInstrumentId.value = value;
                    },
                  );
                },
              ),

              const Spacer(),

              /// Send Button
              SizedBox(
                width: 160,
                height: 48,
                child: ElevatedButton(
                  onPressed: () {
                    final amountText = amountNotifier.value.trim();

                    if (amountText.isEmpty) {
                      _showError(context, 'Enter an amount');
                      return;
                    }

                    final amount = int.tryParse(amountText);
                    if (amount == null || amount <= 0) {
                      _showError(context, 'Enter a valid amount');
                      return;
                    }

                    if (selectedBeneficiaryId.value == null) {
                      _showError(context, 'Select a beneficiary');
                      return;
                    }

                    if (selectedInstrumentId.value == null) {
                      _showError(context, 'Select a payment method');
                      return;
                    }

                    final selectedInstrument = instruments.firstWhere(
                      (i) => i.id == selectedInstrumentId.value,
                    );

                    final payload;

                    if (selectedInstrument.type == InstrumentType.card) {
                      payload = {
                        'amount': amount,
                        'beneficiaryId': selectedBeneficiaryId.value?.trim(),
                        'cardDetails': selectedInstrumentId.value?.trim(),
                      };
                    } else {
                      payload = {
                        'amount': amount,
                        'beneficiaryId': selectedBeneficiaryId.value,
                        'upiDetails': selectedInstrumentId.value,
                      };
                    }
                    sendMoneyProvider.sendMoney(payload);

                    if (context.mounted && sendMoneyProvider.error == null) {
                      Navigator.of(context).pushReplacement(
                        MaterialPageRoute(
                          builder: (_) => const SuccessScreen(),
                        ),
                      );
                    }
                  },

                  child: const Text(
                    'SEND',
                    style: TextStyle(fontWeight: FontWeight.bold),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

void _showError(BuildContext context, String message) {
  ScaffoldMessenger.of(context).showSnackBar(
    SnackBar(content: Text(message), behavior: SnackBarBehavior.floating),
  );
}

class PaymentInstrumentOption {
  final String id;
  final String label;
  final InstrumentType type;

  PaymentInstrumentOption({
    required this.id,
    required this.label,
    required this.type,
  });
}

enum InstrumentType { card, upi }
