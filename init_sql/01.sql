create table Country (
  `id` SMALLINT NOT NULL AUTO_INCREMENT,
  `name` varchar(85) UNIQUE NOT NULL,
  PRIMARY KEY(`id`)
  );

########

create table Address (
  `id` BINARY(16) DEFAULT (UUID_TO_BIN(UUID())),
  `unit_number` VARCHAR(15),
  `street_number` VARCHAR(15),
  `address_line_1` VARCHAR(85),
  `address_line_2` VARCHAR(85),
  `city` VARCHAR(85) NOT NULL,
  `region` VARCHAR(85),
  `postal_code` VARCHAR(7) NOT NULL,
  `country_id` SMALLINT NOT NULL, 
   PRIMARY KEY (`id`),
   FOREIGN KEY (`country_id`) REFERENCES Country(`id`)
  );


########

create table Currency (
`id` BINARY(16) default (UUID_TO_BIN(UUID())),
  `name` VARCHAR(60) unique not null,
  `symbol` VARCHAR(6) not null unique,
  `selling_value` DECIMAL(18,7) not null,
  `buying_value` DECIMAL(18,7) not null,
  `last_update` TIMESTAMP ON UPDATE NOW(),
  `is_active` BOOLEAN not null default(TRUE),
   PRIMARY KEY (`id`)
  );


########

create table Branch (
`id` BINARY(16) default (UUID_TO_BIN(UUID())),
  `code` VARCHAR(8) unique not null,
  `phone_number` VARCHAR(20) not null,
  `address_id` binary(16) not null, #
   PRIMARY KEY (`id`),
   foreign key (`address_id`) references Address(`id`)
  );

########

create table Person (
`id` BINARY(16) default (UUID_TO_BIN(UUID())),
  `id_number` VARCHAR(25) unique not null,
  `name` VARCHAR(50) not null,
  `surname` VARCHAR(50) not null,
    `gender` VARCHAR(50) not null,
  `email` VARCHAR(254) not null unique,
  `password` VARCHAR(100) not null,
  `phone_number` VARCHAR(20) not null unique,
  `registered_branch_id` binary(16) not null, ##
   PRIMARY KEY (`id`),
   FOREIGN KEY(`registered_branch_id`) REFERENCES Branch(`id`)
);


########

create table AccountType (
	`id` BINARY(16) default (UUID_TO_BIN(UUID())),
    `name` VARCHAR(50) NOT NULL unique,
    PRIMARY KEY (`id`)
  );

########

create table Accountt (
`id` BINARY(16) default (UUID_TO_BIN(UUID())),
  `IBAN` VARCHAR(34) unique not null,
  `balance`  DECIMAL(18,2) NOT NULL default(0),
  `currency_id` BINARY(16) NOT NULL, #
  `creation_time` TIMESTAMP NOT NULL DEFAULT NOW(), 
  `account_type_id` BINARY(16) NOT NULL, #
  `person_id` BINARY(16) NOT NULL, #
   PRIMARY KEY (`id`),
   FOREIGN KEY(`currency_id`) REFERENCES Currency(`id`),
   FOREIGN KEY(`account_type_id`) REFERENCES AccountType(`id`),
   FOREIGN KEY(`person_id`) REFERENCES Person(`id`)
  );


-- CREATE TRIGGER Accountt_BEFORE_INSERT BEFORE INSERT ON Accountt FOR EACH ROW
-- BEGIN
--     SET NEW.IBAN = REPLACE(UUID(), '-', '');
-- END;

########

create table CardType (
`id` BINARY(16) default (UUID_TO_BIN(UUID())),
  `name` VARCHAR(70) unique not null,
   PRIMARY KEY (`id`)
  );


########

create table DebitCard (
`id` BINARY(16) default (UUID_TO_BIN(UUID())),
  `connected_IBAN` VARCHAR(34) not null,
  `security_code` CHAR(3) not null,
  `expiration_date` CHAR(4) not null,
  `card_number` CHAR(16) not null unique,
  `type_id` BINARY(16) not null,
   PRIMARY KEY (`id`),
   foreign key(`connected_IBAN`) references Accountt(`IBAN`),
   foreign key(`type_id`) references CardType(`id`)
  );


########

