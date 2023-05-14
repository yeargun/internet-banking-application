DELIMITER $$
CREATE PROCEDURE transferMoney(IN fromIBAN VARCHAR(34), IN toIBAN VARCHAR(34), IN amount DECIMAL(18,2),
IN _description VARCHAR(120))
BEGIN
    DECLARE fromBalance DECIMAL(18,2);
    DECLARE toBalance DECIMAL(18,2);

    START TRANSACTION;
    -- Lock the two rows for update to prevent concurrent access
    SELECT balance INTO fromBalance FROM Accountt WHERE IBAN = fromIBAN FOR UPDATE;
    SELECT balance INTO toBalance FROM Accountt WHERE IBAN = toIBAN FOR UPDATE;

    IF fromBalance >= amount THEN
        UPDATE Accountt SET balance = fromBalance - amount WHERE IBAN = fromIBAN;
        UPDATE Accountt SET balance = toBalance + amount WHERE IBAN = toIBAN;

        call insert_transaction(amount,false,"finished", _description,"FAST", null, null,fromIBAN,toIBAN);


        COMMIT;
        SELECT 'Money transfer successful';
    ELSE
        ROLLBACK;
        SELECT 'Sender does not have enough balance';
    END IF;
END$$
DELIMITER ;