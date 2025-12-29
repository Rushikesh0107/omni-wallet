import 'package:app/features/transactions/models/transaction_model.dart';
import 'package:app/features/transactions/provider/transaction_provider.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class TransactionsScreen extends StatefulWidget {
  const TransactionsScreen({super.key});

  @override
  State<TransactionsScreen> createState() => _TransactionsScreenState();
}

class _TransactionsScreenState extends State<TransactionsScreen> {
  final ValueNotifier<String> searchQuery = ValueNotifier('');

  @override
  void initState() {
    super.initState();

    WidgetsBinding.instance.addPostFrameCallback((_) {
      context.read<TransactionProvider>().getTransactions();
    });
  }

  @override
  void dispose() {
    searchQuery.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Consumer<TransactionProvider>(
      builder: (context, provider, _) {
        if (provider.error != null) {
          WidgetsBinding.instance.addPostFrameCallback((_) {
            ScaffoldMessenger.of(context).showSnackBar(
              SnackBar(
                content: Text(provider.error!),
                backgroundColor: Colors.red.shade600,
              ),
            );
            provider.clearError();
          });
        }

        if (provider.loading) {
          return const Scaffold(
            body: Center(child: CircularProgressIndicator()),
          );
        }

        final transactions = provider.transactions ?? [];

        return Scaffold(
          backgroundColor: theme.colorScheme.surfaceVariant,
          body: SafeArea(
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                children: [
                  _SearchBar(onChanged: (value) => searchQuery.value = value),
                  const SizedBox(height: 16),

                  Expanded(
                    child: ValueListenableBuilder<String>(
                      valueListenable: searchQuery,
                      builder: (_, query, __) {
                        final filtered = transactions.where((tx) {
                          final q = query.toLowerCase();
                          return tx.beneficiary.name.toLowerCase().contains(
                                q,
                              ) ||
                              tx.beneficiary.phoneNumber.contains(q) ||
                              tx.amount.contains(q);
                        }).toList();

                        if (filtered.isEmpty) {
                          return const Center(
                            child: Text('No transactions found'),
                          );
                        }

                        return ListView.separated(
                          itemCount: filtered.length,
                          separatorBuilder: (_, _) =>
                              const SizedBox(height: 12),
                          itemBuilder: (_, index) =>
                              _TransactionTile(transaction: filtered[index]),
                        );
                      },
                    ),
                  ),
                ],
              ),
            ),
          ),
        );
      },
    );
  }
}

class _TransactionTile extends StatelessWidget {
  final Transaction transaction;

  const _TransactionTile({required this.transaction});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final beneficiary = transaction.beneficiary;

    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: theme.colorScheme.surface,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.04),
            blurRadius: 8,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // LEFT SIDE
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  beneficiary.name,
                  style: const TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.w600,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  beneficiary.phoneNumber,
                  style: TextStyle(fontSize: 14, color: Colors.grey.shade600),
                ),
                const SizedBox(height: 10),
                _paymentMethod(),
              ],
            ),
          ),

          // RIGHT SIDE
          Column(
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              Text(
                _formatDate(transaction.createdAt),
                style: TextStyle(
                  fontSize: 13,
                  fontWeight: FontWeight.w600,
                  color: Colors.grey.shade700,
                ),
              ),
              const SizedBox(height: 6),
              Text(
                'Rs. ${transaction.amount}',
                style: TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.w700,
                  color: theme.colorScheme.onSurface,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _paymentMethod() {
    if (transaction.cardInstrument != null) {
      final card = transaction.cardInstrument!;
      return Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'via. ${card.cardType} Card',
            style: const TextStyle(fontSize: 13),
          ),
          Text(
            _maskCard(card.cardNumber),
            style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w500),
          ),
        ],
      );
    }

    if (transaction.upiInstrument != null) {
      final upi = transaction.upiInstrument!;
      return Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text('via. UPI', style: TextStyle(fontSize: 13)),
          Text(
            upi.upiId,
            style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w500),
          ),
        ],
      );
    }

    return const SizedBox.shrink();
  }

  String _maskCard(String cardNumber) =>
      'xxxx xxxx xx${cardNumber.substring(cardNumber.length - 2)}';

  String _formatDate(DateTime date) =>
      '${date.day}th Nov ${date.year.toString().substring(2)}';
}

class _SearchBar extends StatelessWidget {
  final ValueChanged<String> onChanged;

  const _SearchBar({required this.onChanged});

  @override
  Widget build(BuildContext context) {
    return TextField(
      onChanged: onChanged,
      decoration: InputDecoration(
        hintText: 'Search by name, phone or amount',
        prefixIcon: const Icon(Icons.search),
        filled: true,
        fillColor: Colors.white,
        contentPadding: const EdgeInsets.symmetric(
          horizontal: 16,
          vertical: 14,
        ),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(14),
          borderSide: BorderSide.none,
        ),
      ),
    );
  }
}
