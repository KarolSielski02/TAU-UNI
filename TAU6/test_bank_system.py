import pytest
import pytest_asyncio
from unittest.mock import AsyncMock
from bank_system import Bank, Account, InsufficientFundsError


# Fixture do inicjalizacji banku
@pytest.fixture
def bank():
    bank = Bank()
    # Create an account using the create_account method
    bank.create_account("12345", "John Doe", 1000.0)
    return bank


# Fixture do inicjalizacji konta
@pytest.fixture
def account(bank):
    # Retrieve the account using the bank's get_account method
    return bank.get_account("12345")


# Testowanie wpłat
def test_deposit(account):
    account.deposit(500)
    assert account.balance == 1500


# Testowanie wpłat z nieprawidłową kwotą
def test_deposit_invalid_amount(account):
    with pytest.raises(ValueError):
        account.deposit(-100)


# Testowanie wypłat
def test_withdraw_success(account):
    account.withdraw(500)
    assert account.balance == 500


# Testowanie wypłat przy niewystarczających środkach
def test_withdraw_insufficient_funds(account):
    with pytest.raises(InsufficientFundsError):
        account.withdraw(2000)


# Testowanie transferów między kontami (asynchronicznie)
@pytest_asyncio.fixture
async def two_accounts(bank):
    bank.create_account("67890", "Jane Smith", 500.0)
    return bank.get_account("12345"), bank.get_account("67890")


@pytest.mark.asyncio
async def test_transfer_success(two_accounts):
    from_account, to_account = two_accounts
    await from_account.transfer(to_account, 300)
    assert from_account.balance == 700
    assert to_account.balance == 800


# Testowanie transferów przy niewystarczających środkach
@pytest.mark.asyncio
async def test_transfer_insufficient_funds(two_accounts):
    from_account, to_account = two_accounts
    with pytest.raises(InsufficientFundsError):
        await from_account.transfer(to_account, 2000)


# Testowanie tworzenia konta
def test_create_account(bank):
    bank.create_account("1234567", "Mark Doe", 1001.0)
    account = bank.get_account("1234567")
    assert account.owner == "Mark Doe"
    assert account.balance == 1001.0

# Testowanie tworzenia konta z istniejącym id
def test_create_account(bank):
    with pytest.raises(ValueError):
        bank.create_account("12345", "Mark Doe", 1001.0)

# Testowanie pobierania konta
def test_get_account(bank):
    account = bank.get_account("12345")
    assert account is not None
    assert account.account_number == "12345"


# Testowanie wyjątku, gdy konto nie istnieje
def test_get_account_not_found(bank):
    with pytest.raises(ValueError):
        bank.get_account("99999")


# Testowanie procesowania transakcji (asynchronicznie)
@pytest.mark.asyncio
async def test_process_transaction(bank):
    bank.create_account("67890", "Jane Smith", 500.0)

    async def mock_transaction():
        from_account = bank.get_account("12345")
        to_account = bank.get_account("67890")
        await from_account.transfer(to_account, 300)

    await bank.process_transaction(mock_transaction)
    assert bank.get_account("12345").balance == 700
    assert bank.get_account("67890").balance == 800


# Testowanie mockowania zewnętrznego systemu autoryzacji
@pytest.mark.asyncio
async def test_mock_external_service():
    mock_service = AsyncMock()
    mock_service.return_value = "Transaction authorized"
    response = await mock_service()
    assert response == "Transaction authorized"
    mock_service.assert_called_once()


# Testowanie wyjątków
def test_insufficient_funds_error(account):
    with pytest.raises(InsufficientFundsError):
        account.withdraw(2000)


def test_value_error_invalid_account_number(bank):
    with pytest.raises(ValueError):
        bank.create_account("12345", "John Doe", 1000.0)  # Próbujemy stworzyć konto z istniejącym numerem


# Parametryzacja testów

@pytest.mark.parametrize("deposit_amount, expected_balance", [(100, 1100), (200, 1200), (500, 1500)])
def test_parametrized_deposit(account, deposit_amount, expected_balance):
    account.deposit(deposit_amount)
    assert account.balance == expected_balance


# Testowanie operacji asynchronicznych z użyciem parametryzacji

@pytest.mark.parametrize("transfer_amount, expected_sender_balance, expected_receiver_balance", [
    (300, 700, 800),
    (500, 500, 1000),
    (1000, 0, 1500)
])
@pytest.mark.asyncio
async def test_parametrized_transfer(two_accounts, transfer_amount, expected_sender_balance, expected_receiver_balance):
    from_account, to_account = two_accounts
    await from_account.transfer(to_account, transfer_amount)
    assert from_account.balance == expected_sender_balance
    assert to_account.balance == expected_receiver_balance