create table ATM (
 `id` BINARY(16) default (UUID_TO_BIN(UUID())),
  `address_id` BINARY(16),
    PRIMARY KEY (`id`),
 FOREIGN KEY(`address_id`) references Address(`id`)
  );


########

create table Employment (
  `id` BINARY(16) default (UUID_TO_BIN(UUID())),
  `role` VARCHAR(80) not null,
  `salary`  DECIMAL(12,2) NOT NULL default(0),
  `start_ts` TIMESTAMP NOT NULL DEFAULT NOW(), 
  `updated_at` TIMESTAMP ON UPDATE NOW(), 
  `person_id` BINARY(16) NOT NULL,
  `branch_id` BINARY(16),
   PRIMARY KEY (`id`),
   FOREIGN KEY(`person_id`) REFERENCES Person(`id`),
   FOREIGN KEY(`branch_id`) REFERENCES Branch(`id`)
  );


########

create table TransactionType (
`id` BINARY(16) default (UUID_TO_BIN(UUID())),
  `name` VARCHAR(80),
  `description` VARCHAR(150),
  `base_fee` decimal(12,4),
  `percent_fee` decimal(8,4),
   PRIMARY KEY (`id`)
);

########

create table Transactionn (
  `id` BINARY(16) default (UUID_TO_BIN(UUID())),
  `amount` DECIMAL(18,4) not null,
  `is_fraud` boolean not null default(FALSE),
  `status` VARCHAR(45) not null,
  `description` VARCHAR(120) not null,
  `ts1` TIMESTAMP NOT NULL DEFAULT NOW(), 
  `updated_at`  TIMESTAMP ON UPDATE NOW(), 
  `transaction_type_id` BINARY(16) not null, #
  `used_atm_id` BINARY(16), #
  `used_branch_id` BINARY(16), #
  `sender_IBAN` VARCHAR(34) not null, #
  `reciever_IBAN` VARCHAR(34) not null, #
   PRIMARY KEY (`id`),
   FOREIGN KEY(`transaction_type_id`) REFERENCES TransactionType(`id`),
   FOREIGN KEY(`used_atm_id`) REFERENCES ATM(`id`),
   FOREIGN KEY(`used_branch_id`) REFERENCES Branch(`id`),
   FOREIGN KEY(`sender_IBAN`) REFERENCES Accountt(`IBAN`),
   FOREIGN KEY(`reciever_IBAN`) REFERENCES Accountt(`IBAN`)
  );

########

create table JWTToken (
`id` BINARY(16) default (UUID_TO_BIN(UUID())),
  `token` VARCHAR(160) not null,
   PRIMARY KEY (`id`)
  );

########

delimiter //
CREATE PROCEDURE insert_country (IN _name VARCHAR(85))
	BEGIN
		INSERT INTO Country(name)
        values (UPPER(_name));
	END//
delimiter ;

#########


delimiter //
CREATE PROCEDURE insert_address (
	IN _unit_number VARCHAR(15),
    IN _street_number VARCHAR(15),
    IN _address_line_1 VARCHAR(85),
    IN _address_line_2 VARCHAR(85),
    IN _city VARCHAR(85),
    IN _region VARCHAR(85),
    IN _postal_code VARCHAR(7),
    IN _country_name VARCHAR(85),
    OUT Inserted_address_id BINARY(16)
)
	BEGIN
		DECLARE country_id SMALLINT;

		SELECT id INTO country_id FROM Country WHERE UPPER(name) = _country_name;
        IF country_id IS NULL THEN
			SIGNAL SQLSTATE '45000'
			SET MESSAGE_TEXT = 'Country not found';
		END IF;

		SET Inserted_address_id = UUID_TO_BIN(UUID());
		INSERT INTO Address(id, unit_number, street_number, address_line_1, address_line_2, city, region, postal_code, country_id)
        values (Inserted_address_id,_unit_number, _street_number, _address_line_1, _address_line_2, _city, _region, _postal_code, country_id);
        
        
	END//
delimiter ;


########

