import WalletService from '../../wallet/WalletService';
import { ValidationError } from '../../utils/errors';

describe('Wallet', () => {
    describe('Wallet deposit', () => {
        it('It should update the balance', async () => {
            const initialBalance = WalletService.getBalance();

            WalletService.depositFunds({
                amount: 10,
            });

            const newBalance = WalletService.getBalance();
            expect(newBalance.balance).toEqual(initialBalance.balance + 10);
        });

        it('should return validation error', async () => {
            try {
                WalletService.depositFunds({
                    amoun: 20,
                } as any);
            } catch (error) {
                expect(error).toBeInstanceOf(ValidationError);
                expect(error.message).toContain('amount');
            }
        });
    });
    describe('Wallet Withdraw', () => {
        it('should deduct from the wallet', async () => {
            const initialBalance = WalletService.getBalance();

            WalletService.withdrawFunds({
                amount: 10,
            });

            const newBalance = WalletService.getBalance();
            expect(newBalance.balance).toEqual(initialBalance.balance - 10);

        });
        it('should return insufficient funds error', async () => {
            const initialBalance = WalletService.getBalance();

            try {
                WalletService.withdrawFunds({
                    amount: initialBalance.balance + 10,
                });
            } catch (error) {
                expect(error).toBeInstanceOf(Error);
                expect(error.message).toContain('Insufficient funds');
            }
        });

        it('should return validation error', async () => {
            try {
                WalletService.withdrawFunds({
                    amoun: 20,
                } as any);
            } catch (error) {
                expect(error).toBeInstanceOf(ValidationError);
                expect(error.message).toContain('amount');
            }
        });
    });
});