package com.yeargun.bankingapp.transaction;

public class SameIBANException extends RuntimeException{
    public SameIBANException(String message){
        super(message);
    }
}