delimiter //
CREATE PROCEDURE insert_currency (
	IN _name VARCHAR(60),
    IN _symbol VARCHAR(6),
    IN _selling_value DECIMAL(18,7),
    IN _buying_value DECIMAL(18,7),
    IN _last_update TIMESTAMP,
    IN _is_active BOOLEAN
)
	BEGIN
		INSERT INTO Currency(name, symbol, selling_value, buying_value, last_update, is_active)
        values (_name, UPPER(_symbol), _selling_value, _buying_value, _last_update, _is_active);
	END//
delimiter ;

########

delimiter //
CREATE PROCEDURE insert_branch (
	IN _code VARCHAR(8),
    IN _phone_number VARCHAR(20),
	IN _unit_number VARCHAR(15),
    IN _street_number VARCHAR(15),
    IN _address_line_1 VARCHAR(85),
    IN _address_line_2 VARCHAR(85),
    IN _city VARCHAR(85),
    IN _region VARCHAR(85),
    IN _postal_code VARCHAR(7),
    IN _country_name VARCHAR(85)
)
	BEGIN
		#DECLARE inserted_address_id BINARY(16);
		call insert_address(_unit_number, _street_number, _address_line_1, _address_line_2, _city, _region, _postal_code, _country_name,
			@inserted_address_id);

		INSERT INTO Branch(code, phone_number, address_id)
        values (_code, _phone_number, @inserted_address_id);
        
	END//
delimiter ;





delimiter //
CREATE PROCEDURE insert_person (
	IN _id_number VARCHAR(25),
    IN _name VARCHAR(70),
	IN _surname VARCHAR(50),
    IN _gender VARCHAR(50),
    IN _email VARCHAR(254),
    IN _password VARCHAR(55),
    IN _phone_number VARCHAR(20),
    IN _registered_branch_code VARCHAR(8)
)
	BEGIN
		DECLARE registered_branch_id BINARY(16);
        SELECT id INTO registered_branch_id FROM Branch WHERE code = UPPER(_registered_branch_code);
		
		INSERT INTO Person(id_number, name, surname, gender, email, password, phone_number, registered_branch_id)
        values (_id_number, _name, _surname, gender, _email, _password, _phone_number, registered_branch_id);
	END//
delimiter ;




delimiter //
CREATE PROCEDURE insert_account_type (
	IN _name VARCHAR(50)
)
	BEGIN
		INSERT INTO AccountType(name)
        values (UPPER(_name));
	END//
delimiter ;


delimiter //
CREATE PROCEDURE delete_account_type (
	IN _name VARCHAR(50)
)
	BEGIN
		DELETE FROM AccountType
		WHERE name=UPPER(_name);
    END //
delimiter ;

delimiter //
CREATE PROCEDURE update_account_type (
	IN _pre_name VARCHAR(50),
    IN _post_name VARCHAR(50)
)
	BEGIN
		UPDATE AccountType
		SET name = UPPER(_post_name) WHERE name = UPPER(_pre_name);
    END //
delimiter ;


########

delimiter //
CREATE PROCEDURE insert_account (
    IN _balance VARCHAR(70),
    IN _person_id_number VARCHAR(25),
    IN _currency_symbol VARCHAR(6),
    IN _account_type_name VARCHAR(50)
)
	BEGIN
		DECLARE person_id BINARY(16);
        DECLARE currency_id BINARY(16);
        DECLARE account_type_id BINARY(16);
        DECLARE iban VARCHAR(34);

        SELECT id INTO person_id FROM Person WHERE id_number = _person_id_number;
		SELECT id INTO currency_id FROM Currency WHERE symbol = UPPER(_currency_symbol);
        SELECT id INTO account_type_id FROM AccountType WHERE name = UPPER(_account_type_name);
        SET iban = REPLACE(UUID(), '-', '');
        
		INSERT INTO Accountt(balance, person_id, currency_id, account_type_id, IBAN )
        values (_balance, person_id, currency_id, account_type_id, iban);
	END//
delimiter ;



########


delimiter //
CREATE PROCEDURE insert_card_type (
	IN _name VARCHAR(70)
)
	BEGIN
		INSERT INTO CardType(name)
        values (UPPER(_name));
	END//
delimiter ;


delimiter //
CREATE PROCEDURE delete_card_type (
	IN _name VARCHAR(70)
)
	BEGIN
		DELETE FROM CardType
		WHERE name=UPPER(_name);
    END //
