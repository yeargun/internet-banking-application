call insert_country("Turkey");
call insert_country("Spain");
call insert_country("Italy");
call insert_country("France");
call insert_country("Germany");
call insert_country("Greece");
call insert_country("USA");
call insert_country("Poland");
call insert_country("Romania");
call insert_country("Netherlands");

######

call insert_address("unit0","1400str","20/7",null,"ankara","region0","06701","Turkey",@temp);
call insert_address("unit0","1400str","20/7",null,"ankara","region0","06701","Italy",@temp);
call insert_address("unit0","1400str","20/7",null,"ankara","region0","06701","Turkey",@temp);
call insert_address("unit0","1400str","20/7",null,"ankara","region0","06701","Turkey",@temp);
call insert_address("unit0","1400str","20/7",null,"ankara","region0","06701","Spain",@temp);
call insert_address("unit0","1400str","20/7",null,"ankara","region0","06701","Turkey",@temp);
call insert_address("unit0","1400str","20/7",null,"ankara","region0","06701","Turkey",@temp);
call insert_address("unit0","1400str","20/7",null,"ankara","region0","06701","USA",@temp);
call insert_address("unit0","1400str","20/7",null,"ankara","region0","06701","Turkey",@temp);
call insert_address("unit0","1400str","20/7",null,"ankara","region0","06701","Turkey",@temp);

######

call insert_currency("Turkish Lira", "TL", 20.1231, 20.545, now(), true);
call insert_currency("United Stated Dolar", "USD", 1.2, 1.3, now(), true);
call insert_currency("Euro", "EUR", 0.9, 0.95, now(), true);
call insert_currency("Kuwait Dinar", "KD", 0.5, 0.54, now(), true);
call insert_currency("Brazilian Real", "BRL", 20.1231, 20.545, now(), true);
call insert_currency("Canadian Dollar", "CAD", 0.1231, 0.1545, now(), true);
call insert_currency("British Pound", "GBP", 8.1231, 8.545, now(), true);
call insert_currency("Swiss Franc", "CHF", 7.1231, 7.545, now(), true);
call insert_currency("Australian Dollar", "AUD", 6.1231, 6.545, now(), true);
call insert_currency("Bulgarian Lev", "BGN", 5.1231, 5.545, now(), true);

######

call insert_branch("brach1","5334441212","unit0","55str","20/7",null,"ankara","region0","06701","Turkey");
call insert_branch("brach2","5334441212","unit0","1400str","20/7",null,"ankara","region0","06701","Turkey");
call insert_branch("brach3","5334441212","unit0","1400str","20/7",null,"ankara","region0","06701","Turkey");
call insert_branch("brach4","5334441212","unit0","1400str","20/7",null,"ankara","region0","06701","Turkey");
call insert_branch("brach5","5334441212","unit0","1400str","20/7",null,"ankara","region0","06701","Turkey");
call insert_branch("brach6","5334441212","unit0","1400str","20/7",null,"ankara","region0","06701","Turkey");
call insert_branch("brach7","5334441212","unit0","1400str","20/7",null,"ankara","region0","06701","Turkey");
call insert_branch("brach8","5334441212","unit0","1400str","20/7",null,"ankara","region0","06701","Turkey");
call insert_branch("brach9","5334441212","unit0","1400str","20/7",null,"ankara","region0","06701","Turkey");
call insert_branch("brach10","5334441212","unit0","1400str","20/7",null,"ankara","region0","06701","Turkey");

######

call insert_person("10403300292","Ali Argun","Sayilgan","male","yeargun11@gmail.com","12345","244542342","brach5");
call insert_person("20403300292","Mehmet","Yılmaz","male","12@gmail.com","12345","235542342","brach5");
call insert_person("30403300292","Elif","Vural","female","13@gmail.com","12345","236542342","brach5");
call insert_person("40403300292","Gizem","Sözlü","female","14@gmail.com","12345","237542342","brach5");
call insert_person("50403300292","Ece Nur","Arıcı","female","15@gmail.com","12345","238542342","brach5");
call insert_person("60403300292","Kerem","Atik","male","16@gmail.com","12345","234542942","brach5");
call insert_person("70403300292","Cenk","Avcı","male","17@gmail.com","12345","234542392","brach5");
call insert_person("80403300292","Ferhat","Sunum","male","18@gmail.com","12345","234542382","brach5");
call insert_person("90403300292","Naz","Ekici","female","19@gmail.com","12345","234542372","brach5");
call insert_person("11403300292","Buse","Dilmen","female","22@gmail.com","12345","234542362","brach5");

