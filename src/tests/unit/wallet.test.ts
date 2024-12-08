import Wallet from '../../models/Wallet';

describe('Wallet', () => {
    it('should add 100 to the balance', () => {
        const currentBalance = Wallet.getBalance();

        Wallet.add(100);

        expect(Wallet.getBalance()).toBe(currentBalance + 100);
    });
    it('should remove 200 from the balance', () => {
        const currentBalance = Wallet.getBalance();

        Wallet.deduct(200);

        expect(Wallet.getBalance()).toBe(currentBalance - 200);
    });
});