delimiter ;

delimiter //
CREATE PROCEDURE update_card_type (
	IN _pre_name VARCHAR(70),
    IN _post_name VARCHAR(70)
)
	BEGIN
		UPDATE CardType
		SET name = UPPER(_post_name) WHERE name = UPPER(_pre_name);
    END //
delimiter ;


########


delimiter //
CREATE PROCEDURE insert_debit_card (
	IN _connected_IBAN VARCHAR(34),
    IN _security_code VARCHAR(3),
	IN _expiration_date VARCHAR(4),
    IN _card_number CHAR(16),
    IN _card_type_name VARCHAR(70)
)
	BEGIN
		DECLARE type_id BINARY(16);

        SELECT id INTO type_id FROM CardType WHERE name = _card_type_name;
        
		INSERT INTO DebitCard(connected_IBAN, security_code, expiration_date, card_number, type_id)
        values (_connected_IBAN, _security_code, _expiration_date, _card_number, type_id);
	END//
delimiter ;


########

delimiter //
CREATE PROCEDURE insert_ATM (
	IN _unit_number VARCHAR(15),
    IN _street_number VARCHAR(15),
    IN _address_line_1 VARCHAR(85),
    IN _address_line_2 VARCHAR(85),
    IN _city VARCHAR(85),
    IN _region VARCHAR(85),
    IN _postal_code VARCHAR(7),
    IN _country_name VARCHAR(85)
)
	BEGIN
		call insert_address(_unit_number, _street_number, _address_line_1, _address_line_2, _city, _region, _postal_code, _country_name,
			@inserted_address_id);

		INSERT INTO ATM(address_id)
        values (@inserted_address_id);
        
	END//
delimiter ;

########

delimiter //
CREATE PROCEDURE insert_employment (
	IN _role VARCHAR(80),
    IN _salary DECIMAL(12,2),
	IN _person_id_number VARCHAR(25),
    IN _branch_code CHAR(8)
)
	BEGIN
		DECLARE person_id BINARY(16);
        DECLARE branch_id BINARY(16);

        SELECT id INTO person_id FROM Person WHERE id_number = _person_id_number;
        SELECT id INTO branch_id FROM Branch WHERE code = _branch_code;

		INSERT INTO Employment(role, salary, person_id, branch_id)
        values (_role, _salary, person_id, branch_id);
	END//
delimiter ;


########

delimiter //
CREATE PROCEDURE insert_transaction_type (
	IN _name VARCHAR(80),
    IN _description VARCHAR(150),
	IN _base_fee decimal(12,4),
    IN _percent_fee decimal(8,4)
)
	BEGIN
		INSERT INTO TransactionType(name, description, base_fee, percent_fee)
        values (UPPER(_name), _description, _base_fee, _percent_fee);
	END//
delimiter ;



########

delimiter //
CREATE PROCEDURE insert_transaction (
	IN _amount DECIMAL(18,4),
	IN _is_fraud boolean,
    IN _status VARCHAR(45),
    IN _description VARCHAR(120),
    IN _transaction_type_name VARCHAR(80),
    IN _used_atm_id BINARY(16),
    IN _used_branch_code VARCHAR(8),
    IN _sender_IBAN VARCHAR(34),
    IN _reciever_IBAN VARCHAR(34)
)
	BEGIN
		DECLARE transaction_type_id BINARY(16);
        DECLARE used_branch_id BINARY(16);

        SELECT id INTO used_branch_id FROM Branch WHERE code = UPPER(_used_branch_code);
        SELECT id INTO transaction_type_id FROM TransactionType WHERE name = UPPER(_transaction_type_name);

		INSERT INTO Transactionn(amount, is_fraud, status, description, transaction_type_id, used_atm_id, used_branch_id,
			sender_IBAN, reciever_IBAN)
        values (_amount, _is_fraud, _status, _description, transaction_type_id, _used_atm_id, used_branch_id,
			_sender_IBAN, _reciever_IBAN);
	END//
delimiter ;


########

delimiter //
CREATE PROCEDURE insert_jwt_token (
	IN _token VARCHAR(160)
)
	BEGIN
		INSERT INTO JWTToken(token)
        values (_token);
	END//
delimiter ;

########