CREATE VIEW monthly_expenses AS
SELECT
  p.name,
  p.surname,
  a.IBAN,
  CONCAT(MONTH(NOW()), '/',YEAR(NOW())) as t_month,
  SUM(t.amount) AS total_expenses
FROM
  Transactionn t
JOIN
  Accountt a ON a.IBAN = t.sender_IBAN
  and
  /* Greater or equal to the start of this month */
  DATE(t.ts1) >= DATE_ADD(LAST_DAY(DATE_SUB(NOW(), INTERVAL 1 MONTH)), INTERVAL 1 DAY)
JOIN 
  Person p ON a.person_id = p.id
GROUP BY
  p.name,
  p.surname,
  a.IBAN;

#######

CREATE VIEW v_employee_info AS
SELECT
  p.name,
  p.surname,
  e.role,
  e.salary,
  b.code AS branch_code,
  AVG(e.salary) AS avg_salary,
  COUNT(*) AS total_employees
FROM
  Employment e
JOIN
  Person p ON e.person_id = p.id
JOIN
  Branch b ON e.branch_id = b.id
GROUP BY
  p.name,
  p.surname,
  e.role,
  e.salary,
  b.code;
  
#######

CREATE VIEW vw_account_type_total_count AS
SELECT at.name AS account_type, COUNT(*) AS total_count
FROM Accountt a
JOIN AccountType at ON a.account_type_id = at.id
GROUP BY at.name;

#######

CREATE VIEW vw_debit_card_type_total_count AS
SELECT ct.name AS card_type, COUNT(*) AS total_count
FROM DebitCard dc
JOIN CardType ct ON dc.type_id = ct.id
GROUP BY ct.name;

########

CREATE VIEW currency_balance AS
SELECT c.name AS currency_name, SUM(a.balance) AS total_balance
FROM Currency c
JOIN Accountt a ON c.id = a.currency_id
GROUP BY c.name;

#######