CREATE TABLE Auditorium 
(
  id INTEGER GENERATED AS IDENTITY,
  name VARCHAR2(20),
  count INTEGER  
);

INSERT INTO Auditorium(name, count) VALUES('test_1', 19);  
INSERT INTO Auditorium(name, count) VALUES('test_2', 24);
INSERT INTO Auditorium(name, count) VALUES('test_3', 54);
COMMIT;

CREATE or REPLACE PROCEDURE Find_Auditorium (typeAuditorium INTEGER)
  IS
    invalid_argument EXCEPTION;
    res sys_REFCURSOR;
  BEGIN
    IF typeAuditorium = 1 THEN
      open res for SELECT * FROM Auditorium where Auditorium.COUNT < 21; 
    ELSIF typeAuditorium = 2 THEN
      open res for SELECT * FROM Auditorium where Auditorium.COUNT > 20 AND Auditorium.COUNT < 51;   
    ELSIF typeAuditorium = 3 THEN
      open res for SELECT * FROM Auditorium where Auditorium.COUNT > 50; 
    ELSE
      RAISE invalid_argument;   
    END IF; 
    
    DBMS_SQL.RETURN_RESULT(res);
    
    EXCEPTION
      WHEN invalid_argument THEN
        raise_application_error (-20001,'Invalid argument');
    END Find_Auditorium;
      
      
EXECUTE Find_Auditorium(1);
EXECUTE Find_Auditorium(2);
EXECUTE Find_Auditorium(3);
EXECUTE Find_Auditorium(0);
      
      