######

call insert_account_type("Gold Acc");
call insert_account_type("Silver_2023 Acc");
call insert_account_type("Gold1");
call insert_account_type("Gold12");
call insert_account_type("Gold13");
call insert_account_type("Gold14");
call insert_account_type("Gold15");
call insert_account_type("Gold16");
call insert_account_type("Gold17");
call insert_account_type("Gold18");

call delete_account_type("Gold1");
call delete_account_type("Gold12");
call delete_account_type("Gold13");
call delete_account_type("Gold14");
call delete_account_type("Gold15");
call delete_account_type("Gold16");
call delete_account_type("Gold17");
call delete_account_type("Gold18");

######

call insert_account(10,"10403300292","TL","Gold Acc");
call insert_account(10,"10403300292","TL","Gold Acc");
call insert_account(10,"10403300292","TL","Gold Acc");
call insert_account(10,"10403300292","TL","Gold Acc");
call insert_account(10,"10403300292","TL","Gold Acc");
call insert_account(10,"10403300292","TL","Gold Acc");
call insert_account(10,"10403300292","TL","Gold Acc");
call insert_account(10,"10403300292","TL","Gold Acc");
call insert_account(10,"10403300292","TL","Gold Acc");
call insert_account(10,"10403300292","TL","Gold Acc");

######

call insert_card_type("Gold");
call insert_card_type("Silver_2023");
call insert_card_type("Gold1");
call insert_card_type("Gold12");
call insert_card_type("Gold13");
call insert_card_type("Gold14");
call insert_card_type("Gold15");
call insert_card_type("Gold16");
call insert_card_type("Gold17");
call insert_card_type("Gold18");

call delete_card_type("Gold1");
call delete_card_type("Gold12");
call delete_card_type("Gold13");
call delete_card_type("Gold14");
call delete_card_type("Gold15");
call delete_card_type("Gold16");
call delete_card_type("Gold17");
call delete_card_type("Gold18");

######

call insert_debit_card(
    (SELECT `IBAN` FROM Accountt ORDER BY RAND() LIMIT 1),
    "123","1130","2222111133331000","Gold");
call insert_debit_card(
    (SELECT `IBAN` FROM Accountt ORDER BY RAND() LIMIT 1),
    "123","1030","2222111133331001","Gold");
call insert_debit_card(
    (SELECT `IBAN` FROM Accountt ORDER BY RAND() LIMIT 1),
    "123","0529","2222111133331002","Gold");
call insert_debit_card(
    (SELECT `IBAN` FROM Accountt ORDER BY RAND() LIMIT 1),
    "123","0228","2222111133331003","Gold");
call insert_debit_card(
    (SELECT `IBAN` FROM Accountt ORDER BY RAND() LIMIT 1),
    "111","1229","2222111133331004","Gold");
call insert_debit_card(
    (SELECT `IBAN` FROM Accountt ORDER BY RAND() LIMIT 1),
    "151","1127","2222111133331005","Gold");
call insert_debit_card(
    (SELECT `IBAN` FROM Accountt ORDER BY RAND() LIMIT 1),
    "342","0511","2222111133331006","Gold");
call insert_debit_card(
    (SELECT `IBAN` FROM Accountt ORDER BY RAND() LIMIT 1),
    "532","1125","2222111133331007","Gold");
call insert_debit_card(
    (SELECT `IBAN` FROM Accountt ORDER BY RAND() LIMIT 1),
    "891","1126","2222111133331008","Gold");
call insert_debit_card(
    (SELECT `IBAN` FROM Accountt ORDER BY RAND() LIMIT 1),
    "875","0728","2222111133331009","Gold");

######

