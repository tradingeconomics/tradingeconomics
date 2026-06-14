import 'package:flutter/material.dart';
import 'package:portfolio_manager_app/constants/app_constants.dart';

class AccountPage extends StatelessWidget {
  final String? accountOwner;
  final String displayCurrency;
  final VoidCallback onAddAsset;

  const AccountPage({
    super.key,
    required this.accountOwner,
    required this.displayCurrency,
    required this.onAddAsset,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Account"),
        actionsPadding: const EdgeInsets.symmetric(
          horizontal: AppConstants.kPadding,
        ),
        actions: [IconButton(icon: const Icon(Icons.person), onPressed: null)],
      ),
      body: Padding(
        padding: const EdgeInsets.all(AppConstants.kPadding),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            SizedBox(
              width: double.infinity,
              child: Card(
                child: Padding(
                  padding: const EdgeInsets.all(20),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text("Account Owner"),
                      Text(
                        accountOwner ?? "Loading...",
                        style: const TextStyle(
                          fontSize: 26,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      const SizedBox(height: 16),

                      const Text("Display Currency"),
                      Text(
                        displayCurrency,
                        style: TextStyle(
                          fontSize: 22,
                          color: Theme.of(context).colorScheme.secondary,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),

            const SizedBox(height: 30),

            SizedBox(
              width: double.infinity,
              height: 50,
              child: ElevatedButton.icon(
                icon: const Icon(Icons.add),
                label: const Text("Add Asset"),
                onPressed: onAddAsset,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
