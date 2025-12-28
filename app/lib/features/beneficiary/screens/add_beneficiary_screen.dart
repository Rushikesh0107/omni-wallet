import 'package:app/features/beneficiary/provider/beneficiary_provider.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:provider/provider.dart';

class AddBeneficiaryScreen extends StatefulWidget {
  const AddBeneficiaryScreen({super.key});

  @override
  State<AddBeneficiaryScreen> createState() => _AddBeneficiaryState();
}

class _AddBeneficiaryState extends State<AddBeneficiaryScreen> {
  final _formKey = GlobalKey<FormState>();

  final nameController = TextEditingController();
  final phoneController = TextEditingController();

  @override
  void dispose() {
    nameController.dispose();
    phoneController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final beneficiaryProvider = context.read<BeneficiaryProvider>();

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
      appBar: AppBar(title: const Text("Add Beneficiary")),
      body: SafeArea(
        child: Center(
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(16),
            child: Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(16),
                color: Colors.white,
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withOpacity(0.12),
                    blurRadius: 20,
                    offset: const Offset(0, 6),
                  ),
                ],
              ),
              child: Form(
                key: _formKey,
                child: Column(
                  mainAxisSize: MainAxisSize.min, // 👈 critical
                  children: [
                    TextFormField(
                      autofocus: true,
                      controller: nameController,
                      decoration: appInputDecoration("Beneficiary Name"),
                      keyboardType: TextInputType.name,
                      validator: (value) => value == null || value.isEmpty
                          ? 'Beneficiary name is required'
                          : null,
                      inputFormatters: [
                        FilteringTextInputFormatter.allow(
                          RegExp(r'[a-zA-Z\s]'),
                        ),
                      ],
                    ),

                    const SizedBox(height: 20),

                    TextFormField(
                      controller: phoneController,
                      decoration: appInputDecoration("Phone Number"),
                      keyboardType: TextInputType.phone,
                      inputFormatters: [
                        FilteringTextInputFormatter.digitsOnly,
                        LengthLimitingTextInputFormatter(10),
                      ],
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return 'Phone number is required';
                        }
                        if (value.length != 10) {
                          return 'Enter a valid 10-digit number';
                        }
                        return null;
                      },
                    ),

                    const SizedBox(height: 28),

                    SizedBox(
                      width: double.infinity, // 👈 full-width button
                      height: 48,
                      child: ElevatedButton(
                        onPressed: () async {
                          if (!_formKey.currentState!.validate()) return;

                          final payload = {
                            'name': nameController.text.trim(),
                            'phoneNumber': phoneController.text.trim(),
                          };

                          print(payload);

                          await beneficiaryProvider.addBeneficiary(payload);

                          if (context.mounted &&
                              beneficiaryProvider.error == null) {
                            Navigator.pop(context);
                          }
                        },
                        child: const Text("Add Beneficiary"),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