call insert_ATM("atm_unit","55str","20/7",null,"ankara","region0","06701","Turkey");
call insert_ATM("atm_unit","55str","20/7",null,"ankara","region0","06701","Turkey");
call insert_ATM("atm_unit","55str","20/7",null,"ankara","region0","06701","Turkey");
call insert_ATM("atm_unit","55str","20/7",null,"ankara","region0","06701","Turkey");
call insert_ATM("atm_unit","55str","20/7",null,"ankara","region0","06701","Turkey");
call insert_ATM("atm_unit","55str","20/7",null,"ankara","region0","06701","Turkey");
call insert_ATM("atm_unit","55str","20/7",null,"ankara","region0","06701","Turkey");
call insert_ATM("atm_unit","55str","20/7",null,"ankara","region0","06701","Turkey");
call insert_ATM("atm_unit","55str","20/7",null,"ankara","region0","06701","Turkey");
call insert_ATM("atm_unit","55str","20/7",null,"ankara","region0","06701","Turkey");


######

call insert_employment("Cashier",1800,"20403300292","brach5");
call insert_employment("Cashier",1800,"50403300292","brach5");
call insert_employment("Cashier",1800,"50403300292","brach4");
call insert_employment("Cashier",1800,"50403300292","brach5");
call insert_employment("Cashier",1800,"20403300292","brach5");
call insert_employment("Cashier",1800,"20403300292","brach4");
call insert_employment("Cashier",1800,"70403300292","brach5");
call insert_employment("Cashier",1800,"70403300292","brach3");
call insert_employment("Cashier",1800,"20403300292","brach5");
call insert_employment("Cashier",1800,"70403300292","brach5");

######

call insert_transaction_type("FAST","fast but expensive",5.2,1);
call insert_transaction_type("SWIFT","fast but expensive",5.2,1);
call insert_transaction_type("SLOW","fast but expensive",5.2,1);
call insert_transaction_type("MID","fast but expensive",5.2,1);
call insert_transaction_type("FAST1","fast but expensive",5.2,1);
call insert_transaction_type("FAST2","fast but expensive",5.2,1);
call insert_transaction_type("FAST3","fast but expensive",5.2,1);
call insert_transaction_type("FAST4","fast but expensive",5.2,1);
call insert_transaction_type("FAST5","fast but expensive",5.2,1);
call insert_transaction_type("FAST6","fast but expensive",5.2,1);

######


