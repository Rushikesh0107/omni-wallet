import 'package:app/features/home/provider/home_provider.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:provider/provider.dart';

class AddUpiInstrument extends StatefulWidget {
  final String instrumentType;

  const AddUpiInstrument({super.key, required this.instrumentType});

  @override
  State<AddUpiInstrument> createState() => _AddUpiInstrumentState();
}

class _AddUpiInstrumentState extends State<AddUpiInstrument> {
  final _formKey = GlobalKey<FormState>();

  final _upiIdController = TextEditingController();
  final _upiNameController = TextEditingController();
  final _upiPhoneController = TextEditingController();

  @override
  void dispose() {
    _upiIdController.dispose();
    _upiNameController.dispose();
    _upiPhoneController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
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
      appBar: AppBar(title: Text('Add ${widget.instrumentType.toUpperCase()}')),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(20),
          child: Column(
            children: [
              Card(
                elevation: 4,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(16),
                ),
                child: Padding(
                  padding: const EdgeInsets.all(20),
                  child: Column(
                    children: [
                      Container(
                        height: 160,
                        width: 160,
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(12),
                          color: Colors.grey.shade200,
                        ),
                        child: const Icon(
                          Icons.qr_code_2,
                          size: 120,
                          color: Colors.black54,
                        ),
                      ),
                      const SizedBox(height: 16),
                      Text(
                        _upiIdController.text.isEmpty
                            ? 'yourupi@bank'
                            : _upiIdController.text,
                        style: theme.textTheme.titleMedium?.copyWith(
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        'UPI Preview',
                        style: theme.textTheme.bodySmall?.copyWith(
                          color: Colors.grey,
                        ),
                      ),
                    ],
                  ),
                ),
              ),

              const SizedBox(height: 24),

              /// ----------- UPI FORM -----------
              Container(
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(24),
                  color: Colors.white,
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black.withOpacity(0.15),
                      blurRadius: 20,
                      offset: const Offset(0, 6),
                    ),
                  ],
                ),
                padding: EdgeInsets.all(20),
                child: Form(
                  key: _formKey,
                  child: Column(
                    children: [
                      TextFormField(
                        controller: _upiIdController,
                        decoration: appInputDecoration("UPI Id"),
                        onChanged: (_) => setState(() {}),
                        validator: (value) {
                          if (value == null || value.isEmpty) {
                            return 'UPI ID is required';
                          }
                          if (!value.contains('@')) {
                            return 'Enter a valid UPI ID';
                          }
                          return null;
                        },
                      ),

                      const SizedBox(height: 20),

                      TextFormField(
                        controller: _upiNameController,
                        decoration: appInputDecoration("UPI Name"),
                        validator: (value) => value == null || value.isEmpty
                            ? 'UPI name is required'
                            : null,
                      ),

                      const SizedBox(height: 16),

                      TextFormField(
                        controller: _upiPhoneController,
                        keyboardType: TextInputType.phone,
                        inputFormatters: [
                          FilteringTextInputFormatter.digitsOnly,
                          LengthLimitingTextInputFormatter(10),
                        ],
                        decoration: appInputDecoration("Phone Number"),
                        validator: (value) {
                          if (value == null || value.isEmpty) {
                            return 'Phone number is required';
                          }
                          if (value.length != 10) {
                            return 'Enter a valid 10-digit phone number';
                          }
                          return null;
                        },
                      ),

                      const SizedBox(height: 32),

                      SizedBox(
                        width: double.infinity,
                        height: 48,
                        child: ElevatedButton(
                          onPressed: () async {
                            if (!_formKey.currentState!.validate()) return;

                            final payload = {
                              'upiId': _upiIdController.text.trim(),
                              'upiName': _upiNameController.text.trim(),
                              'upiPhone': _upiPhoneController.text.trim(),
                            };

                            await homeProvider.addUpiInstrument(payload);

                            if (!mounted) return;

                            if (homeProvider.error == null) {
                              Navigator.pop(context);
                            } else {
                              ScaffoldMessenger.of(context).showSnackBar(
                                SnackBar(content: Text(homeProvider.error!)),
                              );
                            }
                          },

                          child: const Text('Add UPI'),
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
