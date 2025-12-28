import 'package:app/features/home/provider/home_provider.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:provider/provider.dart';

class AddCardInstrument extends StatefulWidget {
  final String cardType;

  const AddCardInstrument({super.key, required this.cardType});

  @override
  State<AddCardInstrument> createState() => _AddCardInstrumentState();
}

class _AddCardInstrumentState extends State<AddCardInstrument> {
  final _formKey = GlobalKey<FormState>();

  final bankNameController = TextEditingController();
  final cardNumberController = TextEditingController();
  final fullNameController = TextEditingController();
  final expiryMonthController = TextEditingController();
  final expiryYearController = TextEditingController();
  final cvvController = TextEditingController();

  @override
  void dispose() {
    bankNameController.dispose();
    cardNumberController.dispose();
    fullNameController.dispose();
    expiryMonthController.dispose();
    expiryYearController.dispose();
    cvvController.dispose();
    super.dispose();
  }

  Widget _cardPreview() {
    String formatCardNumber(String input) {
      final digitsOnly = input.replaceAll(RegExp(r'\D'), '');
      final buffer = StringBuffer();

      for (int i = 0; i < digitsOnly.length; i++) {
        buffer.write(digitsOnly[i]);
        if ((i + 1) % 4 == 0 && i + 1 != digitsOnly.length) {
          buffer.write(' ');
        }
      }

      return buffer.toString();
    }

    return Container(
      height: 200,
      width: double.infinity,
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(20),
        gradient: LinearGradient(
          colors: [Colors.purple.shade500, Colors.indigo.shade600],
        ),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.25),
            blurRadius: 20,
            offset: const Offset(0, 8),
          ),
        ],
      ),
      child: AnimatedBuilder(
        animation: Listenable.merge([
          bankNameController,
          cardNumberController,
          fullNameController,
          expiryMonthController,
          expiryYearController,
        ]),
        builder: (_, __) {
          return Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                bankNameController.text.isEmpty
                    ? 'BANK NAME'
                    : bankNameController.text.toUpperCase(),
                style: const TextStyle(
                  color: Colors.white,
                  fontSize: 16,
                  letterSpacing: 1,
                ),
              ),

              Text(
                cardNumberController.text.isEmpty
                    ? 'XXXX XXXX XXXX XXXX'
                    : formatCardNumber(cardNumberController.text),
                style: const TextStyle(
                  color: Colors.white,
                  fontSize: 22,
                  letterSpacing: 2,
                  fontWeight: FontWeight.w500,
                ),
              ),

              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    fullNameController.text.isEmpty
                        ? 'CARD HOLDER'
                        : fullNameController.text.toUpperCase(),
                    style: const TextStyle(color: Colors.white, fontSize: 14),
                  ),
                  Text(
                    '${expiryMonthController.text.isEmpty ? 'MM' : expiryMonthController.text}'
                    '/${expiryYearController.text.isEmpty ? 'YYYY' : expiryYearController.text}',
                    style: const TextStyle(color: Colors.white, fontSize: 14),
                  ),
                ],
              ),
            ],
          );
        },
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final homeProvider = context.read<HomeProvider>();

    InputDecoration appInputDecoration(String label) {
      return InputDecoration(
        labelText: label,
        filled: true,
        fillColor: const Color(0xFFF6F7FB),
        contentPadding: const EdgeInsets.symmetric(
          horizontal: 16,
          vertical: 14,
        ),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(14),
          borderSide: BorderSide.none,
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(14),
          borderSide: const BorderSide(color: Colors.indigo, width: 1.4),
        ),
        errorBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(14),
          borderSide: const BorderSide(color: Colors.redAccent),
        ),
      );
    }

    return Scaffold(
      appBar: AppBar(title: Text('Add ${widget.cardType} Card')),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24),
          child: Column(
            children: [
              _cardPreview(),
              const SizedBox(height: 24),

              Container(
                padding: const EdgeInsets.all(20),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(20),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black.withOpacity(0.15),
                      blurRadius: 20,
                      offset: const Offset(0, 6),
                    ),
                  ],
                ),
                child: Form(
                  key: _formKey,
                  child: Column(
                    children: [
                      TextFormField(
                        controller: bankNameController,
                        inputFormatters: [
                          FilteringTextInputFormatter.allow(
                            RegExp(r'[a-zA-Z\s]'),
                          ),
                        ],
                        decoration: appInputDecoration("Bank Name"),
                        validator: (value) => value == null || value.isEmpty
                            ? 'Bank Name is required'
                            : null,
                      ),

                      const SizedBox(height: 12),

                      TextFormField(
                        controller: cardNumberController,
                        keyboardType: TextInputType.number,
                        inputFormatters: [
                          FilteringTextInputFormatter.digitsOnly,
                          LengthLimitingTextInputFormatter(16),
                        ],
                        decoration: appInputDecoration("Card Number"),
                        validator: (value) =>
                            value == null || value.length != 16
                            ? 'Enter 16 digit card number'
                            : null,
                      ),

                      const SizedBox(height: 12),

                      TextFormField(
                        controller: fullNameController,
                        inputFormatters: [
                          FilteringTextInputFormatter.allow(
                            RegExp(r'[a-zA-Z\s]'),
                          ),
                        ],
                        decoration: appInputDecoration("Card Holder Name"),
                        validator: (value) => value == null || value.isEmpty
                            ? 'Card holder name required'
                            : null,
                      ),

                      const SizedBox(height: 12),

                      Row(
                        children: [
                          Expanded(
                            child: TextFormField(
                              controller: expiryMonthController,
                              keyboardType: TextInputType.number,
                              inputFormatters: [
                                FilteringTextInputFormatter.digitsOnly,
                                LengthLimitingTextInputFormatter(2),
                              ],
                              decoration: appInputDecoration(
                                "Expiry Month (MM)",
                              ),
                              validator: (value) =>
                                  value == null || value.length != 2
                                  ? 'MM'
                                  : null,
                            ),
                          ),
                          const SizedBox(width: 12),
                          Expanded(
                            child: TextFormField(
                              controller: expiryYearController,
                              keyboardType: TextInputType.number,
                              inputFormatters: [
                                FilteringTextInputFormatter.digitsOnly,
                                LengthLimitingTextInputFormatter(4),
                              ],
                              decoration: appInputDecoration(
                                "Expiry Year (YYYY)",
                              ),
                              validator: (value) =>
                                  value == null || value.length != 4
                                  ? 'YYYY'
                                  : null,
                            ),
                          ),
                        ],
                      ),

                      const SizedBox(height: 12),

                      TextFormField(
                        controller: cvvController,
                        obscureText: true,
                        inputFormatters: [
                          FilteringTextInputFormatter.digitsOnly,
                          LengthLimitingTextInputFormatter(3),
                        ],
                        decoration: appInputDecoration("CVV"),
                        validator: (value) => value == null || value.length != 3
                            ? 'Invalid CVV'
                            : null,
                      ),

                      const SizedBox(height: 20),

                      SizedBox(
                        width: double.infinity,
                        child: ElevatedButton(
                          onPressed: () async {
                            if (!_formKey.currentState!.validate()) return;

                            final payload = {
                              "cardType": widget.cardType
                                  .toUpperCase(), // CREDIT / DEBIT
                              "bankName": bankNameController.text.trim(),
                              "fullName": fullNameController.text.trim(),
                              "cardNumber": cardNumberController.text.trim(),
                              "expiryMonth": expiryMonthController.text.trim(),
                              "expiryYear": expiryYearController.text.trim(),
                              "cvv": cvvController.text.trim(),
                            };

                            await homeProvider.addCardInstrument(payload);

                            if (context.mounted && homeProvider.error == null) {
                              Navigator.pop(context);
                            }
                          },

                          child: homeProvider.loading
                              ? const SizedBox(
                                  height: 20,
                                  width: 20,
                                  child: CircularProgressIndicator(
                                    strokeWidth: 2,
                                  ),
                                )
                              : Text('Add ${widget.cardType} Card'),
                        ),
                      ),
                    ],
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
