import 'package:flutter/material.dart';

class AddUpiInstrument extends StatelessWidget {
  final String instrumentType;

  const AddUpiInstrument({
    super.key,
    required this.instrumentType,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Add ${instrumentType.toUpperCase()}'),
      ),
      body: const SafeArea(
        child: Center(
          child: Text('Hello UPI form'),
        ),
      ),
    );
  }
}