SET @iban1 := (SELECT `IBAN` FROM Accountt ORDER BY RAND() LIMIT 1);
SET @iban2 := (SELECT `IBAN` FROM Accountt WHERE `IBAN` <> @iban1 ORDER BY RAND() LIMIT 1);
call insert_transaction(1,false,"pending","1 ödemesidd","FAST", null, null,@iban1,@iban2);
SET @iban1 := (SELECT `IBAN` FROM Accountt ORDER BY RAND() LIMIT 1);
SET @iban2 := (SELECT `IBAN` FROM Accountt WHERE `IBAN` <> @iban1 ORDER BY RAND() LIMIT 1);
call insert_transaction(1,false,"pending","2 ödemesidd","FAST", null, null,@iban1,@iban2);
SET @iban1 := (SELECT `IBAN` FROM Accountt ORDER BY RAND() LIMIT 1);
SET @iban2 := (SELECT `IBAN` FROM Accountt WHERE `IBAN` <> @iban1 ORDER BY RAND() LIMIT 1);
call insert_transaction(1,false,"pending","3 ödemesidd","FAST", null, null,@iban1,@iban2);
SET @iban1 := (SELECT `IBAN` FROM Accountt ORDER BY RAND() LIMIT 1);
SET @iban2 := (SELECT `IBAN` FROM Accountt WHERE `IBAN` <> @iban1 ORDER BY RAND() LIMIT 1);
call insert_transaction(1,false,"pending","4 ödemesidd","FAST", null, null,@iban1,@iban2);
SET @iban1 := (SELECT `IBAN` FROM Accountt ORDER BY RAND() LIMIT 1);
SET @iban2 := (SELECT `IBAN` FROM Accountt WHERE `IBAN` <> @iban1 ORDER BY RAND() LIMIT 1);
call insert_transaction(1,false,"pending","5 ödemesidd","FAST", null, null,@iban1,@iban2);
SET @iban1 := (SELECT `IBAN` FROM Accountt ORDER BY RAND() LIMIT 1);
SET @iban2 := (SELECT `IBAN` FROM Accountt WHERE `IBAN` <> @iban1 ORDER BY RAND() LIMIT 1);
call insert_transaction(1,false,"pending","6 ödemesidd","FAST", null, null,@iban1,@iban2);
SET @iban1 := (SELECT `IBAN` FROM Accountt ORDER BY RAND() LIMIT 1);
SET @iban2 := (SELECT `IBAN` FROM Accountt WHERE `IBAN` <> @iban1 ORDER BY RAND() LIMIT 1);
call insert_transaction(1,false,"pending","7 ödemesidd","FAST", null, null,@iban1,@iban2);
SET @iban1 := (SELECT `IBAN` FROM Accountt ORDER BY RAND() LIMIT 1);
SET @iban2 := (SELECT `IBAN` FROM Accountt WHERE `IBAN` <> @iban1 ORDER BY RAND() LIMIT 1);
call insert_transaction(1,false,"pending","8 ödemesidd","FAST", null, null,@iban1,@iban2);
SET @iban1 := (SELECT `IBAN` FROM Accountt ORDER BY RAND() LIMIT 1);
SET @iban2 := (SELECT `IBAN` FROM Accountt WHERE `IBAN` <> @iban1 ORDER BY RAND() LIMIT 1);
call insert_transaction(1,false,"pending","9 ödemesidd","FAST", null, null,@iban1,@iban2);
SET @iban1 := (SELECT `IBAN` FROM Accountt ORDER BY RAND() LIMIT 1);
SET @iban2 := (SELECT `IBAN` FROM Accountt WHERE `IBAN` <> @iban1 ORDER BY RAND() LIMIT 1);
call insert_transaction(1,false,"pending","aidat ödemesidd","FAST", null, null,@iban1,@iban2);
SET @iban1 := (SELECT `IBAN` FROM Accountt ORDER BY RAND() LIMIT 1);
SET @iban2 := (SELECT `IBAN` FROM Accountt WHERE `IBAN` <> @iban1 ORDER BY RAND() LIMIT 1);
call insert_transaction(1,false,"pending","aidat1 ödemesidd","FAST", null, null,@iban1,@iban2);
SET @iban1 := (SELECT `IBAN` FROM Accountt ORDER BY RAND() LIMIT 1);
SET @iban2 := (SELECT `IBAN` FROM Accountt WHERE `IBAN` <> @iban1 ORDER BY RAND() LIMIT 1);
call insert_transaction(1,false,"pending","aida2t ödemesidd","FAST", null, null,@iban1,@iban2);
SET @iban1 := (SELECT `IBAN` FROM Accountt ORDER BY RAND() LIMIT 1);
SET @iban2 := (SELECT `IBAN` FROM Accountt WHERE `IBAN` <> @iban1 ORDER BY RAND() LIMIT 1);
call insert_transaction(1,false,"pending","33 ödemesidd","FAST", null, null,@iban1,@iban2);
SET @iban1 := (SELECT `IBAN` FROM Accountt ORDER BY RAND() LIMIT 1);
SET @iban2 := (SELECT `IBAN` FROM Accountt WHERE `IBAN` <> @iban1 ORDER BY RAND() LIMIT 1);
call insert_transaction(1,false,"pending","aida3t ödemesidd","FAST", null, null,@iban1,@iban2);
SET @iban1 := (SELECT `IBAN` FROM Accountt ORDER BY RAND() LIMIT 1);
SET @iban2 := (SELECT `IBAN` FROM Accountt WHERE `IBAN` <> @iban1 ORDER BY RAND() LIMIT 1);
call insert_transaction(1,false,"pending","ai5dat ödemesidd","FAST", null, null,@iban1,@iban2);
SET @iban1 := (SELECT `IBAN` FROM Accountt ORDER BY RAND() LIMIT 1);
SET @iban2 := (SELECT `IBAN` FROM Accountt WHERE `IBAN` <> @iban1 ORDER BY RAND() LIMIT 1);
call insert_transaction(1,false,"pending","ai6dat ödemesidd","FAST", null, null,@iban1,@iban2);

######

call insert_jwt_token("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c");
call insert_jwt_token("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c");
call insert_jwt_token("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c");
call insert_jwt_token("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c");
call insert_jwt_token("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c");
call insert_jwt_token("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c");
call insert_jwt_token("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c");
call insert_jwt_token("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c");
call insert_jwt_token("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c");
call insert_jwt_token("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c");
