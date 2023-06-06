DELIMITER $$
CREATE PROCEDURE transferMoney(IN fromIBAN VARCHAR(34), IN toIBAN VARCHAR(34), IN amount DECIMAL(18,2),
IN _description VARCHAR(120))
BEGIN
    DECLARE fromBalance DECIMAL(18,2);
    DECLARE toBalance DECIMAL(18,2);
    DECLARE convertedAmount DECIMAL(18,2);
    DECLARE fromCurrencyId BINARY(16);
    DECLARE toCurrencyId BINARY(16);
    DECLARE fromCurrencyRate DECIMAL(18,2);
    DECLARE toCurrencyRate DECIMAL(18,2);

    START TRANSACTION;
    -- Lock the two rows for update to prevent concurrent access
    SELECT balance, currency_id INTO fromBalance, fromCurrencyId FROM Accountt WHERE IBAN = fromIBAN FOR UPDATE;
    SELECT balance, currency_id INTO toBalance, toCurrencyId FROM Accountt WHERE IBAN = toIBAN FOR UPDATE;

    IF fromBalance >= amount THEN
        UPDATE Accountt SET balance = fromBalance - amount WHERE IBAN = fromIBAN;

        -- Fetch currency rates
        SELECT (selling_value + buying_value) / 2 INTO fromCurrencyRate FROM Currency WHERE id = fromCurrencyId;
        SELECT (selling_value + buying_value) / 2 INTO toCurrencyRate FROM Currency WHERE id = toCurrencyId;
        -- Convert the amount to the receiving currency
        SET convertedAmount = amount * fromCurrencyRate / toCurrencyRate;
        UPDATE Accountt SET balance = toBalance + convertedAmount WHERE IBAN = toIBAN;

        call insert_transaction(amount,false,"finished", _description,"FAST", null, null,fromIBAN,toIBAN);


        COMMIT;
        SELECT 'Money transfer successful';
    ELSE
        ROLLBACK;
        SELECT 'Sender does not have enough balance';
    END IF;
END$$
DELIMITER ;